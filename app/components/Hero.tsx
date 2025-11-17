// app/components/Hero.tsx

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-slate-50 pt-24 pb-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-center">
        {/* Colonne texte */}
        <div className="flex-1 space-y-6">
          <p className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            Nouveau · Pré-évaluation EB-1A & EB-2 NIW
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Passerelle entre les talents de santé africains{" "}
            <span className="block text-blue-700">
              et les opportunités académiques et professionnelles aux États-Unis
            </span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-slate-700">
            MedBridge Africa accompagne les médecins, chercheurs, data scientists
            et leaders de santé publique dans leurs démarches d&apos;immigration
            qualifiée (EB-1A, EB-2 NIW) et leurs projets de carrière internationale.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/fr/eligibility"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-800"
            >
              Commencer l&apos;évaluation
            </Link>
            <Link
              href="/fr/services"
              className="rounded-lg border border-blue-200 px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Découvrir nos services
            </Link>
          </div>

          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>• Analyse rapide de votre profil EB-1A / EB-2 NIW</li>
            <li>• Recommandations concrètes pour renforcer votre dossier</li>
            <li>• Accompagnement sur-mesure, adapté au contexte africain</li>
          </ul>
        </div>

        {/* Colonne encadré latéral */}
        <div className="flex-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-900">
              Qui peut bénéficier de MedBridge Africa ?
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
              <li>• Médecins, pharmaciens, infirmiers(ères) spécialisés</li>
              <li>• Épidémiologistes, biostatisticiens, data scientists</li>
              <li>• Chercheurs, enseignants-chercheurs, experts en santé globale</li>
              <li>• Entrepreneurs et leaders de programmes en santé</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

