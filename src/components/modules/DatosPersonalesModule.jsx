import React, { useState, useCallback } from 'react';

const DatosPersonalesModule = ({ datos, onCambiarDatos, errores, camposTocados, onCampoTocado }) => {
  const [mostrarCamposAdicionales, setMostrarCamposAdicionales] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    onCambiarDatos('datosPersonales', name, value);
  }, [onCambiarDatos]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    onCampoTocado('datosPersonales', name);
  }, [onCampoTocado]);

  const camposBasicos = [
    { key: 'nombre', label: 'Nombre completo', type: 'text', required: true, placeholder: 'Ej: Juan Carlos Pérez García' },
    { key: 'email', label: 'Correo electrónico', type: 'email', required: true, placeholder: 'juan.perez@email.com' },
    { key: 'telefono', label: 'Teléfono', type: 'tel', required: true, placeholder: '+57 300 123 4567' },
    { key: 'ubicacion', label: 'Ubicación', type: 'text', required: true, placeholder: 'Bogotá, Colombia' }
  ];

  const camposAdicionales = [
    { key: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date', required: false },
    { key: 'estadoCivil', label: 'Estado civil', type: 'select', required: false, options: ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a', 'Unión libre'] },
    { key: 'nacionalidad', label: 'Nacionalidad', type: 'text', required: false, placeholder: 'Colombiana' },
    { key: 'cedula', label: 'Documento de identidad', type: 'text', required: false, placeholder: '1234567890' },
    { key: 'linkedin', label: 'LinkedIn', type: 'url', required: false, placeholder: 'https://linkedin.com/in/tu-perfil' },
    { key: 'sitioWeb', label: 'Sitio web / Portafolio', type: 'url', required: false, placeholder: 'https://tu-portafolio.com' }
  ];

  const renderCampo = (campo) => {
    const valor = datos?.datosPersonales?.[campo.key] || '';
    const tieneError = errores?.datosPersonales?.[campo.key];
    const estaTocado = camposTocados?.datosPersonales?.[campo.key];
    const esValido = estaTocado && !tieneError && valor.trim();

    return (
      <div key={campo.key} className="space-y-2">
        <label htmlFor={campo.key} className="flex items-center text-sm font-semibold text-slate-700">
          {campo.label}
          {campo.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {campo.type === 'select' ? (
          <select
            id={campo.key}
            name={campo.key}
            value={valor}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 ${
              tieneError && estaTocado
                ? 'border-red-300 focus:ring-red-500 bg-red-50'
                : esValido
                ? 'border-green-300 focus:ring-green-500 bg-green-50'
                : 'border-slate-300 focus:ring-blue-500 hover:border-slate-400'
            }`}
          >
            <option value="">Seleccionar...</option>
            {campo.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            id={campo.key}
            name={campo.key}
            type={campo.type}
            value={valor}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={campo.placeholder}
            className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 ${
              tieneError && estaTocado
                ? 'border-red-300 focus:ring-red-500 bg-red-50'
                : esValido
                ? 'border-green-300 focus:ring-green-500 bg-green-50'
                : 'border-slate-300 focus:ring-blue-500 hover:border-slate-400'
            }`}
          />
        )}

        {/* Mensajes de error */}
        {tieneError && estaTocado && (
          <div className="flex items-center text-red-600 text-sm animate-slideIn">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {tieneError}
          </div>
        )}

        {/* Mensaje de éxito */}
        {esValido && (
          <div className="flex items-center text-green-600 text-sm animate-slideIn">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            ¡Perfecto!
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl mr-3 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Datos Personales</h3>
              <p className="text-slate-600 text-sm">Información básica de contacto y personal</p>
            </div>
          </div>
          
          <button
            onClick={() => setMostrarCamposAdicionales(!mostrarCamposAdicionales)}
            className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <svg className={`w-4 h-4 mr-1 transition-transform ${mostrarCamposAdicionales ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {mostrarCamposAdicionales ? 'Menos campos' : 'Más campos'}
          </button>
        </div>

        {/* Campos básicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {camposBasicos.map(renderCampo)}
        </div>

        {/* Campos adicionales */}
        {mostrarCamposAdicionales && (
          <div className="border-t border-slate-200 pt-6">
            <h4 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Información Adicional
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {camposAdicionales.map(renderCampo)}
            </div>
          </div>
        )}

        {/* Resumen de completitud */}
        <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-1 bg-blue-500 rounded-full mr-3">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-700">
                Campos completados: {camposBasicos.filter(campo => datos?.datosPersonales?.[campo.key]?.trim()).length}/{camposBasicos.length} básicos
              </span>
            </div>
            <span className="text-xs text-slate-500">
              {mostrarCamposAdicionales && `+ ${camposAdicionales.filter(campo => datos?.datosPersonales?.[campo.key]?.trim()).length} adicionales`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosPersonalesModule;
