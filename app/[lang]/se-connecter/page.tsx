export default function LoginPage({ params }: { params: { lang: 'fr'|'en' } }) {
  const isEn = params?.lang === 'en';
  const title = isEn ? 'Sign in' : 'Se connecter';
  const hint = isEn ? 'Authentication coming soon.' : 'Authentification bientôt disponible.';
  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600">{hint}</p>
    </main>
  );
}