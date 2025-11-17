// app/fr/contact/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ContactPageFr() {
  return (
    <main style={{ padding: '4rem 1rem', maxWidth: 920, margin: '0 auto' }}>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Contactez-nous</h1>
      <p style={{ margin: '8px 0 20px' }}>
        Cette page est en cours de développement.
      </p>
      <p style={{ margin: 0 }}>
        Pour toute question, écrivez-nous à{' '}
        <a href="mailto:contact@healthacademia.shop">contact@healthacademia.shop</a>.
      </p>
    </main>
  );
}
