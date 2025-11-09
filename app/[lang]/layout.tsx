type Props = {
  children: React.ReactNode;
  params: { lang: "fr" | "en" };
};

export const dynamic = "force-static";

export default function LangLayout({ children, params }: Props) {
  const lang = params?.lang === "en" ? "en" : "fr";
  const other = lang === "fr" ? "en" : "fr";

  const T =
    lang === "en"
      ? {
          brand: "MedBridge Africa",
          eval: "Eligibility",
          services: "Services",
          about: "About",
          login: "Sign in",
          contact: "Contact",
          switch: "Français",
        }
      : {
          brand: "MedBridge Africa",
          eval: "Évaluation",
          services: "Services",
          about: "À propos",
          login: "Se connecter",
          contact: "Contact",
          switch: "English",
        };

  return (
    <html lang={lang}>
      <body className="min-h-screen bg-white text-gray-900">
        <header className="border-b">
          <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <a href={`/${lang}`} className="font-semibold">
              {T.brand}
            </a>
            <ul className="flex items-center gap-4 text-sm">
              <li><a className="hover:underline" href={`/${lang}/eligibility`}>{T.eval}</a></li>
              <li><a className="hover:underline" href={`/${lang}/services`}>{T.services}</a></li>
              <li>
                <a className="hover:underline" href={lang === "fr" ? `/${lang}/a-propos` : `/${lang}/about`}>
                  {T.about}
                </a>
              </li>
              <li>
                <a className="hover:underline" href={lang === "fr" ? `/${lang}/se-connecter` : `/${lang}/login`}>
                  {T.login}
                </a>
              </li>
              <li><a className="hover:underline" href={`/${lang}/contact`}>{T.contact}</a></li>
              <li className="ml-2 pl-3 border-l">
                <a className="hover:underline" href={`/${other}`}>{T.switch}</a>
              </li>
            </ul>
          </nav>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

        <footer className="border-t mt-12">
          <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-gray-500">
             {new Date().getFullYear()} MedBridge Africa
          </div>
        </footer>
      </body>
    </html>
  );
}