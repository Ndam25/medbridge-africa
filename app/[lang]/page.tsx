export default function HomeLang() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Bienvenue / Welcome</h1>
      <p className="text-gray-600 mb-6">Ceci est la page d’accueil locale. Utilisez le menu pour naviguer.</p>
      <ul className="list-disc ml-6 space-y-2">
        <li><a className="underline" href="/fr/contact">FR – Contact</a></li>
        <li><a className="underline" href="/en/contact">EN – Contact</a></li>
        <li><a className="underline" href="/fr/eligibility">FR – Éligibilité</a></li>
        <li><a className="underline" href="/en/eligibility">EN – Eligibility</a></li>
      </ul>
    </main>
  );
}