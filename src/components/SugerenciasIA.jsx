import React, { useState, useCallback, memo } from 'react';
import { obtenerSugerenciasIA, formatearHabilidades, combinarHabilidades } from '../services/sugerenciasIA';

const SugerenciasIA = memo(function SugerenciasIA({ 
  onAplicarSugerencias, 
  datosActuales = {},
  disabled = false 
}) {
  const [tituloTrabajo, setTituloTrabajo] = useState('');
  const [sugerencias, setSugerencias] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  // Memoizar la función de obtener sugerencias
  const obtenerSugerencias = useCallback(async () => {
    if (!tituloTrabajo.trim()) {
      setError('Por favor, ingresa un título de trabajo');
      return;
    }

    setCargando(true);
    setError('');
    
    try {
      const resultado = await obtenerSugerenciasIA(tituloTrabajo);
      
      if (resultado.success) {
        setSugerencias(resultado.data);
        setMostrarSugerencias(true);
        setError('');
      } else {
        setError(resultado.error || 'Error al obtener sugerencias');
        setSugerencias(null);
      }
    } catch (err) {
      console.error('Error al obtener sugerencias:', err);
      setError('Error de conexión. Inténtalo de nuevo.');
      setSugerencias(null);
    } finally {
      setCargando(false);
    }
  }, [tituloTrabajo]);

  // Memoizar la función de aplicar sugerencias
  const aplicarSugerencias = useCallback((tipo) => {
    if (!sugerencias) return;

    const nuevasDatos = { ...datosActuales };

    if (tipo === 'habilidades' || tipo === 'ambos') {
      const habilidadesFormateadas = formatearHabilidades(sugerencias.habilidades);
      nuevasDatos.habilidades = datosActuales.habilidades 
        ? combinarHabilidades(datosActuales.habilidades, sugerencias.habilidades)
        : habilidadesFormateadas;
    }

    if (tipo === 'experiencia' || tipo === 'ambos') {
      // Si ya hay experiencia, agregar la sugerencia como complemento
      if (datosActuales.experiencia && datosActuales.experiencia.trim()) {
        nuevasDatos.experiencia = `${datosActuales.experiencia}\n\n${sugerencias.experiencia}`;
      } else {
        nuevasDatos.experiencia = sugerencias.experiencia;
      }
    }

    onAplicarSugerencias(nuevasDatos);
    setMostrarSugerencias(false);
  }, [sugerencias, datosActuales, onAplicarSugerencias]);

  // Memoizar el componente de sugerencias para evitar re-renders
  const ComponenteSugerencias = useCallback(() => {
    if (!mostrarSugerencias || !sugerencias) return null;

    const fuenteTexto = {
      'ia': '🤖 Generado por IA',
      'local': '💡 Sugerencias predefinidas',
      'generico': '📝 Sugerencias generales'
    };

    return (
      <div className="mt-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-soft">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-1">
              Sugerencias para: {tituloTrabajo}
            </h3>
            <p className="text-sm text-blue-600">
              {fuenteTexto[sugerencias.fuente] || 'Sugerencias disponibles'}
            </p>
          </div>
          <button
            onClick={() => setMostrarSugerencias(false)}
            className="text-blue-400 hover:text-blue-600 transition-colors"
            aria-label="Cerrar sugerencias"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Sugerencias de Habilidades */}
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Habilidades Sugeridas</h4>
              <button
                onClick={() => aplicarSugerencias('habilidades')}
                className="btn-secondary text-sm py-1 px-3"
                disabled={disabled}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sugerencias.habilidades.map((habilidad, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {habilidad}
                </span>
              ))}
            </div>
          </div>

          {/* Sugerencias de Experiencia */}
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Experiencia Sugerida</h4>
              <button
                onClick={() => aplicarSugerencias('experiencia')}
                className="btn-secondary text-sm py-1 px-3"
                disabled={disabled}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar
              </button>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {sugerencias.experiencia}
            </p>
          </div>

          {/* Botón para aplicar todo */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => aplicarSugerencias('ambos')}
              className="btn-accent py-2 px-6"
              disabled={disabled}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Aplicar Todas las Sugerencias
            </button>
          </div>
        </div>
      </div>
    );
  }, [mostrarSugerencias, sugerencias, tituloTrabajo, aplicarSugerencias, disabled]);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 shadow-soft">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Sugerencias Inteligentes con IA
          </h3>
          <p className="text-gray-600 text-sm">
            Obtén habilidades y experiencia personalizadas según tu título de trabajo
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="titulo-trabajo" className="block text-sm font-medium text-gray-700 mb-2">
            Título del trabajo o posición deseada
          </label>
          <div className="flex gap-3">
            <input
              id="titulo-trabajo"
              type="text"
              value={tituloTrabajo}
              onChange={(e) => setTituloTrabajo(e.target.value)}
              placeholder="Ej: Desarrollador Frontend, Marketing Manager, Diseñador UX..."
              className="input-field flex-1"
              disabled={disabled || cargando}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  obtenerSugerencias();
                }
              }}
            />
            <button
              onClick={obtenerSugerencias}
              disabled={disabled || cargando || !tituloTrabajo.trim()}
              className={`btn-accent px-6 whitespace-nowrap ${
                cargando ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {cargando ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generar
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800 text-sm">{error}</span>
            </div>
          </div>
        )}

        <ComponenteSugerencias />
      </div>
    </div>
  );
});

export default SugerenciasIA;
