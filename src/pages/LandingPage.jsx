// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react'

export default function LandingPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Email subscrito:', email)
    setEmail('')
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <header className="px-4 lg:px-8 h-16 flex items-center justify-between border-b border-gray-300 bg-white shadow-sm">
        <a className="flex items-center" href="#">
          <img src="/icons/icon.svg" alt="Logo" className="h-10 w-auto" />
          <span className="sr-only">Eventos Increíbles</span>
        </a>
        <nav className="flex gap-4">
          <button
            className="text-sm font-medium px-5 py-2 rounded-md border border-gray-800 text-gray-800 bg-white hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/login')}
          >
            Iniciar Sesión
          </button>
          <button
            className="text-sm font-medium px-5 py-2 rounded-md border border-gray-800 text-gray-800 bg-white hover:bg-gray-100 transition-colors"
            onClick={() => navigate('/create-account')}
          >
            Crear Cuenta
          </button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-black">
                  Descubre Eventos Increíbles
                </h1>
                <p className="mx-auto max-w-2xl text-lg text-gray-700">
                  Únete a nuestra plataforma y vive experiencias únicas. Encuentra, participa y organiza eventos que te apasionan.
                </p>
              </div>
              <div className="space-x-4">
                <button
                  className="inline-flex items-center justify-center rounded-md border border-gray-800 bg-white px-6 py-3 text-base font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800"
                  onClick={() => navigate('/login')}
                >
                  Iniciar Sesión
                </button>
                <button
                  className="inline-flex items-center justify-center rounded-md border border-gray-800 bg-white px-6 py-3 text-base font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800"
                  onClick={() => navigate('/create-account')}
                >
                  Crear Cuenta
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-200">
          <div className="container px-4 md:px-8 mx-auto">
            <h2 className="text-3xl font-extrabold text-center text-black mb-12">Características Principales</h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4">
                <Calendar className="h-14 w-14 text-gray-800" />
                <h3 className="text-xl font-semibold text-black">Gestión de Eventos</h3>
                <p className="text-gray-700">Crea y administra tus eventos con facilidad.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <Users className="h-14 w-14 text-gray-800" />
                <h3 className="text-xl font-semibold text-black">Networking</h3>
                <p className="text-gray-700">Conecta con otros asistentes y expande tu red.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <MapPin className="h-14 w-14 text-gray-800" />
                <h3 className="text-xl font-semibold text-black">Localización</h3>
                <p className="text-gray-700">Encuentra eventos cerca de ti o en cualquier lugar.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-extrabold sm:text-5xl text-black">
                  ¿Listo para unirte?
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-700">
                  Suscríbete ahora y sé el primero en enterarte de los eventos más emocionantes.
                </p>
              </div>
              <form className="flex flex-col sm:flex-row w-full max-w-md gap-2" onSubmit={handleSubmit}>
                <input
                  className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
                  placeholder="Ingresa tu email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  className="inline-flex items-center justify-center rounded-md border border-gray-800 bg-white px-6 py-2 text-sm font-medium text-gray-800 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800"
                  type="submit"
                >
                  Suscribirse
                  <ArrowRight className="ml-2 h-4 w-4 text-gray-800" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-4 sm:flex-row py-6 w-full items-center px-4 md:px-8 border-t border-gray-300 bg-white">
        <p className="text-xs text-gray-600">
          © 2024 Eventos Increíbles. Todos los derechos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs text-gray-600 hover:underline" href="#">
            Términos de Servicio
          </a>
          <a className="text-xs text-gray-600 hover:underline" href="#">
            Privacidad
          </a>
        </nav>
      </footer>
    </div>
  )
}
