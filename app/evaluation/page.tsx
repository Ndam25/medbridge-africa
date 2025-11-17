// app/evaluation/page.tsx

export default function EvaluationPage() {
  return (
    <main className="pt-24 pb-16 bg-slate-50">
      <section className="max-w-4xl mx-auto px-4">
        <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">
          Pré-évaluation EB-1A & EB-2 NIW
        </p>

        <h1 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900">
          Évaluation d&apos;éligibilité MedBridge Africa
        </h1>

        <p className="mt-4 text-sm md:text-base text-slate-700 leading-relaxed">
          Cette pré-évaluation vous permet d&apos;avoir un premier regard structuré
          sur votre potentiel pour les catégories d&apos;immigration qualifiée
          <span className="font-semibold"> EB-1A </span>
          (extraordinary ability) et
          <span className="font-semibold"> EB-2 NIW </span>
          (National Interest Waiver), en tenant compte de votre parcours, de vos
          réalisations et de votre projet aux États-Unis.
        </p>
      </section>

      {/* Boutons vers le formulaire et le rapport */}
      <section className="max-w-4xl mx-auto px-4 mt-8">
        <div className="grid gap-4 md:grid-cols-2">
          <a
            href="/evaluation-form.html"
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-800 transition"
          >
            Ouvrir le formulaire complet
          </a>

          <a
            href="/evaluation-report.html"
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
          >
            Voir un exemple de rapport
          </a>
        </div>

        <p className="mt-3 text-[11px] text-slate-500">
          Le formulaire peut prendre 10 à 20 minutes selon la complexité de votre
          parcours. Préparez votre CV, vos principales réalisations, et une idée
          claire de votre projet aux États-Unis.
        </p>
      </section>

      {/* Pour qui ? */}
      <section className="max-w-4xl mx-auto px-4 mt-12">
        <h2 className="text-xl font-semibold text-slate-900">
          Pour qui est faite cette pré-évaluation ?
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">
              Professionnels de santé
            </h3>
            <p className="mt-2 text-sm text-slate-700">
              Médecins, pharmaciens, infirmier(ère)s, spécialistes santé publique
              impliqués dans des programmes, projets ou structures de référence.
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">
              Chercheurs &amp; experts data
            </h3>
            <p className="mt-2 text-sm text-slate-700">
              Enseignants-chercheurs, épidémiologistes, biostatisticiens, data
              scientists, experts en IA appliquée à la santé ou aux politiques
              publiques.
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">
              Entrepreneurs &amp; leaders
            </h3>
            <p className="mt-2 text-sm text-slate-700">
              Fondateurs de start-up, responsables de programmes, porteurs
              d&apos;initiatives à fort impact économique, social ou sanitaire
              dans leur pays ou leur région.
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900">
              Profils hybrides
            </h3>
            <p className="mt-2 text-sm text-slate-700">
              Carrières combinant terrain, recherche, management, IA, santé
              digitale ou conseil, avec un impact démontré en Afrique ou dans la
              diaspora.
            </p>
          </div>
        </div>
      </section>

      {/* Comment ça marche ? */}
      <section className="max-w-4xl mx-auto px-4 mt-12">
        <h2 className="text-xl font-semibold text-slate-900">
          Comment se déroule l&apos;évaluation ?
        </h2>

        <ol className="mt-4 space-y-3 text-sm text-slate-700">
          <li>
            <span className="font-semibold">1. Vous remplissez le formulaire</span>{" "}
            avec vos informations personnelles, académiques et professionnelles.
          </li>
          <li>
            <span className="font-semibold">2. Nous analysons votre profil</span>{" "}
            à l&apos;aide d&apos;une grille interne inspirée des critères USCIS
            (sans valeur juridique).
          </li>
          <li>
            <span className="font-semibold">
              3. Vous recevez une appréciation globale
            </span>{" "}
            (EB-1A / EB-2 NIW) et des pistes concrètes pour renforcer votre
            dossier.
          </li>
        </ol>

        <p className="mt-4 text-[11px] text-slate-500">
          Cette évaluation ne remplace pas le conseil d&apos;un avocat
          d&apos;immigration. Elle vise à vous aider à mieux comprendre votre
          positionnement et à préparer vos prochaines étapes.
        </p>
      </section>
    </main>
  );
}
