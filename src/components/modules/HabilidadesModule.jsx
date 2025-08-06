import React, { useState, useCallback } from 'react';

const HabilidadesModule = ({ datos, onCambiarDatos, errores, camposTocados, onCampoTocado }) => {
  const [tipoVisualizacion, setTipoVisualizacion] = useState('barras'); // 'barras', 'estrellas', 'texto'
  const [categoriaActiva, setCategoriaActiva] = useState('tecnicas');

  const categorias = {
    tecnicas: {
      nombre: 'Habilidades Técnicas',
      icono: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500'
    },
    blandas: {
      nombre: 'Habilidades Blandas',
      icono: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      color: 'from-green-500 to-emerald-500'
    },
    herramientas: {
      nombre: 'Herramientas',
      icono: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: 'from-purple-500 to-pink-500'
    }
  };

  const nivelesHabilidad = [
    { valor: 1, etiqueta: 'Básico', color: 'bg-red-400' },
    { valor: 2, etiqueta: 'Intermedio', color: 'bg-yellow-400' },
    { valor: 3, etiqueta: 'Avanzado', color: 'bg-blue-400' },
    { valor: 4, etiqueta: 'Experto', color: 'bg-green-400' },
    { valor: 5, etiqueta: 'Maestro', color: 'bg-purple-400' }
  ];

  const habilidades = datos?.habilidades || {
    tecnicas: [],
    blandas: [],
    herramientas: []
  };

  const agregarHabilidad = useCallback((categoria) => {
    const nuevaHabilidad = {
      id: Date.now(),
      nombre: '',
      nivel: 3,
      descripcion: ''
    };
    
    const nuevasHabilidades = {
      ...habilidades,
      [categoria]: [...(habilidades[categoria] || []), nuevaHabilidad]
    };
    
    onCambiarDatos('habilidades', 'todas', nuevasHabilidades);
  }, [habilidades, onCambiarDatos]);

  const eliminarHabilidad = useCallback((categoria, id) => {
    const nuevasHabilidades = {
      ...habilidades,
      [categoria]: habilidades[categoria].filter(hab => hab.id !== id)
    };
    
    onCambiarDatos('habilidades', 'todas', nuevasHabilidades);
  }, [habilidades, onCambiarDatos]);

  const actualizarHabilidad = useCallback((categoria, id, campo, valor) => {
    const nuevasHabilidades = {
      ...habilidades,
      [categoria]: habilidades[categoria].map(hab => 
        hab.id === id ? { ...hab, [campo]: valor } : hab
      )
    };
    
    onCambiarDatos('habilidades', 'todas', nuevasHabilidades);
  }, [habilidades, onCambiarDatos]);

  const renderBarraNivel = (nivel) => {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-slate-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${nivelesHabilidad[nivel - 1]?.color}`}
            style={{ width: `${(nivel / 5) * 100}%` }}
          />
        </div>
        <span className="text-xs font-medium text-slate-600 min-w-[60px]">
          {nivelesHabilidad[nivel - 1]?.etiqueta}
        </span>
      </div>
    );
  };

  const renderEstrellas = (nivel) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((estrella) => (
          <svg
            key={estrella}
            className={`w-4 h-4 ${
              estrella <= nivel ? 'text-yellow-400 fill-current' : 'text-slate-300'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        ))}
        <span className="text-xs font-medium text-slate-600 ml-2">
          {nivelesHabilidad[nivel - 1]?.etiqueta}
        </span>
      </div>
    );
  };

  const renderHabilidad = (habilidad, categoria) => {
    return (
      <div key={habilidad.id} className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 mr-3">
            <input
              type="text"
              value={habilidad.nombre}
              onChange={(e) => actualizarHabilidad(categoria, habilidad.id, 'nombre', e.target.value)}
              placeholder="Nombre de la habilidad"
              className="w-full font-medium text-slate-800 bg-transparent border-none outline-none focus:bg-slate-50 rounded px-2 py-1 transition-colors"
            />
          </div>
          <button
            onClick={() => eliminarHabilidad(categoria, habilidad.id)}
            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
            title="Eliminar habilidad"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Control de nivel */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-600">Nivel</label>
            <select
              value={habilidad.nivel}
              onChange={(e) => actualizarHabilidad(categoria, habilidad.id, 'nivel', parseInt(e.target.value))}
              className="text-xs border border-slate-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {nivelesHabilidad.map((nivel, index) => (
                <option key={index} value={nivel.valor}>{nivel.etiqueta}</option>
              ))}
            </select>
          </div>
          
          {/* Visualización del nivel */}
          {tipoVisualizacion === 'barras' && renderBarraNivel(habilidad.nivel)}
          {tipoVisualizacion === 'estrellas' && renderEstrellas(habilidad.nivel)}
          {tipoVisualizacion === 'texto' && (
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full text-white ${nivelesHabilidad[habilidad.nivel - 1]?.color}`}>
              {nivelesHabilidad[habilidad.nivel - 1]?.etiqueta}
            </span>
          )}
        </div>

        {/* Descripción opcional */}
        <textarea
          value={habilidad.descripcion}
          onChange={(e) => actualizarHabilidad(categoria, habilidad.id, 'descripcion', e.target.value)}
          placeholder="Descripción opcional (ej: 3 años de experiencia, certificado...)"
          rows={2}
          className="w-full text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
    );
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl mr-3 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Habilidades</h3>
              <p className="text-slate-600 text-sm">Técnicas y blandas con nivel gráfico</p>
            </div>
          </div>
          
          {/* Selector de visualización */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-600">Vista:</span>
            <select
              value={tipoVisualizacion}
              onChange={(e) => setTipoVisualizacion(e.target.value)}
              className="text-sm border border-slate-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="barras">Barras</option>
              <option value="estrellas">Estrellas</option>
              <option value="texto">Texto</option>
            </select>
          </div>
        </div>

        {/* Tabs de categorías */}
        <div className="flex space-x-1 mb-6 bg-slate-100 rounded-lg p-1">
          {Object.entries(categorias).map(([key, categoria]) => (
            <button
              key={key}
              onClick={() => setCategoriaActiva(key)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                categoriaActiva === key
                  ? `bg-gradient-to-r ${categoria.color} text-white shadow-sm`
                  : 'text-slate-600 hover:text-slate-800 hover:bg-white'
              }`}
            >
              {categoria.icono}
              <span>{categoria.nombre}</span>
            </button>
          ))}
        </div>

        {/* Contenido de la categoría activa */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-slate-800">
              {categorias[categoriaActiva].nombre}
            </h4>
            <button
              onClick={() => agregarHabilidad(categoriaActiva)}
              className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r ${categorias[categoriaActiva].color} hover:shadow-md transition-all duration-200`}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Agregar
            </button>
          </div>

          {/* Lista de habilidades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habilidades[categoriaActiva]?.length === 0 ? (
              <div className="md:col-span-2 text-center py-8 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${categorias[categoriaActiva].color} flex items-center justify-center`}>
                  {categorias[categoriaActiva].icono}
                </div>
                <h4 className="text-lg font-medium text-slate-600 mb-2">
                  No hay {categorias[categoriaActiva].nombre.toLowerCase()}
                </h4>
                <p className="text-slate-500 mb-4">
                  Agrega tus habilidades para completar esta sección
                </p>
                <button
                  onClick={() => agregarHabilidad(categoriaActiva)}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r ${categorias[categoriaActiva].color} hover:shadow-md transition-all duration-200`}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Agregar primera habilidad
                </button>
              </div>
            ) : (
              habilidades[categoriaActiva]?.map((habilidad) => renderHabilidad(habilidad, categoriaActiva))
            )}
          </div>
        </div>

        {/* Resumen general */}
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-1 bg-amber-500 rounded-full mr-3">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-amber-800">
                Total de habilidades: {Object.values(habilidades).reduce((total, categoria) => total + categoria.length, 0)}
              </span>
            </div>
            <div className="text-xs text-amber-600">
              {Object.entries(habilidades).map(([key, categoria]) => 
                categoria.length > 0 ? `${categorias[key].nombre}: ${categoria.length}` : null
              ).filter(Boolean).join(' • ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabilidadesModule;
