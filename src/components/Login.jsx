import React, { useState } from 'react';
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

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setCargando(true);
    setError('');
    
    console.log('Datos del formulario:', form);
    
    try {
      if (esRegistro) {
        console.log('Intentando registro con datos:', form);
        const response = await api.post('/register', form);
        console.log('Respuesta del registro:', response);
        setEsRegistro(false);
        setError('Registro exitoso. Ahora puedes iniciar sesión.');
      } else {
        console.log('Intentando login con datos:', { email: form.email, password: form.password });
        const response = await api.post('/login', {
          email: form.email,
          password: form.password
        });
        console.log('Respuesta del login:', response);
        onLogin();
      }
    } catch (err) {
      console.error('Error completo:', err);
      console.error('Error response:', err.response);
      console.error('Error data:', err.response?.data);
      console.error('Error status:', err.response?.status);
      
      const errorInfo = handleLaravelError(err);
      setError(errorInfo.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 mb-6">
            <svg className="h-10 w-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {esRegistro ? 'Crear Cuenta' : 'Bienvenido'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {esRegistro 
              ? 'Completa tus datos para crear tu cuenta y comenzar a generar CVs profesionales' 
              : 'Inicia sesión para acceder a tu generador de CV con inteligencia artificial'
            }
          </p>
        </div>

        {/* Formulario */}
        <div className="card max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campos de registro */}
            {esRegistro && (
              <div className="space-y-6">
                {/* Información Personal */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Información Personal
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cargo deseado
                      </label>
                      <input
                        type="text"
                        name="cargo_deseado"
                        value={form.cargo_deseado}
                        onChange={handleChange}
                        placeholder="Ej: Desarrollador Full Stack"
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>

                {/* Experiencia y Educación */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                    Experiencia y Educación
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experiencia laboral
                      </label>
                      <textarea
                        name="experiencia_laboral"
                        value={form.experiencia_laboral}
                        onChange={handleChange}
                        placeholder="Describe tu experiencia laboral..."
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Educación
                      </label>
                      <textarea
                        name="educacion"
                        value={form.educacion}
                        onChange={handleChange}
                        placeholder="Describe tu formación académica..."
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Habilidades e Idiomas */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Habilidades e Idiomas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Habilidades
                      </label>
                      <input
                        type="text"
                        name="habilidades"
                        value={form.habilidades}
                        onChange={handleChange}
                        placeholder="Ej: JavaScript, React, Node.js"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Idiomas
                      </label>
                      <input
                        type="text"
                        name="idiomas"
                        value={form.idiomas}
                        onChange={handleChange}
                        placeholder="Ej: Español, Inglés"
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Campos de autenticación */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                Datos de Acceso
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña *
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">La contraseña debe tener al menos 8 caracteres</p>
              </div>

              {esRegistro && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar contraseña *
                  </label>
                  <input
                    type="password"
                    name="password_confirmation"
                    value={form.password_confirmation}
                    onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
              )}
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={cargando}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                cargando
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {cargando ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {esRegistro ? 'Creando cuenta...' : 'Iniciando sesión...'}
                </span>
              ) : (
                esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'
              )}
            </button>

            {/* Enlace para cambiar modo */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => { setEsRegistro(!esRegistro); setError(''); }}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                {esRegistro 
                  ? '¿Ya tienes cuenta? Inicia sesión' 
                  : '¿No tienes cuenta? Regístrate'
                }
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2024 CV Generator. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
