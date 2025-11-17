// app/fr/services/page.tsx

export default function ServicesPageFR() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Nos services d’accompagnement EB-1A / EB-2 NIW
        </h1>
        <p className="text-slate-700">
          MedBridge Africa aide les médecins, chercheurs, data scientists,
          épidémiologistes, biostatisticiens et leaders de santé publique à
          transformer leur parcours en un dossier d’immigration qualifiée solide
          vers les États-Unis.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          1. Pré-évaluation structurée & feuille de route personnalisée
        </h2>
        <p className="text-slate-700">
          Nous analysons votre CV, vos publications et votre impact pour
          identifier vos points forts et vos axes de renforcement au regard des
          critères EB-1A / EB-2 NIW.
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>Analyse de votre parcours académique et professionnel.</li>
          <li>
            Lecture de vos publications, communications et activités de
            leadership.
          </li>
          <li>
            Proposition d’une feuille de route sur 6–24 mois (publications,
            visibilité, responsabilités, projet aux États-Unis).
          </li>
        </ul>
        <p className="text-sm text-slate-500">
          Idéal pour les profils en phase de construction ou en réflexion sur
          l’opportunité de viser EB-1A / EB-2 NIW.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          2. Coaching scientifique & valorisation de votre profil
        </h2>
        <p className="text-slate-700">
          Nous vous accompagnons pour faire émerger la meilleure version de
          votre parcours scientifique et professionnel, en langage compréhensible
          pour les comités d’évaluation et les avocats.
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            Accompagnement à la rédaction d’articles, abstracts, posters et
            communications orales.
          </li>
          <li>
            Structuration de votre “narrative” professionnelle (positionnement,
            impact, leadership).
          </li>
          <li>
            Conseil sur l’usage responsable de l’IA pour accélérer la production
            scientifique (sans plagiat).
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          3. Accompagnement de dossier (non juridique) EB-1A / EB-2 NIW
        </h2>
        <p className="text-slate-700">
          Nous intervenons comme tiers expert entre votre parcours, vos
          preuves, et le langage attendu dans un dossier d’immigration
          qualifiée.
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            Organisation de vos preuves selon les critères de reconnaissance,
            d’impact et de leadership.
          </li>
          <li>
            Préparation de résumés d’impact, tableaux de synthèse et
            chronologie de carrière.
          </li>
          <li>
            Aide à la préparation de lettres de recommandation (contenu
            technique, angle, niveau de détail).
          </li>
          <li>
            Interface avec des avocats partenaires lorsque l’avis juridique est
            nécessaire.
          </li>
        </ul>
        <p className="text-sm text-slate-500">
          Important : MedBridge Africa n’est pas un cabinet d’avocats et ne
          fournit pas de conseil juridique. Nous intervenons comme experts en
          carrière, impact scientifique et structuration de preuves.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          4. Data, IA & santé publique pour institutions et programmes
        </h2>
        <p className="text-slate-700">
          Au-delà des dossiers individuels, MedBridge Africa accompagne aussi
          les institutions de santé, programmes de recherche et universités.
        </p>
        <ul className="list-disc list-inside text-slate-700 space-y-1">
          <li>
            Conseil en mise en place de solutions IA pour la recherche, la
            formation et la santé publique.
          </li>
          <li>
            Conception de modules de formation pour universités, écoles de
            santé et réseaux FETP.
          </li>
          <li>
            Projets sur mesure pour les ministères, agences de santé et
            partenaires internationaux.
          </li>
        </ul>
      </section>

      <section className="border-t border-slate-200 pt-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Prêt à structurer votre projet EB-1A / EB-2 NIW ?
        </h2>
        <p className="text-slate-700 mb-4">
          La plupart de nos accompagnements commencent par une pré-évaluation
          approfondie de votre profil, suivie d’une session de 30 à 60 minutes
          pour définir une stratégie réaliste et adaptée à votre situation.
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
            href="https://wa.me/221771609016"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            target="_blank"
            rel="noreferrer"
          >
            💬 Discuter sur WhatsApp
          </a>
          <a
            href="mailto:contact@healthacademia.shop"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            📧 Envoyer votre CV pour une première revue
          </a>
        </div>
      </section>
    </main>
  );
}
