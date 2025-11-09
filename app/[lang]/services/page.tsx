import { useParams } from "next/navigation";
export default function ServicesPage() {
  const { lang } = useParams<{lang:"fr"|"en"}>();
  const T = lang==="en" ? { title:"Services", intro:"What we offer" }
                        : { title:"Services", intro:"Ce que nous proposons" };
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{T.title}</h1>
      <p className="text-gray-600 mb-6">{T.intro}</p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Advisory / Coaching</li>
        <li>Program design & evaluation</li>
        <li>Data science & AI for health</li>
      </ul>
    </main>
  );
}