const SYSTEM_PROMPT = `Kamu adalah "Asisten Belajar TerDig", AI tutor ramah yang khusus membantu siswa TK/PAUD dan Sekolah Dasar (SD) kelas 1-6 di Indonesia sesuai dengan **Kurikulum Merdeka**.

ATURAN KETAT & TERMINOLOGI KURIKULUM MERDEKA:
1. Gunakan istilah **IPAS** (Ilmu Pengetahuan Alam dan Sosial) untuk kelas 1-6, JANGAN memisahkan menjadi IPA dan IPS.
2. Pahami dan gunakan istilah **Fase Belajar**:
   - Fase A = Kelas 1 dan 2 SD
   - Fase B = Kelas 3 dan 4 SD
   - Fase C = Kelas 5 dan 6 SD
3. HANYA jawab pertanyaan seputar: Calistung (TK/PAUD), Matematika, Bahasa Indonesia, Bahasa Inggris, IPAS, PPKn, Seni, cara belajar, tips mengerjakan PR, dan motivasi belajar.
4. Jika ditanya hal di luar scope (coding, resep, berita, dll), tolak dengan SOPAN. Contoh: "Maaf, saya hanya bisa membantu pertanyaan tentang pelajaran TK dan SD sesuai Kurikulum Merdeka. Ada yang bisa saya bantu tentang materi belajar?"
5. Gunakan bahasa Indonesia yang ramah, sederhana, kontekstual, dan mudah dipahami anak. Dorong rasa ingin tahu sesuai semangat Profil Pelajar Pancasila.
6. JANGAN memberikan jawaban yang bisa disalahartikan sebagai nasihat medis, hukum, atau keuangan.

KARAKTER: Ramah, sabar, encouraging, seperti kakak kelas atau guru yang baik hati. Selalu akhiri dengan pertanyaan pemantik yang mendorong anak untuk berpikir.`;

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW = 3600000; // 1 jam dalam ms
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetAt?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1, resetAt: now + RATE_LIMIT_WINDOW };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count, resetAt: record.resetAt };
}

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  // Rate limiting berdasarkan IP
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const rateLimit = checkRateLimit(clientIP);

  if (!rateLimit.allowed) {
    return jsonResponse(
      {
        error: "rate_limit",
        message: "Anda telah mencapai batas pertanyaan untuk saat ini. Silakan coba lagi nanti.",
        retryAfter: Math.ceil((rateLimit.resetAt! - Date.now()) / 60000) + " menit",
      },
      429
    );
  }

  try {
    const reqBody = await req.json();
    const groqKey = Deno.env.get("GROQ_API_KEY");

    if (!groqKey) {
      return jsonResponse({ error: "Missing GROQ_API_KEY" }, 500);
    }

    // ✅ BULLETPROOF PARSING: Support format baru (messages) dan lama (prompt)
    let userMessages: Array<{ role: string; content: string }> = [];

    if (reqBody.messages && Array.isArray(reqBody.messages)) {
      userMessages = reqBody.messages;
    } else if (reqBody.prompt) {
      userMessages = [{ role: "user", content: reqBody.prompt }];
    } else {
      return jsonResponse(
        { error: "Invalid request: missing 'messages' or 'prompt'" },
        400
      );
    }

    const model = "openai/gpt-oss-120b";
    const apiUrl = "https://api.groq.com/openai/v1/chat/completions";

    const payload = {
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...userMessages,
      ],
      temperature: 0.7,
      max_tokens: 512,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", response.status, errText);

      // Jika Groq mengembalikan error, kita ubah jadi 503 yang ramah
      return jsonResponse(
        {
          error: "ai_unavailable",
          message: "Asisten AI kami sedang beristirahat sejenak. Silakan chat langsung dengan Admin kami via WhatsApp untuk bantuan cepat.",
        },
        503
      );
    }

    const data = await response.json();
    const outputText = data?.choices?.[0]?.message?.content?.trim() || "AI tidak memberikan jawaban.";

    return jsonResponse({ response: outputText }, 200);
  } catch (err) {
    console.error("Server error in groq-proxy:", err);
    return jsonResponse(
      {
        error: "ai_unavailable",
        message: "Terjadi kesalahan sistem. Silakan chat langsung dengan Admin kami via WhatsApp.",
      },
      503
    );
  }
});