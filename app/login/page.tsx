// app/login/page.tsx

export default function LoginPage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Connexion à votre espace MedBridge Africa
        </h1>
        <p className="text-slate-700">
          Cet espace sera prochainement réservé aux clients et personnes
          accompagnées par MedBridge Africa, pour suivre leur dossier
          EB-1A / EB-2 NIW, accéder aux ressources et recevoir des mises à jour
          personnalisées.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <p className="text-sm font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            🚧 Fonctionnalité en cours de mise en place.<br />
            La connexion en ligne sera disponible dans une prochaine version.
          </p>

          <form className="space-y-4" action="#" method="post">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-800"
              >
                Adresse e-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                disabled
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none"
                placeholder="Votre e-mail (bientôt actif)"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-800"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                disabled
                className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none"
                placeholder="Votre mot de passe (bientôt actif)"
              />
            </div>

            <button
              type="submit"
              disabled
              className="w-full rounded-xl bg-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 cursor-not-allowed"
            >
              Connexion bientôt disponible
            </button>
          </form>
        </div>

        <div className="mt-6 space-y-2 text-sm text-slate-700">
          <p>🎯 D’ici là, vous pouvez déjà :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Compléter la{" "}
              <a
                href="/evaluation"
                className="font-semibold text-emerald-700 hover:underline"
              >
                pré-évaluation EB-1A / EB-2 NIW
              </a>{" "}
              pour obtenir un premier rapport indicatif.
            </li>
            <li>
              Réserver un appel pour discuter de votre situation avec MedBridge
              Africa.
            </li>
          </ul>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
            📧 Contacter MedBridge Africa
          </a>
        </div>
      </section>
    </main>
  );
}


