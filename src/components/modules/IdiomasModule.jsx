import React, { useState, useCallback } from 'react';

const IdiomasModule = ({ datos, onCambiarDatos, errores, camposTocados, onCampoTocado }) => {
  const [idiomas, setIdiomas] = useState(datos?.idiomas || []);

  const nivelesIdioma = [
    { codigo: 'A1', nombre: 'Básico (A1)', descripcion: 'Principiante' },
    { codigo: 'A2', nombre: 'Básico (A2)', descripcion: 'Elemental' },
    { codigo: 'B1', nombre: 'Intermedio (B1)', descripcion: 'Umbral' },
    { codigo: 'B2', nombre: 'Intermedio (B2)', descripcion: 'Avanzado' },
    { codigo: 'C1', nombre: 'Avanzado (C1)', descripcion: 'Dominio operativo' },
    { codigo: 'C2', nombre: 'Avanzado (C2)', descripcion: 'Maestría' },
    { codigo: 'Nativo', nombre: 'Nativo', descripcion: 'Lengua materna' }
  ];

  const tiposCertificacion = [
    'TOEFL', 'IELTS', 'Cambridge', 'DELE', 'DELF', 'DALF', 'Goethe', 'JLPT', 'HSK', 'Otro'
  ];

  const idiomasComunes = [
    'Español', 'Inglés', 'Francés', 'Alemán', 'Italiano', 'Portugués', 'Chino', 'Japonés', 
    'Coreano', 'Árabe', 'Ruso', 'Holandés', 'Sueco', 'Noruego', 'Danés', 'Finlandés'
  ];

  const agregarIdioma = useCallback(() => {
    const nuevoIdioma = {
      id: Date.now(),
      nombre: '',
      nivel: 'B1',
      certificacion: '',
      tipoCertificacion: '',
      fechaCertificacion: '',
      descripcion: ''
    };
    const nuevosIdiomas = [...idiomas, nuevoIdioma];
    setIdiomas(nuevosIdiomas);
    onCambiarDatos('idiomas', 'lista', nuevosIdiomas);
  }, [idiomas, onCambiarDatos]);

  const eliminarIdioma = useCallback((id) => {
    const nuevosIdiomas = idiomas.filter(idioma => idioma.id !== id);
    setIdiomas(nuevosIdiomas);
    onCambiarDatos('idiomas', 'lista', nuevosIdiomas);
  }, [idiomas, onCambiarDatos]);

  const actualizarIdioma = useCallback((id, campo, valor) => {
    const nuevosIdiomas = idiomas.map(idioma => 
      idioma.id === id ? { ...idioma, [campo]: valor } : idioma
    );
    setIdiomas(nuevosIdiomas);
    onCambiarDatos('idiomas', 'lista', nuevosIdiomas);
  }, [idiomas, onCambiarDatos]);

  const obtenerColorNivel = (nivel) => {
    const colores = {
      'A1': 'bg-red-100 text-red-800 border-red-200',
      'A2': 'bg-orange-100 text-orange-800 border-orange-200',
      'B1': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'B2': 'bg-blue-100 text-blue-800 border-blue-200',
      'C1': 'bg-green-100 text-green-800 border-green-200',
      'C2': 'bg-purple-100 text-purple-800 border-purple-200',
      'Nativo': 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colores[nivel] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const renderBarraNivel = (nivel) => {
    const niveles = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Nativo'];
    const indiceNivel = niveles.indexOf(nivel);
    const porcentaje = nivel === 'Nativo' ? 100 : ((indiceNivel + 1) / 6) * 100;

    return (
      <div className="flex items-center space-x-3">
        <div className="flex-1 bg-slate-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-300"
            style={{ width: `${porcentaje}%` }}
          />
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${obtenerColorNivel(nivel)}`}>
          {nivel}
        </span>
      </div>
    );
  };

  const renderIdioma = (idioma, index) => {
    return (
      <div key={idioma.id} className="relative p-6 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
        {/* Botón eliminar */}
        {idiomas.length > 1 && (
          <button
            onClick={() => eliminarIdioma(idioma.id)}
            className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            title="Eliminar idioma"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}

        {/* Encabezado */}
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-slate-800">
            Idioma {index + 1}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre del idioma */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Idioma *
            </label>
            <select
              value={idioma.nombre}
              onChange={(e) => actualizarIdioma(idioma.id, 'nombre', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 hover:border-slate-400 transition-all"
            >
              <option value="">Seleccionar idioma...</option>
              {idiomasComunes.map(idiomaComun => (
                <option key={idiomaComun} value={idiomaComun}>{idiomaComun}</option>
              ))}
              <option value="otro">Otro (escribir manualmente)</option>
            </select>
            {idioma.nombre === 'otro' && (
              <input
                type="text"
                onChange={(e) => actualizarIdioma(idioma.id, 'nombre', e.target.value)}
                placeholder="Escribir nombre del idioma"
                className="w-full mt-2 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 hover:border-slate-400 transition-all"
              />
            )}
          </div>

          {/* Nivel */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nivel *
            </label>
            <select
              value={idioma.nivel}
              onChange={(e) => actualizarIdioma(idioma.id, 'nivel', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 hover:border-slate-400 transition-all"
            >
              {nivelesIdioma.map(nivel => (
                <option key={nivel.codigo} value={nivel.codigo}>
                  {nivel.nombre} - {nivel.descripcion}
                </option>
              ))}
            </select>
          </div>

          {/* Visualización del nivel */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nivel visual
            </label>
            {renderBarraNivel(idioma.nivel)}
          </div>

          {/* Tipo de certificación */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Tipo de certificación
            </label>
            <select
              value={idioma.tipoCertificacion}
              onChange={(e) => actualizarIdioma(idioma.id, 'tipoCertificacion', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 hover:border-slate-400 transition-all"
            >
              <option value="">Sin certificación</option>
              {tiposCertificacion.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          {/* Certificación específica */}
          {idioma.tipoCertificacion && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Certificación específica
              </label>
              <input
                type="text"
                value={idioma.certificacion}
                onChange={(e) => actualizarIdioma(idioma.id, 'certificacion', e.target.value)}
                placeholder="Ej: TOEFL iBT 95, IELTS 7.5, Cambridge C1"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 hover:border-slate-400 transition-all"
              />
            </div>
          )}

          {/* Fecha de certificación */}
          {idioma.tipoCertificacion && (
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Fecha de certificación
              </label>
              <input
                type="month"
                value={idioma.fechaCertificacion}
                onChange={(e) => actualizarIdioma(idioma.id, 'fechaCertificacion', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 hover:border-slate-400 transition-all"
              />
            </div>
          )}

          {/* Descripción adicional */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Descripción adicional
            </label>
            <textarea
              value={idioma.descripcion}
              onChange={(e) => actualizarIdioma(idioma.id, 'descripcion', e.target.value)}
              placeholder="Ej: Experiencia viviendo en el extranjero, uso profesional, estudios específicos..."
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 hover:border-slate-400 transition-all resize-none"
            />
            <div className="mt-1 text-right">
              <span className="text-xs text-slate-500">
                {idioma.descripcion?.length || 0}/300
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl mr-3 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Idiomas</h3>
              <p className="text-slate-600 text-sm">Nivel y certificaciones</p>
            </div>
          </div>
          
          <button
            onClick={agregarIdioma}
            className="flex items-center px-4 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Agregar
          </button>
        </div>

        {/* Información sobre niveles */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-200">
          <div className="flex items-start">
            <div className="p-1 bg-blue-500 rounded-full mr-3 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h5 className="font-semibold text-blue-800 text-sm mb-1">📚 Marco Común Europeo (MCER)</h5>
              <p className="text-blue-700 text-xs leading-relaxed">
                Los niveles A1-C2 siguen el estándar internacional. <strong>A1-A2:</strong> Básico, <strong>B1-B2:</strong> Intermedio, <strong>C1-C2:</strong> Avanzado.
              </p>
            </div>
          </div>
        </div>

        {/* Lista de idiomas */}
        <div className="space-y-6">
          {idiomas.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
              <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <h4 className="text-lg font-medium text-slate-600 mb-2">No hay idiomas agregados</h4>
              <p className="text-slate-500 mb-4">Agrega los idiomas que dominas para completar tu CV</p>
              <button
                onClick={agregarIdioma}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar primer idioma
              </button>
            </div>
          ) : (
            idiomas.map((idioma, index) => renderIdioma(idioma, index))
          )}
        </div>

        {/* Resumen */}
        {idiomas.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-1 bg-teal-500 rounded-full mr-3">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-teal-800">
                  {idiomas.length} idioma{idiomas.length !== 1 ? 's' : ''} agregado{idiomas.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="text-xs text-teal-600">
                {idiomas.filter(i => i.tipoCertificacion).length > 0 && 
                  `${idiomas.filter(i => i.tipoCertificacion).length} con certificación`
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdiomasModule;
