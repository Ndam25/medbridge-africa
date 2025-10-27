import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'

type Service = {
  slug: string
  title: string
  subtitle: string
  bullets: string[]
  cta: string
  href: string
}

const SERVICES: Service[] = [
  {
    slug: 'eb2-niw',
    title: 'EB2-NIW — National Interest Waiver',
    subtitle: 'Éligibilité, stratégie, preuves & lettre d’intérêt',
    bullets: [
      'Diagnostic d’éligibilité et scoring',
      'Stratégie dossier (3 prongs)',
      'Relecture et structuration des preuves',
      'Lettre d’intérêt (draft et itérations)'
    ],
    cta: 'Commencer l’évaluation',
    href: '/evaluation'
  },
  {
    slug: 'eb1-a',
    title: 'EB1-A — Extraordinary Ability',
    subtitle: 'Accompagnement critères, preuves & recommandation',
    bullets: [
      'Cartographie des critères pertinents',
      'Collecte & packaging de preuves',
      'Lettres de recommandation (guides & modèles)',
      'Préparation à la soumission'
    ],
    cta: 'Vérifier mon éligibilité',
    href: '/evaluation'
  },
  {
    slug: 'coaching',
    title: 'Coaching académique (USMLE/TOEFL/MCAT)',
    subtitle: 'Plans ciblés, mentors et simulations',
    bullets: [
      'Plan de préparation personnalisé',
      'Mentorat par professionnels africains aux USA',
      'Simulations & feedback',
      'Suivi hebdomadaire'
    ],
    cta: 'Réserver un appel',
    href: '/contact'
  },
  {
    slug: 'visa',
    title: 'Visa, accréditation & traduction',
    subtitle: 'Démarches administratives sécurisées',
    bullets: [
      'Visa étudiant / visite / travail : guidance',
      'ECFMG, state boards, equivalences',
      'Traductions certifiées',
      'Checklists et vérification finale'
    ],
    cta: 'Parler à un conseiller',
    href: '/contact'
  }
]

function ServiceCard({ s }: { s: Service }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-[#0D3B66]">{s.title}</h3>
      <p className="mt-1 text-slate-600">{s.subtitle}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700 list-disc pl-5">
        {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      <Link
        href={s.href}
        className="mt-5 inline-block rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white hover:bg-emerald-400 transition"
      >
        {s.cta}
      </Link>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-gradient-to-b from-[#0D3B66] to-[#093050] text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold">Nos services</h1>
            <p className="mt-2 text-white/80 max-w-2xl">
              De l’éligibilité (EB1-A/EB2-NIW) au coaching USMLE/TOEFL, jusqu’aux démarches
              visa & accréditation — nous vous accompagnons de bout en bout.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-10 grid gap-6 md:grid-cols-2">
          {SERVICES.map(s => <ServiceCard key={s.slug} s={s} />)}
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-16">
          <div className="rounded-2xl border bg-white p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-[#0D3B66]">
                Prêt à démarrer ?
              </h2>
              <p className="text-slate-600">
                Faites votre évaluation en 3–5 minutes et recevez un brouillon de rapport.
              </p>
            </div>
            <Link
              href="/evaluation"
              className="rounded-lg bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-400 transition"
            >
              Commencer l’évaluation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
