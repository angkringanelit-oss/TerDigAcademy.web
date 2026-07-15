Deno.serve(async (req) => {
  try {
    const { child_name, parent_name, child_age, program, phone, email } = await req.json();

    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!;
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID")!;

    const message = `
📌 Pendaftaran Baru
👶 Anak: ${child_name}
🎂 Usia: ${child_age}
👨‍👩‍👧 Ortu: ${parent_name}
📱 HP: ${phone}
✉️ Email: ${email}
📘 Program: ${program}
    `;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
    });

    return new Response("OK", { status: 200 });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
});