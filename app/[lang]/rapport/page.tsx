// app/[lang]/rapport/page.tsx
'use client';
import { useEffect, useState } from 'react';

type RecordType = {
  id?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  country?: string;
  profile?: string;
  goals?: string;
  budget?: string;
  notes?: string;
  source?: string;
  created_at?: string;
};

export default function RapportPage() {
  const [data, setData] = useState<RecordType | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const u = new URL(window.location.href);
    const id = u.searchParams.get('id');
    if (!id) { setErr('Aucun identifiant fourni.'); return; }
    fetch(`/api/eligibility/get?id=${encodeURIComponent(id)}`)
      .then(r => r.json())
      .then(j => j.ok ? setData(j.data) : setErr(j.error || 'Erreur'))
      .catch(() => setErr('Erreur réseau'));
  }, []);

  if (err) return <p className="text-red-600">❌ {err}</p>;
  if (!data) return <p>Chargement du rapport…</p>;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border shadow-sm p-4">
        <h1 className="text-2xl font-bold mb-2">Rapport d’éligibilité</h1>
        <p className="text-sm text-gray-600">Soumission #{data.id}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card label="Nom">{data.full_name}</Card>
        <Card label="Email">{data.email}</Card>
        <Card label="Téléphone">{data.phone}</Card>
        <Card label="Pays">{data.country}</Card>
        <Card label="Profil">{data.profile}</Card>
        <Card label="Budget">{data.budget}</Card>
        <Card label="Source">{data.source}</Card>
        <Card label="Créé le">{data.created_at?.slice(0, 19).replace('T',' ')}</Card>
      </div>
      <Card label="Besoins / Objectifs">
        <pre className="whitespace-pre-wrap">{data.goals}</pre>
      </Card>
      <Card label="Notes">
        <pre className="whitespace-pre-wrap">{data.notes}</pre>
      </Card>
      <div className="rounded-2xl border shadow-sm overflow-hidden">
        <iframe
          src="/evaluation-report.html"
          className="h-[85vh] w-full"
          title="Rapport détails"
        />
      </div>
    </div>
  );
}

function Card({ label, children }: { label: string; children: any }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-xs uppercase text-gray-500">{label}</div>
      <div className="mt-1">{children || <span className="text-gray-400">—</span>}</div>
    </div>
  );
}
