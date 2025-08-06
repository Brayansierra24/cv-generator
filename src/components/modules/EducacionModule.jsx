import React, { useState, useCallback } from 'react';

const EducacionModule = ({ datos, onCambiarDatos, errores, camposTocados, onCampoTocado }) => {
  const [educaciones, setEducaciones] = useState(datos?.educacion || []);

  const agregarEducacion = useCallback(() => {
    const nuevaEducacion = {
      id: Date.now(),
      titulo: '',
      institucion: '',
      fechaInicio: '',
      fechaFin: '',
      enCurso: false,
      descripcion: '',
      gpa: '',
      ubicacion: ''
    };
    const nuevasEducaciones = [...educaciones, nuevaEducacion];
    setEducaciones(nuevasEducaciones);
    onCambiarDatos('educacion', 'lista', nuevasEducaciones);
  }, [educaciones, onCambiarDatos]);

  const eliminarEducacion = useCallback((id) => {
    const nuevasEducaciones = educaciones.filter(edu => edu.id !== id);
    setEducaciones(nuevasEducaciones);
    onCambiarDatos('educacion', 'lista', nuevasEducaciones);
  }, [educaciones, onCambiarDatos]);

  const actualizarEducacion = useCallback((id, campo, valor) => {
    const nuevasEducaciones = educaciones.map(edu => 
      edu.id === id ? { ...edu, [campo]: valor } : edu
    );
    setEducaciones(nuevasEducaciones);
    onCambiarDatos('educacion', 'lista', nuevasEducaciones);
  }, [educaciones, onCambiarDatos]);

  const nivelesEducacion = [
    'Educación Secundaria',
    'Técnico',
    'Tecnólogo',
    'Pregrado',
    'Especialización',
    'Maestría',
    'Doctorado',
    'Postdoctorado',
    'Certificación',
    'Curso'
  ];

  const renderEducacion = (educacion, index) => {
    return (
      <div key={educacion.id} className="relative p-6 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
        {/* Botón eliminar */}
        {educaciones.length > 1 && (
          <button
            onClick={() => eliminarEducacion(educacion.id)}
            className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            title="Eliminar educación"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}

        {/* Encabezado */}
        <div className="flex items-center mb-4">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg mr-3">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-slate-800">
            Educación {index + 1}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Título/Grado */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Título o Grado *
            </label>
            <select
              value={educacion.titulo}
              onChange={(e) => actualizarEducacion(educacion.id, 'titulo', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-slate-400 transition-all"
            >
              <option value="">Seleccionar nivel educativo...</option>
              {nivelesEducacion.map(nivel => (
                <option key={nivel} value={nivel}>{nivel}</option>
              ))}
            </select>
          </div>

          {/* Institución */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Institución *
            </label>
            <input
              type="text"
              value={educacion.institucion}
              onChange={(e) => actualizarEducacion(educacion.id, 'institucion', e.target.value)}
              placeholder="Ej: Universidad Nacional de Colombia"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-slate-400 transition-all"
            />
          </div>

          {/* Fechas */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Fecha de inicio *
            </label>
            <input
              type="month"
              value={educacion.fechaInicio}
              onChange={(e) => actualizarEducacion(educacion.id, 'fechaInicio', e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-slate-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Fecha de finalización
            </label>
            <input
              type="month"
              value={educacion.fechaFin}
              onChange={(e) => actualizarEducacion(educacion.id, 'fechaFin', e.target.value)}
              disabled={educacion.enCurso}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-slate-400 transition-all disabled:bg-slate-100 disabled:cursor-not-allowed"
            />
            <div className="mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={educacion.enCurso}
                  onChange={(e) => {
                    actualizarEducacion(educacion.id, 'enCurso', e.target.checked);
                    if (e.target.checked) {
                      actualizarEducacion(educacion.id, 'fechaFin', '');
                    }
                  }}
                  className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                />
                <span className="ml-2 text-sm text-slate-600">En curso</span>
              </label>
            </div>
          </div>

          {/* GPA/Promedio */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              GPA / Promedio
            </label>
            <input
              type="text"
              value={educacion.gpa}
              onChange={(e) => actualizarEducacion(educacion.id, 'gpa', e.target.value)}
              placeholder="Ej: 4.5/5.0 o 85/100"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-slate-400 transition-all"
            />
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ubicación
            </label>
            <input
              type="text"
              value={educacion.ubicacion}
              onChange={(e) => actualizarEducacion(educacion.id, 'ubicacion', e.target.value)}
              placeholder="Ej: Bogotá, Colombia"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-slate-400 transition-all"
            />
          </div>

          {/* Descripción */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Descripción / Logros
            </label>
            <textarea
              value={educacion.descripcion}
              onChange={(e) => actualizarEducacion(educacion.id, 'descripcion', e.target.value)}
              placeholder="Ej: Tesis sobre inteligencia artificial, proyectos destacados, reconocimientos..."
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:border-slate-400 transition-all resize-none"
            />
            <div className="mt-1 text-right">
              <span className="text-xs text-slate-500">
                {educacion.descripcion?.length || 0}/500
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl mr-3 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Educación</h3>
              <p className="text-slate-600 text-sm">Estudios, años e instituciones</p>
            </div>
          </div>
          
          <button
            onClick={agregarEducacion}
            className="flex items-center px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Agregar
          </button>
        </div>

        {/* Lista de educaciones */}
        <div className="space-y-6">
          {educaciones.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
              <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <h4 className="text-lg font-medium text-slate-600 mb-2">No hay educación agregada</h4>
              <p className="text-slate-500 mb-4">Agrega tu formación académica para completar tu CV</p>
              <button
                onClick={agregarEducacion}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar primera educación
              </button>
            </div>
          ) : (
            educaciones.map((educacion, index) => renderEducacion(educacion, index))
          )}
        </div>

        {/* Resumen */}
        {educaciones.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
            <div className="flex items-center">
              <div className="p-1 bg-emerald-500 rounded-full mr-3">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-emerald-800">
                {educaciones.length} educación{educaciones.length !== 1 ? 'es' : ''} agregada{educaciones.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducacionModule;
