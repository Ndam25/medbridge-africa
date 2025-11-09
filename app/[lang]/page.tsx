type Props = { params: { lang: "fr" | "en" } };

export default function HomeLang({ params }: Props) {
  const lang = params?.lang === "en" ? "en" : "fr";
  const T =
    lang === "en"
      ? {
          title: "Welcome",
          intro: "Use the menu to navigate.",
          contact: "Contact",
          eval: "Eligibility",
          services: "Services",
          about: "About",
          login: "Sign in",
        }
      : {
          title: "Bienvenue",
          intro: "Utilisez le menu pour naviguer.",
          contact: "Contact",
          eval: "Évaluation",
          services: "Services",
          about: "À propos",
          login: "Se connecter",
        };

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-3">{T.title}</h1>
      <p className="text-gray-600 mb-6">{T.intro}</p>

      <ul className="list-disc ml-6 space-y-2">
        <li><a className="underline" href={`/${lang}/eligibility`}>{T.eval}</a></li>
        <li><a className="underline" href={`/${lang}/services`}>{T.services}</a></li>
        <li><a className="underline" href={lang === "fr" ? `/${lang}/a-propos` : `/${lang}/about`}>{T.about}</a></li>
        <li><a className="underline" href={lang === "fr" ? `/${lang}/se-connecter` : `/${lang}/login`}>{T.login}</a></li>
        <li><a className="underline" href={`/${lang}/contact`}>{T.contact}</a></li>
      </ul>
    </main>
  );
}