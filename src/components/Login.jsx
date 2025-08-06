import React, { useState, useCallback } from 'react';
import api from '../config/axios';
import { handleLaravelError } from '../config/laravel';

function Login({ onLogin }) {
  const [esRegistro, setEsRegistro] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    cargo_deseado: '',
    experiencia_laboral: '',
    educacion: '',
    habilidades: '',
    idiomas: '',
  });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');
    
    try {
      if (esRegistro) {
        const response = await api.post('/register', form);
        setEsRegistro(false);
        setError('✅ Registro exitoso. Ahora puedes iniciar sesión.');
      } else {
        const response = await api.post('/login', {
          email: form.email,
          password: form.password
        });
        onLogin();
      }
    } catch (err) {
      const errorInfo = handleLaravelError(err);
      setError(errorInfo.message);
    } finally {
      setCargando(false);
    }
  }, [form, esRegistro, onLogin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/30 to-red-600/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-bounce-gentle"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-slideIn">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 mb-6 animate-glow">
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 text-gradient-primary">
            {esRegistro ? '✨ Crear Cuenta' : '🚀 Bienvenido'}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {esRegistro 
              ? 'Completa tus datos para crear tu cuenta y comenzar a generar CVs profesionales con IA' 
              : 'Inicia sesión para acceder a tu generador de CV con inteligencia artificial'
            }
          </p>
        </div>

        {/* Formulario */}
        <div className="glass-card max-w-3xl mx-auto p-8 animate-slideIn">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campos de registro */}
            {esRegistro && (
              <div className="space-y-6">
                {/* Información Personal */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    👤 Información Personal
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        ✨ Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200 input-focus-effect"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        💼 Cargo deseado
                      </label>
                      <input
                        type="text"
                        name="cargo_deseado"
                        value={form.cargo_deseado}
                        onChange={handleChange}
                        placeholder="Ej: Desarrollador Full Stack"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-200 input-focus-effect"
                      />
                    </div>
                  </div>
                </div>

                {/* Experiencia y Educación */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                    💼 Experiencia y Educación
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        🏢 Experiencia laboral
                      </label>
                      <textarea
                        name="experiencia_laboral"
                        value={form.experiencia_laboral}
                        onChange={handleChange}
                        placeholder="Describe tu experiencia laboral..."
                        rows="4"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200 resize-none input-focus-effect"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        🎓 Educación
                      </label>
                      <textarea
                        name="educacion"
                        value={form.educacion}
                        onChange={handleChange}
                        placeholder="Describe tu formación académica..."
                        rows="4"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all duration-200 resize-none input-focus-effect"
                      />
                    </div>
                  </div>
                </div>

                {/* Habilidades e Idiomas */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    🚀 Habilidades e Idiomas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        💡 Habilidades
                      </label>
                      <input
                        type="text"
                        name="habilidades"
                        value={form.habilidades}
                        onChange={handleChange}
                        placeholder="Ej: JavaScript, React, Node.js"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-200 input-focus-effect"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        🌍 Idiomas
                      </label>
                      <input
                        type="text"
                        name="idiomas"
                        value={form.idiomas}
                        onChange={handleChange}
                        placeholder="Ej: Español, Inglés"
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 transition-all duration-200 input-focus-effect"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Campos de autenticación */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                🔐 Datos de Acceso
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">
                  📧 Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200 input-focus-effect"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-white/90 mb-2">
                  🔒 Contraseña *
                </label>
                <div className="relative">
                  <input
                    type={mostrarPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200 input-focus-effect"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {mostrarPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-white/60 mt-1">La contraseña debe tener al menos 8 caracteres</p>
              </div>

              {esRegistro && (
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    🔐 Confirmar contraseña *
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={form.password_confirmation}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200 input-focus-effect"
                    required
                  />
                </div>
              )}
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="bg-red-500/10 backdrop-blur-sm border border-red-400/30 rounded-xl p-4 animate-slideIn">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-200 text-sm leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={cargando}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                cargando
                  ? 'bg-white/20 cursor-not-allowed text-white/60'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 animate-glow'
              }`}
            >
              {cargando ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {esRegistro ? '✨ Creando cuenta...' : '🚀 Iniciando sesión...'}
                </span>
              ) : (
                esRegistro ? '✨ Crear Cuenta' : '🚀 Iniciar Sesión'
              )}
            </button>

            {/* Enlace para cambiar modo */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => { setEsRegistro(!esRegistro); setError(''); }}
                className="text-white/80 hover:text-white font-medium transition-all duration-200 hover:scale-105 underline decoration-white/30 hover:decoration-white/60"
              >
                {esRegistro 
                  ? '🔑 ¿Ya tienes cuenta? Inicia sesión' 
                  : '✨ ¿No tienes cuenta? Regístrate'
                }
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 animate-slideIn">
          <div className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
            <p className="text-white/70 text-sm font-medium">
              ✨ © 2024 CV Generator. Creado con 💜 por Brayan Andres Sierra Bran.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
