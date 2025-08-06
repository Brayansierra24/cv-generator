import React, { useState, useCallback } from 'react';

const ProyectosModule = ({ datos, onCambiarDatos, errores, camposTocados, onCampoTocado }) => {
  const [proyectos, setProyectos] = useState(datos?.proyectos || []);

  const tiposProyecto = [
    'Aplicación Web', 'Aplicación Móvil', 'API/Backend', 'Frontend', 'Full Stack',
    'Machine Learning', 'Data Science', 'DevOps', 'Blockchain', 'IoT',
    'Juego', 'E-commerce', 'CMS', 'Dashboard', 'Microservicios', 'Otro'
  ];

  const tecnologiasComunes = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Django', 'Flask',
    'Laravel', 'Spring Boot', 'ASP.NET', 'Python', 'JavaScript', 'TypeScript',
    'Java', 'C#', 'PHP', 'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter', 'React Native',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP'
  ];

  const agregarProyecto = useCallback(() => {
    const nuevoProyecto = {
      id: Date.now(),
      nombre: '',
      tipo: '',
      descripcion: '',
      tecnologias: [],
      fechaInicio: '',
      fechaFin: '',
      enCurso: false,
      urlDemo: '',
      urlRepositorio: '',
      urlPortafolio: '',
      logros: ['', '', ''],
      colaboradores: '',
      rol: ''
    };
    const nuevosProyectos = [...proyectos, nuevoProyecto];
    setProyectos(nuevosProyectos);
    onCambiarDatos('proyectos', 'lista', nuevosProyectos);
  }, [proyectos, onCambiarDatos]);

  const eliminarProyecto = useCallback((id) => {
    const nuevosProyectos = proyectos.filter(proyecto => proyecto.id !== id);
    setProyectos(nuevosProyectos);
    onCambiarDatos('proyectos', 'lista', nuevosProyectos);
  }, [proyectos, onCambiarDatos]);

  const actualizarProyecto = useCallback((id, campo, valor) => {
    const nuevosProyectos = proyectos.map(proyecto => 
      proyecto.id === id ? { ...proyecto, [campo]: valor } : proyecto
    );
    setProyectos(nuevosProyectos);
    onCambiarDatos('proyectos', 'lista', nuevosProyectos);
  }, [proyectos, onCambiarDatos]);

  const actualizarLogro = useCallback((proyectoId, logroIndex, valor) => {
    const nuevosProyectos = proyectos.map(proyecto => {
      if (proyecto.id === proyectoId) {
        const nuevosLogros = [...proyecto.logros];
        nuevosLogros[logroIndex] = valor;
        return { ...proyecto, logros: nuevosLogros };
      }
      return proyecto;
    });
    setProyectos(nuevosProyectos);
    onCambiarDatos('proyectos', 'lista', nuevosProyectos);
  }, [proyectos, onCambiarDatos]);

  const agregarTecnologia = useCallback((proyectoId, tecnologia) => {
    const nuevosProyectos = proyectos.map(proyecto => {
      if (proyecto.id === proyectoId && !proyecto.tecnologias.includes(tecnologia)) {
        return { ...proyecto, tecnologias: [...proyecto.tecnologias, tecnologia] };
      }
      return proyecto;
    });
    setProyectos(nuevosProyectos);
    onCambiarDatos('proyectos', 'lista', nuevosProyectos);
  }, [proyectos, onCambiarDatos]);

  const eliminarTecnologia = useCallback((proyectoId, tecnologia) => {
    const nuevosProyectos = proyectos.map(proyecto => {
      if (proyecto.id === proyectoId) {
        return { ...proyecto, tecnologias: proyecto.tecnologias.filter(t => t !== tecnologia) };
      }
      return proyecto;
    });
    setProyectos(nuevosProyectos);
    onCambiarDatos('proyectos', 'lista', nuevosProyectos);
  }, [proyectos, onCambiarDatos]);

  const validarURL = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const renderProyecto = (proyecto, index) => {
    return (
      <div key={proyecto.id} className="relative p-6 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
        {/* Botón eliminar */}
        {proyectos.length > 1 && (
          <button
            onClick={() => eliminarProyecto(proyecto.id)}
            className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            title="Eliminar proyecto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}

        {/* Encabezado */}
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-slate-800">
            Proyecto {index + 1}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre del proyecto */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nombre del proyecto *
            </label>
            <input
              type="text"
              value={proyecto.nombre}
              onChange={(e) => actualizarProyecto(proyecto.id, 'nombre', e.target.value)}
              placeholder="Ej: Sistema de Gestión de Inventarios"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 hover:border-slate-400 transition-all"
            />
          </div>

          {/* Tipo de proyecto */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Tipo de proyecto
            </label>
            <select
              value={proyecto.tipo}
              onChange={(e) => actualizarProyecto(proyecto.id, 'tipo', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 hover:border-slate-400 transition-all"
            >
              <option value="">Seleccionar tipo...</option>
              {tiposProyecto.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          {/* Fechas */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Fecha de inicio
            </label>
            <input
              type="month"
              value={proyecto.fechaInicio}
              onChange={(e) => actualizarProyecto(proyecto.id, 'fechaInicio', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 hover:border-slate-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Fecha de finalización
            </label>
            <input
              type="month"
              value={proyecto.fechaFin}
              onChange={(e) => actualizarProyecto(proyecto.id, 'fechaFin', e.target.value)}
              disabled={proyecto.enCurso}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 hover:border-slate-400 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
            <div className="mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={proyecto.enCurso}
                  onChange={(e) => {
                    actualizarProyecto(proyecto.id, 'enCurso', e.target.checked);
                    if (e.target.checked) {
                      actualizarProyecto(proyecto.id, 'fechaFin', '');
                    }
                  }}
                  className="w-4 h-4 text-rose-600 border-slate-300 rounded focus:ring-rose-500"
                />
                <span className="ml-2 text-sm text-slate-600">En desarrollo</span>
              </label>
            </div>
          </div>

          {/* Rol en el proyecto */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Tu rol en el proyecto
            </label>
            <input
              type="text"
              value={proyecto.rol}
              onChange={(e) => actualizarProyecto(proyecto.id, 'rol', e.target.value)}
              placeholder="Ej: Desarrollador Full Stack, Líder técnico"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 hover:border-slate-400 transition-all"
            />
          </div>

          {/* Colaboradores */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Colaboradores
            </label>
            <input
              type="text"
              value={proyecto.colaboradores}
              onChange={(e) => actualizarProyecto(proyecto.id, 'colaboradores', e.target.value)}
              placeholder="Ej: Equipo de 3 desarrolladores, Solo"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 hover:border-slate-400 transition-all"
            />
          </div>

          {/* Descripción */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Descripción del proyecto *
            </label>
            <textarea
              value={proyecto.descripcion}
              onChange={(e) => actualizarProyecto(proyecto.id, 'descripcion', e.target.value)}
              placeholder="Describe el proyecto, su propósito, funcionalidades principales y tu contribución..."
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 hover:border-slate-400 transition-all resize-none"
            />
            <div className="mt-1 text-right">
              <span className="text-xs text-slate-500">
                {proyecto.descripcion?.length || 0}/500
              </span>
            </div>
          </div>

          {/* Tecnologías */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Tecnologías utilizadas
            </label>
            
            {/* Tecnologías seleccionadas */}
            <div className="flex flex-wrap gap-2 mb-3">
              {proyecto.tecnologias.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-rose-100 text-rose-800 text-sm font-medium rounded-full"
                >
                  {tech}
                  <button
                    onClick={() => eliminarTecnologia(proyecto.id, tech)}
                    className="ml-2 text-rose-600 hover:text-rose-800"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>

            {/* Selector de tecnologías */}
            <select
              onChange={(e) => {
                if (e.target.value) {
                  agregarTecnologia(proyecto.id, e.target.value);
                  e.target.value = '';
                }
              }}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 hover:border-slate-400 transition-all"
            >
              <option value="">Agregar tecnología...</option>
              {tecnologiasComunes
                .filter(tech => !proyecto.tecnologias.includes(tech))
                .map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))
              }
            </select>
          </div>

          {/* URLs */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              URL Demo / Sitio web
            </label>
            <input
              type="url"
              value={proyecto.urlDemo}
              onChange={(e) => actualizarProyecto(proyecto.id, 'urlDemo', e.target.value)}
              placeholder="https://mi-proyecto.com"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 hover:border-slate-400 transition-all ${
                proyecto.urlDemo && !validarURL(proyecto.urlDemo)
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-rose-500'
              }`}
            />
            {proyecto.urlDemo && !validarURL(proyecto.urlDemo) && (
              <p className="mt-1 text-xs text-red-600">URL no válida</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              URL Repositorio (GitHub)
            </label>
            <input
              type="url"
              value={proyecto.urlRepositorio}
              onChange={(e) => actualizarProyecto(proyecto.id, 'urlRepositorio', e.target.value)}
              placeholder="https://github.com/usuario/proyecto"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 hover:border-slate-400 transition-all ${
                proyecto.urlRepositorio && !validarURL(proyecto.urlRepositorio)
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-rose-500'
              }`}
            />
            {proyecto.urlRepositorio && !validarURL(proyecto.urlRepositorio) && (
              <p className="mt-1 text-xs text-red-600">URL no válida</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              URL Portafolio / Caso de estudio
            </label>
            <input
              type="url"
              value={proyecto.urlPortafolio}
              onChange={(e) => actualizarProyecto(proyecto.id, 'urlPortafolio', e.target.value)}
              placeholder="https://mi-portafolio.com/proyecto"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 hover:border-slate-400 transition-all ${
                proyecto.urlPortafolio && !validarURL(proyecto.urlPortafolio)
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-slate-300 focus:ring-rose-500'
              }`}
            />
            {proyecto.urlPortafolio && !validarURL(proyecto.urlPortafolio) && (
              <p className="mt-1 text-xs text-red-600">URL no válida</p>
            )}
          </div>

          {/* Logros/Resultados */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Logros y resultados (máximo 3)
            </label>
            <div className="space-y-3">
              {proyecto.logros.map((logro, logroIndex) => (
                <div key={logroIndex} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-rose-600">{logroIndex + 1}</span>
                  </div>
                  <input
                    type="text"
                    value={logro}
                    onChange={(e) => actualizarLogro(proyecto.id, logroIndex, e.target.value)}
                    placeholder={`Resultado ${logroIndex + 1}: Ej: Redujo tiempo de procesamiento en 40%`}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 hover:border-slate-400 transition-all text-sm"
                  />
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              💡 Tip: Incluye métricas específicas, impacto del proyecto y feedback recibido
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl mr-3 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Proyectos</h3>
              <p className="text-slate-600 text-sm">Links a GitHub, portafolio y resultados</p>
            </div>
          </div>
          
          <button
            onClick={agregarProyecto}
            className="flex items-center px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Agregar
          </button>
        </div>

        {/* Lista de proyectos */}
        <div className="space-y-6">
          {proyectos.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
              <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h4 className="text-lg font-medium text-slate-600 mb-2">No hay proyectos agregados</h4>
              <p className="text-slate-500 mb-4">Agrega tus proyectos más relevantes para completar tu CV</p>
              <button
                onClick={agregarProyecto}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar primer proyecto
              </button>
            </div>
          ) : (
            proyectos.map((proyecto, index) => renderProyecto(proyecto, index))
          )}
        </div>

        {/* Resumen */}
        {proyectos.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-1 bg-rose-500 rounded-full mr-3">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-rose-800">
                  {proyectos.length} proyecto{proyectos.length !== 1 ? 's' : ''} agregado{proyectos.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="text-xs text-rose-600">
                {proyectos.filter(p => p.urlDemo || p.urlRepositorio).length > 0 && 
                  `${proyectos.filter(p => p.urlDemo || p.urlRepositorio).length} con enlaces`
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProyectosModule;
