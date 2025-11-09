export default function ServicesPage({ params }: { params: { lang: 'fr'|'en' } }) {
  const isEn = params?.lang === 'en';
  const title = 'Services';
  const intro = isEn ? 'What we offer' : 'Ce que nous proposons';
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-6">{intro}</p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Advisory / Coaching</li>
        <li>Program design & evaluation</li>
        <li>Data science & AI for health</li>
      </ul>
    </main>
  );
}