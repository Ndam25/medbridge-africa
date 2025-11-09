'use client';
import { useState, useMemo } from 'react';

type Lang = 'fr'|'en';
const T: Record<Lang, any> = {
  fr: {
    title:'Évaluation d’éligibilité',
    intro:'Dites-nous en plus pour une recommandation rapide.',
    full_name:'Nom complet',
    email:'Email',
    phone:'Téléphone',
    country:'Pays',
    profile:'Profil',
    goals:'Besoins / Objectifs',
    budget:'Budget estimatif',
    notes:'Notes (optionnel)',
    source:'Comment nous avez-vous connu ?',
    send:'Envoyer',
    sending:'Envoi...',
    ok:'✅ Merci, votre demande a été envoyée.',
    ko:'❌ Erreur, réessayez ou écrivez-nous.',
  },
  en: {
    title:'Eligibility Assessment',
    intro:'Tell us more for a quick recommendation.',
    full_name:'Full name',
    email:'Email',
    phone:'Phone',
    country:'Country',
    profile:'Profile',
    goals:'Needs / Goals',
    budget:'Estimated budget',
    notes:'Notes (optional)',
    source:'How did you hear about us?',
    send:'Send',
    sending:'Sending...',
    ok:'✅ Thanks, your request has been sent.',
    ko:'❌ Error, please retry or email us.',
  }
};

export default function EligibilityPage({ params }: { params: { lang: Lang } }) {
  const lang: Lang = (params?.lang === 'en' ? 'en' : 'fr');
  const L = useMemo(()=> T[lang], [lang]);

  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'ko'>('idle');
  const [f, setF] = useState({
    full_name:'', email:'', phone:'', country:'',
    profile:'', goals:'', budget:'', notes:'', source:'', company:'' // honeypot
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setF({ ...f, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('sending');
    try {
      const res = await fetch('/api/eligibility', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(f)
      });
      const data = await res.json().catch(()=>null);
      if (res.status===201 && data?.ok) {
        setStatus('ok');
        setF({full_name:'',email:'',phone:'',country:'',profile:'',goals:'',budget:'',notes:'',source:'',company:''});
      } else setStatus('ko');
    } catch { setStatus('ko'); }
  };

  const other = lang==='fr'?'en':'fr';

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{L.title}</h1>
        <a href={`/${other}/eligibility`} className="text-sm underline">
          {other==='fr'?'Français':'English'}
        </a>
      </div>
      <p className="mb-6 text-gray-600">{L.intro}</p>

      <form onSubmit={onSubmit} className="space-y-4">
        <input type="text" name="company" value={f.company} onChange={onChange} style={{display:'none'}} tabIndex={-1} autoComplete="off"/>

        <input className="w-full border p-2 rounded" placeholder={L.full_name} name="full_name" value={f.full_name} onChange={onChange} required/>
        <input className="w-full border p-2 rounded" placeholder={L.email} name="email" value={f.email} onChange={onChange} type="email" required/>
        <input className="w-full border p-2 rounded" placeholder={L.phone} name="phone" value={f.phone} onChange={onChange}/>
        <input className="w-full border p-2 rounded" placeholder={L.country} name="country" value={f.country} onChange={onChange}/>
        <input className="w-full border p-2 rounded" placeholder={L.profile} name="profile" value={f.profile} onChange={onChange}/>
        <textarea className="w-full border p-2 rounded" placeholder={L.goals} name="goals" value={f.goals} onChange={onChange} rows={3}/>
        <input className="w-full border p-2 rounded" placeholder={L.budget} name="budget" value={f.budget} onChange={onChange}/>
        <textarea className="w-full border p-2 rounded" placeholder={L.notes} name="notes" value={f.notes} onChange={onChange} rows={3}/>
        <input className="w-full border p-2 rounded" placeholder={L.source} name="source" value={f.source} onChange={onChange}/>

        <button type="submit" disabled={status==='sending'} className="bg-blue-600 text-white px-4 py-2 rounded">
          {status==='sending'?L.sending:L.send}
        </button>
      </form>

      {status==='ok' && <p className="mt-4 text-green-600">{L.ok}</p>}
      {status==='ko' && <p className="mt-4 text-red-600">{L.ko} <a className="underline" href="mailto:contact@healthacademia.shop">contact@healthacademia.shop</a>.</p>}
    </main>
  );
}
