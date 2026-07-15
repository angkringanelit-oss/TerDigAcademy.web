const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("service_role_key")!;

// Validasi environment variables
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    const {
      parent_name,
      child_name,
      child_age,
      whatsapp_number,
      workshop_mode,
    } = await req.json();

    if (!parent_name || !child_name || !child_age || !whatsapp_number || !workshop_mode) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Kirim ke Telegram
    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_WORKSHOP_BOT_TOKEN")!;
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_WORKSHOP_CHAT_ID")!;

    const message = `
📌 PENDAFTARAN WORKSHOP SENI DIGITAL
👨‍👩‍👧 Orang Tua: ${parent_name}
👧 Anak: ${child_name} (${child_age} tahun)
📱 WhatsApp: ${whatsapp_number}
🎓 Mode: ${workshop_mode.toUpperCase()}
    `.trim();

    const responseTelegram = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
        }),
      }
    );

    if (!responseTelegram.ok) {
      const errorData = await responseTelegram.text();
      console.error("Telegram API error:", errorData);
      throw new Error("Telegram API failed");
    }

    // Insert ke database
    const { data, error } = await supabase
      .from("workshop_registrations")
      .insert([{
        parent_name,
        child_name,
        child_age,
        whatsapp_number,
        workshop_mode,
        created_at: new Date(),
      }]);

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (err) {
    console.error("Error in function:", err);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
