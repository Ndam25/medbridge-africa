import { useParams } from "next/navigation";
export default function AboutPage() {
  const { lang } = useParams<{lang:"fr"|"en"}>();
  const T = lang==="en"
    ? { title:"About", body:"MedBridge Africa connects African health innovators with global expertise." }
    : { title:"À propos", body:"MedBridge Africa relie les innovateurs en santé en Afrique à une expertise globale." };
  return (
    <main className="max-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{T.title}</h1>
      <p className="text-gray-600">{T.body}</p>
    </main>
  );
}