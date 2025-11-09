import { useParams } from "next/navigation";
export default function LoginPage() {
  const { lang } = useParams<{lang:"fr"|"en"}>();
  const T = lang==="en" ? { title:"Sign in", hint:"Authentication coming soon." }
                        : { title:"Se connecter", hint:"Authentification bientôt disponible." };
  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{T.title}</h1>
      <p className="text-gray-600">{T.hint}</p>
    </main>
  );
}