import React, { useState } from 'react';

const SelectorPlantillaCV = ({ plantillaSeleccionada, onSeleccionarPlantilla }) => {
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const plantillas = [
    {
      id: 'moderna',
      nombre: 'Moderna',
      descripcion: 'Diseño limpio y profesional con colores vibrantes',
      colores: ['#4338CA', '#06B6D4', '#10B981'],
      preview: 'Gradientes • Iconos • Layout moderno',
      icono: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      )
    },
    {
      id: 'clasica',
      nombre: 'Clásica',
      descripcion: 'Estilo tradicional y elegante, perfecto para sectores conservadores',
      colores: ['#1F2937', '#374151', '#6B7280'],
      preview: 'Líneas • Serif • Layout tradicional',
      icono: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'creativa',
      nombre: 'Creativa',
      descripcion: 'Diseño innovador y llamativo para profesionales creativos',
      colores: ['#7C3AED', '#EC4899', '#F59E0B'],
      preview: 'Formas • Colores • Layout asimétrico',
      icono: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      )
    }
  ];

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mr-3 shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Selecciona tu Plantilla</h3>
            <p className="text-slate-600 text-sm">Elige el diseño que mejor represente tu perfil profesional</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plantillas.map((plantilla) => (
            <div
              key={plantilla.id}
              className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                plantillaSeleccionada === plantilla.id
                  ? 'ring-4 ring-purple-500/50 shadow-2xl'
                  : 'hover:shadow-xl'
              }`}
              onClick={() => onSeleccionarPlantilla(plantilla.id)}
              onMouseEnter={() => setHoveredTemplate(plantilla.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
            >
              <div className={`relative bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 border-2 transition-all duration-300 ${
                plantillaSeleccionada === plantilla.id
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}>
                {/* Indicador de selección */}
                {plantillaSeleccionada === plantilla.id && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Icono y nombre */}
                <div className="flex items-center mb-3">
                  <div className={`p-2 rounded-lg mr-3 transition-colors ${
                    plantillaSeleccionada === plantilla.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {plantilla.icono}
                  </div>
                  <h4 className="font-bold text-slate-800">{plantilla.nombre}</h4>
                </div>

                {/* Descripción */}
                <p className="text-sm text-slate-600 mb-4">{plantilla.descripcion}</p>

                {/* Preview de colores */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-1">
                    {plantilla.colores.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{plantilla.preview}</span>
                </div>

                {/* Botón de vista previa */}
                <div className={`text-center transition-all duration-300 ${
                  hoveredTemplate === plantilla.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <span className="text-xs text-purple-600 font-semibold">
                    {plantillaSeleccionada === plantilla.id ? '✓ Seleccionada' : 'Clic para seleccionar'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-start">
            <div className="p-1 bg-blue-500 rounded-full mr-3 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h5 className="font-semibold text-blue-800 text-sm mb-1">💡 Consejo Profesional</h5>
              <p className="text-blue-700 text-xs leading-relaxed">
                La plantilla <strong>Moderna</strong> es ideal para tech y startups, la <strong>Clásica</strong> para sectores tradicionales como banca o derecho, y la <strong>Creativa</strong> para diseño, marketing y roles creativos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectorPlantillaCV;
