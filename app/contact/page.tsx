"use client"

import { useState } from "react"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMsg(null)

    const fd = new FormData(e.currentTarget)
    const payload = {
      name: fd.get("name")?.toString() || "",
      email: fd.get("email")?.toString() || "",
      subject: fd.get("subject")?.toString() || "",
      message: fd.get("message")?.toString() || "",
      // honeypot anti-spam (doit rester vide)
      website: (fd.get("website") as string) || "",
    }

    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const j = await r.json()
      setMsg(j.ok ? "✅ Merci ! Votre message a bien été envoyé." : "❌ Erreur, réessayez.")
      if (j.ok) (e.target as HTMLFormElement).reset()
    } catch {
      setMsg("❌ Problème réseau. Réessayez.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom</label>
          <input name="name" className="mt-1 w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">E-mail *</label>
          <input type="email" name="email" required className="mt-1 w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Sujet</label>
          <input name="subject" className="mt-1 w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Message *</label>
          <textarea name="message" rows={6} required className="mt-1 w-full border rounded p-2" />
        </div>

        {/* Champ honeypot (caché) */}
        <div className="hidden">
          <label>Votre site web (laissez vide)</label>
          <input name="website" autoComplete="off" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded px-4 py-2 bg-blue-700 text-white disabled:opacity-50"
        >
          {loading ? "Envoi…" : "Envoyer"}
        </button>

        {msg && <p className="text-sm mt-2">{msg}</p>}
      </form>

      <p className="text-sm text-gray-600 mt-6">
        Ou écrivez-nous :{" "}
        <a href="mailto:contact@healthacademia.shop" className="underline">
          contact@healthacademia.shop
        </a>
      </p>
    </main>
  )
}
