import React, { useState, useCallback } from 'react';

const ExperienciaModule = ({ datos, onCambiarDatos, errores, camposTocados, onCampoTocado }) => {
  const [experiencias, setExperiencias] = useState(datos?.experiencia || []);

  const agregarExperiencia = useCallback(() => {
    const nuevaExperiencia = {
      id: Date.now(),
      cargo: '',
      empresa: '',
      fechaInicio: '',
      fechaFin: '',
      enCurso: false,
      ubicacion: '',
      tipoEmpleo: '',
      descripcion: '',
      logros: ['', '', '']
    };
    const nuevasExperiencias = [...experiencias, nuevaExperiencia];
    setExperiencias(nuevasExperiencias);
    onCambiarDatos('experiencia', 'lista', nuevasExperiencias);
  }, [experiencias, onCambiarDatos]);

  const eliminarExperiencia = useCallback((id) => {
    const nuevasExperiencias = experiencias.filter(exp => exp.id !== id);
    setExperiencias(nuevasExperiencias);
    onCambiarDatos('experiencia', 'lista', nuevasExperiencias);
  }, [experiencias, onCambiarDatos]);

  const actualizarExperiencia = useCallback((id, campo, valor) => {
    const nuevasExperiencias = experiencias.map(exp => 
      exp.id === id ? { ...exp, [campo]: valor } : exp
    );
    setExperiencias(nuevasExperiencias);
    onCambiarDatos('experiencia', 'lista', nuevasExperiencias);
  }, [experiencias, onCambiarDatos]);

  const actualizarLogro = useCallback((expId, logroIndex, valor) => {
    const nuevasExperiencias = experiencias.map(exp => {
      if (exp.id === expId) {
        const nuevosLogros = [...exp.logros];
        nuevosLogros[logroIndex] = valor;
        return { ...exp, logros: nuevosLogros };
      }
      return exp;
    });
    setExperiencias(nuevasExperiencias);
    onCambiarDatos('experiencia', 'lista', nuevasExperiencias);
  }, [experiencias, onCambiarDatos]);

  const tiposEmpleo = [
    'Tiempo completo',
    'Medio tiempo',
    'Contrato',
    'Freelance',
    'Práctica profesional',
    'Voluntariado',
    'Consultoría'
  ];

  const renderExperiencia = (experiencia, index) => {
    return (
      <div key={experiencia.id} className="relative p-6 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
        {/* Botón eliminar */}
        {experiencias.length > 1 && (
          <button
            onClick={() => eliminarExperiencia(experiencia.id)}
            className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            title="Eliminar experiencia"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}

        {/* Encabezado */}
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-slate-800">
            Experiencia {index + 1}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cargo */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Cargo / Posición *
            </label>
            <input
              type="text"
              value={experiencia.cargo}
              onChange={(e) => actualizarExperiencia(experiencia.id, 'cargo', e.target.value)}
              placeholder="Ej: Desarrollador Full Stack"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-slate-400 transition-all"
            />
          </div>

          {/* Empresa */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Empresa / Organización *
            </label>
            <input
              type="text"
              value={experiencia.empresa}
              onChange={(e) => actualizarExperiencia(experiencia.id, 'empresa', e.target.value)}
              placeholder="Ej: Google Colombia"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-slate-400 transition-all"
            />
          </div>

          {/* Fechas */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Fecha de inicio *
            </label>
            <input
              type="month"
              value={experiencia.fechaInicio}
              onChange={(e) => actualizarExperiencia(experiencia.id, 'fechaInicio', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-slate-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Fecha de finalización
            </label>
            <input
              type="month"
              value={experiencia.fechaFin}
              onChange={(e) => actualizarExperiencia(experiencia.id, 'fechaFin', e.target.value)}
              disabled={experiencia.enCurso}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-slate-400 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
            <div className="mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={experiencia.enCurso}
                  onChange={(e) => {
                    actualizarExperiencia(experiencia.id, 'enCurso', e.target.checked);
                    if (e.target.checked) {
                      actualizarExperiencia(experiencia.id, 'fechaFin', '');
                    }
                  }}
                  className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-slate-600">Trabajo actual</span>
              </label>
            </div>
          </div>

          {/* Tipo de empleo */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Tipo de empleo
            </label>
            <select
              value={experiencia.tipoEmpleo}
              onChange={(e) => actualizarExperiencia(experiencia.id, 'tipoEmpleo', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-slate-400 transition-all"
            >
              <option value="">Seleccionar tipo...</option>
              {tiposEmpleo.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ubicación
            </label>
            <input
              type="text"
              value={experiencia.ubicacion}
              onChange={(e) => actualizarExperiencia(experiencia.id, 'ubicacion', e.target.value)}
              placeholder="Ej: Bogotá, Colombia / Remoto"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-slate-400 transition-all"
            />
          </div>

          {/* Descripción */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Descripción del puesto
            </label>
            <textarea
              value={experiencia.descripcion}
              onChange={(e) => actualizarExperiencia(experiencia.id, 'descripcion', e.target.value)}
              placeholder="Describe tus responsabilidades principales y el contexto del puesto..."
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-slate-400 transition-all resize-none"
            />
            <div className="mt-1 text-right">
              <span className="text-xs text-slate-500">
                {experiencia.descripcion?.length || 0}/400
              </span>
            </div>
          </div>

          {/* Logros */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Logros principales (máximo 3)
            </label>
            <div className="space-y-3">
              {experiencia.logros.map((logro, logroIndex) => (
                <div key={logroIndex} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-purple-600">{logroIndex + 1}</span>
                  </div>
                  <input
                    type="text"
                    value={logro}
                    onChange={(e) => actualizarLogro(experiencia.id, logroIndex, e.target.value)}
                    placeholder={`Logro ${logroIndex + 1}: Ej: Aumenté las ventas en un 25%`}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-slate-400 transition-all text-sm"
                  />
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              💡 Tip: Usa números y métricas específicas para destacar tus logros
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl mr-3 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Experiencia Laboral</h3>
              <p className="text-slate-600 text-sm">Cargo, empresa y logros profesionales</p>
            </div>
          </div>
          
          <button
            onClick={agregarExperiencia}
            className="flex items-center px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Agregar
          </button>
        </div>

        {/* Lista de experiencias */}
        <div className="space-y-6">
          {experiencias.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
              <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
              <h4 className="text-lg font-medium text-slate-600 mb-2">No hay experiencia agregada</h4>
              <p className="text-slate-500 mb-4">Agrega tu experiencia laboral para completar tu CV</p>
              <button
                onClick={agregarExperiencia}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar primera experiencia
              </button>
            </div>
          ) : (
            experiencias.map((experiencia, index) => renderExperiencia(experiencia, index))
          )}
        </div>

        {/* Resumen */}
        {experiencias.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
            <div className="flex items-center">
              <div className="p-1 bg-purple-500 rounded-full mr-3">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-purple-800">
                {experiencias.length} experiencia{experiencias.length !== 1 ? 's' : ''} laboral{experiencias.length !== 1 ? 'es' : ''} agregada{experiencias.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienciaModule;
