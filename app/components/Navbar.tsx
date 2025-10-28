'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo-medbridge.png"
                alt="MedBridge Africa Logo"
                width={40}
                height={40}
              />
              <span className="font-bold text-xl text-[#0D3B66]">
                MedBridge Africa
              </span>
            </Link>
          </div>

          {/* MENU */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-[#00BFA6] font-medium">
              Accueil
            </Link>
            <Link href="/evaluation" className="text-gray-700 hover:text-[#00BFA6] font-medium">
              Évaluation
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-[#00BFA6] font-medium">
              Services
            </Link>
            <Link href='/a-propos' className="text-gray-700 hover:text-[#00BFA6] font-medium">
              À propos
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link
              href="/login"
              className="bg-[#00BFA6] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0D3B66] transition"
            >
              Se connecter
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-[#00BFA6] focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-2">
            <Link href="/" className="text-gray-700 hover:text-[#00BFA6]">
              Accueil
            </Link>
            <Link href="/evaluation" className="text-gray-700 hover:text-[#00BFA6]">
              Évaluation
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-[#00BFA6]">
              Services
            </Link>
            <Link href='/a-propos' className="text-gray-700 hover:text-[#00BFA6]">
              À propos
            </Link>
            <Link
              href="/login"
              className="bg-[#00BFA6] text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-[#0D3B66] transition"
            >
              Se connecter
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
