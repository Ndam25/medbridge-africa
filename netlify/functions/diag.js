// netlify/functions/diag.js
const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Affiche les infos d'env et tente un SELECT + INSERT sur contact_messages
  const diag = {
    env: {
      SUPABASE_URL: SUPABASE_URL || null,
      SERVICE_ROLE_SET: !!SERVICE_ROLE,
      SERVICE_ROLE_TAIL: SERVICE_ROLE ? SERVICE_ROLE.slice(-6) : null
    }
  };

  if (!SUPABASE_URL || !SERVICE_ROLE) {
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok:false, error:"ENV_MISSING", diag })
    };
  }

  try {
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession:false } });

    // 1) SELECT tête (la table existe et est accessible ?)
    const { error: selErr, count } = await supabase
      .from("contact_messages")
      .select("*", { head: true, count: "exact" })
      .limit(1);
    diag.select = selErr ? { ok:false, code: selErr.code, detail: selErr.message } : { ok:true, count };

    // 2) INSERT test
    const { error: insErr } = await supabase
      .from("contact_messages")
      .insert({ email:"diag@example.com", message:"diag" });
    diag.insert = insErr ? { ok:false, code: insErr.code, detail: insErr.message } : { ok:true };

    const ok = !selErr && !insErr;
    return {
      statusCode: ok ? 201 : 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok, diag })
    };
  } catch (e) {
    diag.exception = String(e);
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok:false, error:"UNEXPECTED", diag })
    };
  }
};
