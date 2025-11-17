'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Nom du site */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-800">
              MedBridge Africa
            </Link>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Accueil
            </Link>

            <Link href="/evaluation" className="text-gray-700 hover:text-blue-600 transition">
              Évaluation
            </Link>

            <Link href="/services" className="text-gray-700 hover:text-blue-600 transition">
              Services
            </Link>

            <Link href="/a-propos" className="text-gray-700 hover:text-blue-600 transition">
              À propos
            </Link>

            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition font-semibold">
              Contact
            </Link>

            <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">
              Se connecter
            </Link>

            {/* Sélecteur de langue desktop */}
            <div className="flex items-center space-x-2 ml-4 text-sm">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                FR
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/en" className="text-gray-700 hover:text-blue-600 font-medium">
                EN
              </Link>
            </div>
          </div>

          {/* Bouton mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>

            <Link
              href="/evaluation"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Évaluation
            </Link>

            <Link
              href="/services"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>

            <Link
              href="/a-propos"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              À propos
            </Link>

            <Link
              href="/contact"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            <Link
              href="/login"
              className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Se connecter
            </Link>

            {/* Sélecteur de langue mobile */}
            <div className="border-t mt-2 pt-2">
              <div className="flex space-x-4 px-3 py-2">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  FR
                </Link>
                <Link
                  href="/en"
                  className="text-gray-700 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  EN
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
