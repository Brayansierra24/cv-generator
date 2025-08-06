import React from 'react';

const SugerenciasIAInteligente = ({ 
  sugerencias, 
  generandoIA, 
  onGenerarResumen, 
  onSugerirHabilidades, 
  onAplicarSugerencia,
  modoInteligente,
  onToggleModoInteligente 
}) => {
  return (
    <div className="group relative mb-8">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
        
        {/* Header con toggle del modo inteligente */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mr-3 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Asistente Inteligente</h3>
              <p className="text-slate-600 text-sm">IA que mejora tu CV automáticamente</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-slate-700">Modo IA</span>
            <button
              onClick={onToggleModoInteligente}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                modoInteligente ? 'bg-purple-600' : 'bg-slate-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  modoInteligente ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Descripción del modo inteligente */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
          <div className="flex items-start">
            <div className="p-1 bg-purple-500 rounded-full mr-3 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h5 className="font-semibold text-purple-800 text-sm mb-1">🧠 ¿Cómo funciona la IA?</h5>
              <p className="text-purple-700 text-xs leading-relaxed">
                La IA analiza tu información (experiencia, proyectos, educación) para generar automáticamente 
                resúmenes profesionales, sugerir habilidades relevantes y optimizar tu CV.
              </p>
            </div>
          </div>
        </div>

        {/* Acciones de IA */}
        {modoInteligente && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={onGenerarResumen}
              disabled={generandoIA}
              className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generandoIA ? (
                <>
                  <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  ✨ Generar Resumen
                </>
              )}
            </button>

            <button
              onClick={onSugerirHabilidades}
              disabled={generandoIA}
              className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generandoIA ? (
                <>
                  <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analizando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  🎯 Sugerir Habilidades
                </>
              )}
            </button>
          </div>
        )}

        {/* Lista de sugerencias */}
        {sugerencias.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Sugerencias de IA:</h4>
            {sugerencias.map((sugerencia) => (
              <div
                key={sugerencia.id}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  sugerencia.accion === 'aplicado'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-semibold text-slate-800">
                        {sugerencia.titulo}
                      </span>
                      {sugerencia.accion === 'aplicado' && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Aplicado
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{sugerencia.descripcion}</p>
                    
                    {/* Mostrar datos de la sugerencia si los hay */}
                    {sugerencia.datos && sugerencia.tipo === 'habilidades' && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {sugerencia.datos.slice(0, 6).map((habilidad, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full"
                          >
                            {habilidad}
                          </span>
                        ))}
                        {sugerencia.datos.length > 6 && (
                          <span className="text-xs text-slate-500">
                            +{sugerencia.datos.length - 6} más
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {sugerencia.accion === 'pendiente' && (
                    <button
                      onClick={() => onAplicarSugerencia(sugerencia)}
                      className="ml-4 flex items-center px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Aplicar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mensaje cuando no hay sugerencias */}
        {sugerencias.length === 0 && modoInteligente && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-slate-700 mb-2">¡La IA está lista para ayudarte!</h4>
            <p className="text-slate-500 text-sm">
              Completa algunos datos en tu CV y usa los botones de arriba para generar contenido inteligente.
            </p>
          </div>
        )}

        {/* Mensaje cuando el modo IA está desactivado */}
        {!modoInteligente && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-slate-700 mb-2">Modo IA desactivado</h4>
            <p className="text-slate-500 text-sm mb-4">
              Activa el modo IA para obtener sugerencias inteligentes y generar contenido automáticamente.
            </p>
            <button
              onClick={onToggleModoInteligente}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Activar IA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SugerenciasIAInteligente;
