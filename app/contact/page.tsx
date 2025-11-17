'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

type Lang = 'fr' | 'en';

const DICT = {
  fr: {
    title: 'Contact',
    subtitle: 'Une question ? Un projet ? Remplissez ce formulaire et nous vous répondrons rapidement.',
    name: 'Nom',
    email: 'Email',
    subject: 'Sujet',
    message: 'Message',
    send: 'Envoyer',
    sending: 'Envoi...',
    success: '✅ Merci, votre message a été envoyé avec succès.',
    errorA: '❌ Une erreur s’est produite. Veuillez réessayer ou écrire à ',
    errorLink: 'contact@healthacademia.shop',
    methodError: 'Méthode non autorisée',
  },
  en: {
    title: 'Contact Us',
    subtitle: 'Got a question or project? Fill this form and we will get back to you shortly.',
    name: 'Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send',
    sending: 'Sending...',
    success: '✅ Thanks! Your message has been sent successfully.',
    errorA: '❌ An error occurred. Please try again or email ',
    errorLink: 'contact@healthacademia.shop',
    methodError: 'Method not allowed',
  },
} as const;

export default function ContactPage() {
  const params = useSearchParams();
  const lang = (params.get('lang') as Lang) === 'en' ? 'en' : 'fr';
  const t = useMemo(() => DICT[lang], [lang]);

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '', // honeypot
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => null);

      if (res.status === 201 && data?.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', company: '' });
      } else {
        console.error('API error:', res.status, data);
        setStatus('error');
      }
    } catch (err) {
      console.error('Network error:', err);
      setStatus('error');
    }
  };

  // Simple language switcher
  const switchTo = lang === 'fr' ? 'en' : 'fr';
  const switchLabel = lang === 'fr' ? 'English' : 'Français';

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <a
          href={`?lang=${switchTo}`}
          className="text-sm underline hover:opacity-80"
          aria-label={`Switch to ${switchLabel}`}
        >
          {switchLabel}
        </a>
      </div>

      <p className="mb-6 text-gray-600">{t.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot anti-spam */}
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none' }}
          aria-hidden="true"
        />

        <div>
          <label className="block font-medium mb-1">{t.name}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">{t.email}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">{t.subject}</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">{t.message}</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
        >
          {status === 'sending' ? t.sending : t.send}
        </button>
      </form>

      {status === 'success' && (
        <p className="mt-4 text-green-600 font-medium">{t.success}</p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-red-600 font-medium">
          {t.errorA}
          <a href="mailto:contact@healthacademia.shop" className="underline">
            {t.errorLink}
          </a>.
        </p>
      )}
    </main>
  );
}

