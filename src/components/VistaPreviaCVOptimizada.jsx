import React, { useState, useCallback, memo } from 'react';

const VistaPreviaCVOptimizada = memo(function VistaPreviaCVOptimizada({ cv, datos }) {
  const [copiado, setCopiado] = useState(false);
  const [vistaFormateada, setVistaFormateada] = useState(true);

  // Memoizar la función de copiar para evitar recreaciones
  const copiarAlPortapapeles = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cv);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (error) {
      console.error('Error al copiar al portapapeles:', error);
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = cv;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  }, [cv]);

  // Función para parsear y formatear el CV (memoizada)
  const formatearCV = useCallback((cvTexto) => {
    if (!cvTexto) return null;
    
    const lineas = cvTexto.split('\n');
    const secciones = [];
    let seccionActual = null;
    
    lineas.forEach((linea, index) => {
      const lineaLimpia = linea.trim();
      
      // Detectar títulos de sección (líneas en mayúsculas o con ciertos patrones)
      if (lineaLimpia.match(/^[A-ZÁÉÍÓÚÑ\s]+:?$/) && lineaLimpia.length > 3) {
        if (seccionActual) secciones.push(seccionActual);
        seccionActual = {
          titulo: lineaLimpia.replace(':', ''),
          contenido: []
        };
      } else if (lineaLimpia && seccionActual) {
        seccionActual.contenido.push(lineaLimpia);
      } else if (lineaLimpia && !seccionActual) {
        // Primera línea probablemente es el nombre
        secciones.push({
          titulo: 'NOMBRE',
          contenido: [lineaLimpia]
        });
      }
    });
    
    if (seccionActual) secciones.push(seccionActual);
    return secciones;
  }, []);

  const secciones = formatearCV(cv);

  // Iconos para cada tipo de sección (memoizado)
  const obtenerIconoSeccion = useCallback((titulo) => {
    const tituloLower = titulo.toLowerCase();
    if (tituloLower.includes('nombre') || tituloLower.includes('personal')) return '👤';
    if (tituloLower.includes('experiencia') || tituloLower.includes('laboral')) return '💼';
    if (tituloLower.includes('educación') || tituloLower.includes('educacion')) return '🎓';
    if (tituloLower.includes('habilidades') || tituloLower.includes('skills')) return '🚀';
    if (tituloLower.includes('idiomas') || tituloLower.includes('languages')) return '🌍';
    if (tituloLower.includes('proyectos') || tituloLower.includes('projects')) return '🔧';
    if (tituloLower.includes('contacto') || tituloLower.includes('contact')) return '📧';
    return '📋';
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header mejorado */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold text-white flex items-center">
                <span className="mr-3">📄</span>
                Vista Previa del CV
              </h2>
              <p className="text-white/90 mt-2 text-lg">
                Tu currículum profesional generado con IA
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center ${
                  vistaFormateada
                    ? 'bg-white/20 text-white border border-white/30'
                    : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
                }`}
                onClick={() => setVistaFormateada(!vistaFormateada)}
                aria-label={vistaFormateada ? 'Cambiar a vista simple' : 'Cambiar a vista formateada'}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                {vistaFormateada ? 'Vista Simple' : 'Vista Formateada'}
              </button>
              <button
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center ${
                  copiado
                    ? 'bg-emerald-500 text-white border border-emerald-400'
                    : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                }`}
                onClick={copiarAlPortapapeles}
                aria-label={copiado ? 'Texto copiado al portapapeles' : 'Copiar CV al portapapeles'}
              >
                {copiado ? (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          {vistaFormateada && secciones ? (
            // Vista formateada con diseño profesional
            <div className="space-y-8">
              {/* Header del CV */}
              {secciones[0] && (
                <div className="text-center pb-6 border-b-2 border-gradient-to-r from-indigo-200 to-purple-200">
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {datos?.nombre || secciones[0].contenido[0] || 'Nombre Completo'}
                  </h1>
                  <p className="text-xl text-indigo-600 font-medium">
                    {datos?.cargo_deseado || 'Profesional'}
                  </p>
                </div>
              )}
              
              {/* Grid de secciones */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {secciones.slice(1).map((seccion, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">{obtenerIconoSeccion(seccion.titulo)}</span>
                      <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
                        {seccion.titulo}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {seccion.contenido.map((linea, lineaIndex) => (
                        <p key={lineaIndex} className="text-gray-700 leading-relaxed">
                          {linea}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Vista simple (texto plano)
            <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-8 shadow-inner">
              <pre 
                className="whitespace-pre-wrap text-gray-800 font-sans text-base leading-relaxed"
                role="document"
                aria-label="Contenido del CV generado"
              >
                {cv}
              </pre>
            </div>
          )}
          
          {/* Consejos mejorados */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-2xl">💡</span>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-bold text-blue-900">Consejo Profesional</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    Revisa cada sección y personaliza el contenido según la oferta laboral específica.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-2xl">✨</span>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-bold text-emerald-900">Listo para Descargar</h4>
                  <p className="text-sm text-emerald-800 mt-1">
                    Tu CV está optimizado y listo para ser descargado en formato PDF profesional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default VistaPreviaCVOptimizada;
