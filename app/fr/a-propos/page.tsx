// app/fr/a-propos/page.tsx

export default function AProposPageFR() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          À propos de MedBridge Africa
        </h1>
        <p className="text-slate-700">
          MedBridge Africa est une passerelle entre les talents de santé
          africains et les opportunités académiques et professionnelles aux
          États-Unis. Nous aidons les professionnels de santé, chercheurs et
          experts en santé publique à structurer un parcours d’excellence
          aligné avec les catégories EB-1A et EB-2 NIW.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          Notre mission
        </h2>
        <p className="text-slate-700">
          Beaucoup de talents africains ont un impact réel sur le terrain, mais
          leurs contributions sont rarement traduites dans le langage attendu
          par les autorités d’immigration et les avocats. Notre mission est de
          réduire cette asymétrie d’information.
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            Valoriser les trajectoires africaines dans des standards
            internationaux d’excellence.
          </li>
          <li>
            Traduire des années de travail (terrain, recherche, programmes) en
            preuves recevables dans un dossier EB-1A / EB-2 NIW.
          </li>
          <li>
            Aider les candidats à prendre des décisions éclairées, sans faux
            espoirs ni promesses irréalistes.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Qui sommes-nous ?</h2>
        <p className="text-slate-700">
          MedBridge Africa est porté par le Dr Adama NDIR (MD, MSc), médecin,
          nutritionniste, épidémiologiste et data scientist, avec plus de 15–20
          ans d’expérience en :
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            formation en épidémiologie de terrain (FETP Frontline, Intermediate,
            Master) en Afrique de l’Ouest ;
          </li>
          <li>
            recherche et consulting en santé publique avec des ministères,
            agences de santé et partenaires internationaux ;
          </li>
          <li>
            usage de la data science et de l’IA pour la recherche, la formation
            et la prise de décision en santé.
          </li>
        </ul>
        <p className="text-slate-700">
          Cette double culture (terrain africain + standards internationaux)
          permet une traduction fidèle de votre parcours dans un langage
          compréhensible pour les comités d’évaluation, les avocats et les
          autorités américaines.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          Ce qui nous distingue
        </h2>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            Un accompagnement conçu spécifiquement pour les profils africains,
            et non un copier-coller de modèles américains.
          </li>
          <li>
            Une approche structurée, inspirée des critères USCIS et des bonnes
            pratiques d’évaluation de carrière.
          </li>
          <li>
            Un langage clair, pédagogique, sans jargon inutile, avec une
            transparence sur les limites et les incertitudes.
          </li>
          <li>
            Un respect strict de la confidentialité et de vos contraintes
            professionnelles.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Pour qui ?</h2>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>Médecins, pharmaciens, infirmiers(ères) spécialisés ;</li>
          <li>
            Épidémiologistes, biostatisticiens, data scientists et experts en
            santé digitale ;
          </li>
          <li>
            Chercheurs, enseignants-chercheurs, experts en santé globale et
            santé publique ;
          </li>
          <li>
            Entrepreneurs et leaders de programmes en santé, innovation ou IA en
            santé.
          </li>
        </ul>
      </section>

      <section className="border-t border-slate-200 pt-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Et si on structurait votre projet ensemble ?
        </h2>
        <p className="text-slate-700 mb-4">
          Que vous soyez au début de votre réflexion ou déjà avancé dans votre
          parcours, nous pouvons vous aider à clarifier vos options, prioriser
          vos actions et bâtir une stratégie réaliste.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="https://calendly.com/adama-ndir/30min"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            target="_blank"
            rel="noreferrer"
          >
            📅 Réserver un appel de 30 minutes
          </a>
          <a
            href="mailto:contact@healthacademia.shop"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            📧 Envoyer votre CV et un résumé de votre projet
          </a>
          <a
            href="https://wa.me/221771609016"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            target="_blank"
            rel="noreferrer"
          >
            💬 Poser vos questions via WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
