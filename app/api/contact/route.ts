import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export const runtime = "nodejs"

function clientIP(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for")
  return xff ? xff.split(",")[0].trim() : undefined
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    note: "contact API alive",
    env: {
      SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SERVICE_ROLE: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      RESEND: !!process.env.RESEND_API_KEY,
      ALERT_TO: !!process.env.ALERT_TO_EMAIL,
      ALERT_FROM: !!process.env.ALERT_FROM_EMAIL,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()
    if (!email || !message) {
      return NextResponse.json({ ok: false, error: "Email et message requis." }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    )

    const meta = {
      user_agent: req.headers.get("user-agent") || null,
      url_path: req.headers.get("referer") || null,
      ip: clientIP(req) || null,
    }

    const { error: dbError } = await supabase.from("contacts").insert({
      name, email, subject, message,
      user_agent: meta.user_agent,
      url_path: meta.url_path,
      ip: meta.ip,
      status: "received",
    })
    if (dbError) {
      console.error("[contact] Supabase insert error:", dbError)
      return NextResponse.json({ ok: false, error: "DB_INSERT_FAILED" }, { status: 500 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const TO = process.env.ALERT_TO_EMAIL
    const FROM = process.env.ALERT_FROM_EMAIL

    if (RESEND_API_KEY && TO && FROM) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: FROM,
            to: [TO],
            subject: `[Contact] ${name || email} — ${subject || "Nouveau message"}`,
            html: `
              <h2>Nouveau message de contact</h2>
              <p><b>Nom:</b> ${name || "-"}</p>
              <p><b>Email:</b> ${email}</p>
              <p><b>Sujet:</b> ${subject || "-"}</p>
              <p><b>Message:</b><br/>${(message || "").replace(/\n/g,"<br/>")}</p>
              <hr/>
              <p style="font-size:12px;color:#666">
                <b>UA:</b> ${meta.user_agent || "-"}<br/>
                <b>Path:</b> ${meta.url_path || "-"}<br/>
                <b>IP:</b> ${meta.ip || "-"}
              </p>
            `,
          }),
        })
        if (!res.ok) throw new Error(`RESEND_FAILED (${res.status})`)

        await supabase.from("contacts")
          .update({ status: "notified" })
          .eq("email", email)
          .order("created_at", { ascending: false })
          .limit(1)

        return NextResponse.json({ ok: true, status: "notified" }, { status: 201 })
      } catch (mailErr) {
        console.error("[contact] Resend error:", mailErr)
        await supabase.from("contacts")
          .update({ status: "notify_error" })
          .eq("email", email)
          .order("created_at", { ascending: false })
          .limit(1)
        return NextResponse.json({ ok: true, status: "notify_error" }, { status: 201 })
      }
    }

    return NextResponse.json({ ok: true, status: "stored_only" }, { status: 201 })
  } catch (e) {
    console.error("[contact] Unexpected error:", e)
    return NextResponse.json({ ok: false, error: "UNEXPECTED_ERROR" }, { status: 500 })
  }
}
