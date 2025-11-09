export default function AboutPage({ params }: { params: { lang: 'fr'|'en' } }) {
  const isEn = params?.lang === 'en';
  const title = isEn ? 'About' : 'À propos';
  const body = isEn
    ? 'MedBridge Africa connects African health innovators with global expertise.'
    : 'MedBridge Africa relie les innovateurs en santé en Afrique à une expertise globale.';
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600">{body}</p>
    </main>
  );
}