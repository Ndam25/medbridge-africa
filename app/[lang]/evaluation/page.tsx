// app/[lang]/evaluation/page.tsx
export default function EvaluationPage() {
  return (
    <div className="rounded-2xl border shadow-sm">
      <iframe
        src="/evaluation-form.html"
        className="h-[85vh] w-full rounded-2xl"
        title="Formulaire d'évaluation"
      />
    </div>
  );
}
