import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#0D3B66] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bloc 1 : Logo + Description */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Image
                src="/logo-medbridge.png"
                alt="MedBridge Africa Logo"
                width={40}
                height={40}
              />
              <h3 className="font-bold text-lg">MedBridge Africa</h3>
            </div>
            <p className="text-sm text-gray-200 leading-6">
              Passerelle entre les talents de santé africains et les
              opportunités académiques et professionnelles aux États-Unis.
            </p>
          </div>

          {/* Bloc 2 : Liens rapides */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Liens rapides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/evaluation" className="hover:text-[#00BFA6]">
                  Évaluation
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#00BFA6]">
                  Nos services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00BFA6]">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#00BFA6]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Bloc 3 : Réseaux sociaux */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Suivez-nous</h4>
            <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/company/medbridge-africa"
                target="_blank"
                className="hover:text-[#00BFA6]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.291c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.291h-3v-4.604c0-1.099-.021-2.513-1.531-2.513-1.533 0-1.767 1.197-1.767 2.435v4.682h-3v-9h2.879v1.233h.041c.4-.757 1.379-1.555 2.841-1.555 3.038 0 3.6 2.002 3.6 4.604v4.718z" />
                </svg>
              </Link>
              <Link
                href="https://www.facebook.com/medbridgeafrica"
                target="_blank"
                className="hover:text-[#00BFA6]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.676 0h-21.352c-.731 0-1.324.593-1.324 1.324v21.352c0 .731.593 1.324 1.324 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.716-1.795 1.764v2.311h3.587l-.467 3.622h-3.12v9.294h6.116c.731 0 1.324-.593 1.324-1.324v-21.352c0-.731-.593-1.324-1.324-1.324z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Ligne de copyright */}
        <div className="border-t border-gray-500 mt-10 pt-4 text-center text-sm text-gray-300">
          © {new Date().getFullYear()} MedBridge Africa. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
