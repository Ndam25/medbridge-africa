"use client";

import { useState, FormEvent } from "react";

type Props = { params: { lang: "fr" | "en" } };

export default function EligibilityPage({ params }: Props) {
  const lang: "fr" | "en" = params?.lang === "en" ? "en" : "fr";

  const L =
    lang === "en"
      ? {
          title: "Eligibility Assessment",
          lead: "Tell us more for a quick recommendation.",
          ctaForm: "Open full evaluation form",
          ctaReport: "View sample evaluation report",
          miniTitle: "Quick contact",
          name: "Full name",
          email: "Email",
          send: "Send",
          sent: "Sent!",
          fail: "Error, try again.",
        }
      : {
          title: "Évaluation d’éligibilité",
          lead: "Dites-nous en plus pour une recommandation rapide.",
          ctaForm: "Ouvrir le formulaire complet",
          ctaReport: "Voir un exemple de rapport",
          miniTitle: "Contact rapide",
          name: "Nom complet",
          email: "Email",
          send: "Envoyer",
          sent: "Envoyé !",
          fail: "Erreur, réessayez.",
        };

  const [form, setForm] = useState({ full_name: "", email: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.full_name || !form.email) return;

    setStatus("sending");
    try {
      const r = await fetch("/api/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "eligibility_page_miniform",
        }),
      });
      setStatus(r.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{L.title}</h1>
      </div>

      <p className="text-gray-600">{L.lead}</p>

      {/* CTAs vers les pages HTML statiques */}
      <div className="flex flex-wrap gap-3">
        <a
          href="/evaluation-form.html"
          className="inline-flex items-center rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
        >
          {L.ctaForm}
        </a>
        <a
          href="/evaluation-report.html"
          className="inline-flex items-center rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
        >
          {L.ctaReport}
        </a>
      </div>

      {/* Mini-formulaire rapide */}
      <section className="border rounded-xl p-4">
        <h2 className="font-semibold mb-3">{L.miniTitle}</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">{L.name}</label>
            <input
              className="w-full rounded border px-3 py-2 text-sm"
              value={form.full_name}
              onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">{L.email}</label>
            <input
              type="email"
              className="w-full rounded border px-3 py-2 text-sm"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center rounded-lg bg-black text-white px-4 py-2 text-sm disabled:opacity-60"
          >
            {status === "sending" ? "…" : L.send}
          </button>

          {status === "ok" && <span className="ml-3 text-xs text-green-600">{L.sent}</span>}
          {status === "error" && <span className="ml-3 text-xs text-red-600">{L.fail}</span>}
        </form>
      </section>
    </div>
  );
}