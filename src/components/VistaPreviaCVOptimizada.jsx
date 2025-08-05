import React, { useState, useCallback, memo } from 'react';

const VistaPreviaCVOptimizada = memo(function VistaPreviaCVOptimizada({ cv }) {
  const [copiado, setCopiado] = useState(false);

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

  // Memoizar el botón de copiar para evitar re-renders innecesarios
  const BotonCopiar = useCallback(() => (
    <button
      className={`btn-secondary transition-all duration-200 ${
        copiado
          ? 'bg-green-50 border-green-200 text-green-700'
          : 'hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700'
      }`}
      onClick={copiarAlPortapapeles}
      aria-label={copiado ? 'Texto copiado al portapapeles' : 'Copiar CV al portapapeles'}
    >
      <span className="flex items-center">
        {copiado ? (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            ¡Copiado!
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copiar texto
          </>
        )}
      </span>
    </button>
  ), [copiado, copiarAlPortapapeles]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="card-header">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900">Vista Previa del CV</h2>
              <p className="text-gray-600 mt-1">Revisa tu currículum generado por IA antes de descargarlo</p>
            </div>
            <BotonCopiar />
          </div>
        </div>
        
        <div className="card-body">
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8 shadow-soft">
            <pre 
              className="whitespace-pre-wrap text-gray-800 font-sans text-base leading-relaxed font-normal"
              role="document"
              aria-label="Contenido del CV generado"
            >
              {cv}
            </pre>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl" role="complementary">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-blue-800">Sugerencia</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Revisa cuidadosamente el contenido generado y edítalo si es necesario antes de descargarlo como PDF.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default VistaPreviaCVOptimizada;
