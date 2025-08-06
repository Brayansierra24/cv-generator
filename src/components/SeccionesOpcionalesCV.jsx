import React, { useState } from 'react';

const SeccionesOpcionalesCV = ({ seccionesActivas, onToggleSeccion, datosOpcionales, onCambiarDatos }) => {
  const [seccionExpandida, setSeccionExpandida] = useState(null);

  const secciones = [
    {
      id: 'redes_sociales',
      nombre: 'Redes Sociales',
      descripcion: 'LinkedIn, GitHub, portafolio web, etc.',
      icono: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500',
      campos: [
        { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/tu-perfil' },
        { key: 'github', label: 'GitHub', placeholder: 'https://github.com/tu-usuario' },
        { key: 'portafolio', label: 'Portafolio Web', placeholder: 'https://tu-portafolio.com' },
        { key: 'twitter', label: 'Twitter/X', placeholder: 'https://twitter.com/tu-usuario' }
      ]
    },
    {
      id: 'habilidades_tecnicas',
      nombre: 'Habilidades Técnicas',
      descripcion: 'Lenguajes, frameworks, herramientas específicas',
      icono: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      color: 'from-green-500 to-emerald-500',
      campos: [
        { key: 'lenguajes', label: 'Lenguajes de Programación', placeholder: 'JavaScript, Python, Java, C++...' },
        { key: 'frameworks', label: 'Frameworks', placeholder: 'React, Vue, Angular, Laravel...' },
        { key: 'herramientas', label: 'Herramientas', placeholder: 'Git, Docker, AWS, Figma...' },
        { key: 'bases_datos', label: 'Bases de Datos', placeholder: 'MySQL, PostgreSQL, MongoDB...' }
      ]
    },
    {
      id: 'proyectos',
      nombre: 'Proyectos Destacados',
      descripcion: 'Proyectos personales o profesionales relevantes',
      icono: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'from-purple-500 to-pink-500',
      campos: [
        { key: 'proyecto1', label: 'Proyecto 1', placeholder: 'Nombre del proyecto y breve descripción', type: 'textarea' },
        { key: 'proyecto2', label: 'Proyecto 2', placeholder: 'Nombre del proyecto y breve descripción', type: 'textarea' },
        { key: 'proyecto3', label: 'Proyecto 3', placeholder: 'Nombre del proyecto y breve descripción', type: 'textarea' }
      ]
    },
    {
      id: 'idiomas',
      nombre: 'Idiomas',
      descripcion: 'Idiomas que dominas y nivel de competencia',
      icono: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      color: 'from-orange-500 to-red-500',
      campos: [
        { key: 'idioma1', label: 'Idioma 1', placeholder: 'Español - Nativo' },
        { key: 'idioma2', label: 'Idioma 2', placeholder: 'Inglés - Avanzado (C1)' },
        { key: 'idioma3', label: 'Idioma 3', placeholder: 'Francés - Intermedio (B2)' }
      ]
    },
    {
      id: 'certificaciones',
      nombre: 'Certificaciones',
      descripcion: 'Certificaciones profesionales y cursos relevantes',
      icono: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: 'from-indigo-500 to-purple-500',
      campos: [
        { key: 'cert1', label: 'Certificación 1', placeholder: 'AWS Certified Solutions Architect' },
        { key: 'cert2', label: 'Certificación 2', placeholder: 'Google Analytics Certified' },
        { key: 'cert3', label: 'Certificación 3', placeholder: 'Scrum Master Certified' }
      ]
    }
  ];

  const handleToggleSeccion = (seccionId) => {
    onToggleSeccion(seccionId);
    if (seccionExpandida === seccionId) {
      setSeccionExpandida(null);
    } else {
      setSeccionExpandida(seccionId);
    }
  };

  const handleCambiarDato = (seccionId, campo, valor) => {
    onCambiarDatos(seccionId, campo, valor);
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl mr-3 shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">Secciones Opcionales</h3>
            <p className="text-slate-600 text-sm">Personaliza tu CV agregando secciones adicionales relevantes</p>
          </div>
        </div>

        <div className="space-y-4">
          {secciones.map((seccion) => (
            <div key={seccion.id} className="border border-slate-200 rounded-xl overflow-hidden">
              {/* Header de la sección */}
              <div
                className={`p-4 cursor-pointer transition-all duration-300 ${
                  seccionesActivas.includes(seccion.id)
                    ? `bg-gradient-to-r ${seccion.color} text-white`
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}
                onClick={() => handleToggleSeccion(seccion.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${
                      seccionesActivas.includes(seccion.id)
                        ? 'bg-white/20'
                        : 'bg-white'
                    }`}>
                      <div className={seccionesActivas.includes(seccion.id) ? 'text-white' : 'text-slate-600'}>
                        {seccion.icono}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold">{seccion.nombre}</h4>
                      <p className={`text-sm ${
                        seccionesActivas.includes(seccion.id) ? 'text-white/80' : 'text-slate-600'
                      }`}>
                        {seccion.descripcion}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Toggle switch */}
                    <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      seccionesActivas.includes(seccion.id) ? 'bg-white/30' : 'bg-slate-300'
                    }`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        seccionesActivas.includes(seccion.id) ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </div>
                    
                    {/* Expand icon */}
                    {seccionesActivas.includes(seccion.id) && (
                      <svg
                        className={`w-5 h-5 transition-transform duration-300 ${
                          seccionExpandida === seccion.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Contenido expandible */}
              {seccionesActivas.includes(seccion.id) && seccionExpandida === seccion.id && (
                <div className="p-6 bg-white border-t border-slate-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {seccion.campos.map((campo) => (
                      <div key={campo.key} className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          {campo.label}
                        </label>
                        {campo.type === 'textarea' ? (
                          <textarea
                            value={datosOpcionales[seccion.id]?.[campo.key] || ''}
                            onChange={(e) => handleCambiarDato(seccion.id, campo.key, e.target.value)}
                            placeholder={campo.placeholder}
                            rows={3}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                          />
                        ) : (
                          <input
                            type="text"
                            value={datosOpcionales[seccion.id]?.[campo.key] || ''}
                            onChange={(e) => handleCambiarDato(seccion.id, campo.key, e.target.value)}
                            placeholder={campo.placeholder}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Resumen de secciones activas */}
        {seccionesActivas.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-start">
              <div className="p-1 bg-green-500 rounded-full mr-3 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h5 className="font-semibold text-green-800 text-sm mb-1">
                  ✨ Secciones Activas ({seccionesActivas.length})
                </h5>
                <p className="text-green-700 text-xs leading-relaxed">
                  {secciones
                    .filter(s => seccionesActivas.includes(s.id))
                    .map(s => s.nombre)
                    .join(', ')}
                  {seccionesActivas.length > 0 && ' se incluirán en tu CV generado.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeccionesOpcionalesCV;
