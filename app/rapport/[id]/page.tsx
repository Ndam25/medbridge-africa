app/
└─ rapport/
   └─ [id]/
      └─ page.tsx   ← ce fichier
'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

type EvalMeta = {
  id: string
  programme: string | null
  total_score: number | null
  band: string | null
  score_eb1: number | null
  score_niw: number | null
  lead_id: string | null
  created_at: string
}

type Lead = {
  id: string
  full_name: string | null
  email: string | null
  country: string | null
  program: string | null
}

export default function RapportPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [meta, setMeta] = useState<EvalMeta | null>(null)
  const [lead, setLead] = useState<Lead | null>(null)
  const [signedUrl, setSignedUrl] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        // Vérifs env (clé publique seulement)
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        if (!url || !anon) {
          setError("Clés Supabase publiques manquantes. Vérifiez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.")
          setLoading(false)
          return
        }

        const supabase = createClient(url, anon)

        // 1) Charger l’évaluation
        const { data: ev, error: evErr } = await supabase
          .from('evaluations')
          .select('id, programme, total_score, band, score_eb1, score_niw, lead_id, created_at')
          .eq('id', id)
          .single()

        if (evErr || !ev) {
          setError("Rapport introuvable ou accès refusé.")
          setLoading(false)
          return
        }
        setMeta(ev as EvalMeta)

        // 2) Charger le lead associé (nom, email, pays…)
        if (ev.lead_id) {
          const { data: ld, error: ldErr } = await supabase
            .from('leads')
            .select('id, full_name, email, country, program')
            .eq('id', ev.lead_id)
            .single()
          if (!ldErr && ld) setLead(ld as Lead)
        }

        // 3) (Option) demander une URL signée via une Function proxy si tu l’ajoutes plus tard
        //    Ici on tente une route facultative côté Netlify:
        //    /.netlify/functions/get-report?id=<evaluation_id>
        //    Si tu ne l’as pas encore, ignore ce bloc (pas d’erreur bloquante).
        try {
          const r = await fetch(`/.netlify/functions/get-report?id=${id}`)
          if (r.ok) {
            const j = await r.json()
            if (j?.url) setSignedUrl(j.url)
          }
        } catch {
          // silencieux: la function n'existe peut-être pas encore
        }

        setLoading(false)
      } catch (e: any) {
        setError(e?.message || 'Erreur inconnue.')
        setLoading(false)
      }
    }
    run()
  }, [id])

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-[#0D3B66]">Chargement du rapport…</h1>
        <p className="text-slate-600 mt-2">Merci de patienter.</p>
      </main>
    )
  }

  if (error || !meta) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-red-600">Erreur</h1>
        <p className="text-slate-700 mt-2">{error || 'Rapport introuvable.'}</p>
        <button
          className="mt-4 px-4 py-2 rounded-lg bg-[#0D3B66] text-white"
          onClick={() => router.push('/')}
        >
          Retour à l’accueil
        </button>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-[#0D3B66]">Rapport — Brouillon</h1>
        <p className="text-slate-600 text-sm">ID : {meta.id} • Créé le {new Date(meta.created_at).toLocaleString()}</p>
      </header>

      <section className="bg-white rounded-xl shadow p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Candidat</h2>
        <p><strong>Nom :</strong> {lead?.full_name || '—'}</p>
        <p><strong>Email :</strong> {lead?.email || '—'}</p>
        <p><strong>Pays :</strong> {lead?.country || '—'}</p>
        <p><strong>Programme :</strong> {meta.programme || lead?.program || '—'}</p>
      </section>

      <section className="bg-white rounded-xl shadow p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Résultats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg border">
            <p className="text-sm text-slate-500">EB1-A</p>
            <p className="text-2xl font-bold">{meta.score_eb1 ?? '—'}<span className="text-sm"> /100</span></p>
          </div>
          <div className="p-3 rounded-lg border">
            <p className="text-sm text-slate-500">EB2-NIW</p>
            <p className="text-2xl font-bold">{meta.score_niw ?? '—'}<span className="text-sm"> /100</span></p>
          </div>
          <div className="p-3 rounded-lg border">
            <p className="text-sm text-slate-500">Conclusion</p>
            <p className="text-2xl font-bold">{meta.band ?? '—'}</p>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3">* Brouillon automatique — à valider par un conseiller.</p>
      </section>

      {signedUrl ? (
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Version HTML du rapport</h2>
          <p className="text-slate-600 mb-3">
            Une version HTML privée a été générée et stockée (URL signée, expiration automatique).
          </p>
          <a
            className="inline-block px-4 py-2 rounded-lg bg-emerald-600 text-white"
            href={signedUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ouvrir le rapport
          </a>
        </section>
      ) : (
        <section className="bg-white rounded-xl shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Version HTML non disponible</h2>
          <p className="text-slate-600">
            La fonction de proxy d’URL signée n’est pas encore en place. Vous pouvez l’ajouter plus tard
            (ex. Netlify Function <code>get-report</code>) ou rediriger directement depuis la soumission du formulaire
            vers l’URL signée renvoyée par <code>submit-evaluation</code>.
          </p>
        </section>
      )}
    </main>
  )
}
