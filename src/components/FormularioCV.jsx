import React, { useState, useEffect } from 'react';

export default function FormularioCV({ onSubmit, cargando = false }) {
  const [datos, setDatos] = useState({
    nombre: '',
    experiencia: '',
    educacion: '',
    habilidades: '',
  });

  const [errores, setErrores] = useState({});
  const [camposTocados, setCamposTocados] = useState({});
  const [formularioValido, setFormularioValido] = useState(false);

  // Validaciones individuales por campo
  const validarCampo = (nombre, valor) => {
    const valorLimpio = valor.trim();
    
    switch (nombre) {
      case 'nombre':
        if (!valorLimpio) return 'El nombre es requerido';
        if (valorLimpio.length < 2) return 'El nombre debe tener al menos 2 caracteres';
        if (valorLimpio.length > 100) return 'El nombre no puede exceder 100 caracteres';
        return '';
        
      case 'experiencia':
        if (!valorLimpio) return 'La experiencia laboral es requerida';
        if (valorLimpio.length < 10) return 'Describe tu experiencia con más detalle (mínimo 10 caracteres)';
        if (valorLimpio.length > 1000) return 'La descripción es muy larga (máximo 1000 caracteres)';
        return '';
        
      case 'educacion':
        if (!valorLimpio) return 'La educación es requerida';
        if (valorLimpio.length < 5) return 'Describe tu educación con más detalle (mínimo 5 caracteres)';
        if (valorLimpio.length > 800) return 'La descripción es muy larga (máximo 800 caracteres)';
        return '';
        
      case 'habilidades':
        if (!valorLimpio) return 'Las habilidades son requeridas';
        if (valorLimpio.length < 5) return 'Lista al menos algunas habilidades (mínimo 5 caracteres)';
        if (valorLimpio.length > 500) return 'La lista es muy larga (máximo 500 caracteres)';
        return '';
        
      default:
        return '';
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    const nuevosDatos = { ...datos, [name]: value };
    setDatos(nuevosDatos);
    
    // Marcar el campo como tocado
    setCamposTocados({ ...camposTocados, [name]: true });
    
    // Validar el campo en tiempo real solo si ya fue tocado
    if (camposTocados[name] || value.trim() !== '') {
      const error = validarCampo(name, value);
      setErrores({ ...errores, [name]: error });
    }
  };

  const handleBlur = e => {
    const { name, value } = e.target;
    // Marcar como tocado y validar al perder el foco
    setCamposTocados({ ...camposTocados, [name]: true });
    const error = validarCampo(name, value);
    setErrores({ ...errores, [name]: error });
  };

  // Efecto para validar el formulario completo en tiempo real
  useEffect(() => {
    const validarFormularioCompleto = () => {
      const campos = ['nombre', 'experiencia', 'educacion', 'habilidades'];
      const erroresActuales = {};
      
      campos.forEach(campo => {
        const error = validarCampo(campo, datos[campo]);
        if (error) {
          erroresActuales[campo] = error;
        }
      });
      
      // Solo actualizar errores si el campo ha sido tocado
      const erroresFiltrados = {};
      Object.keys(erroresActuales).forEach(campo => {
        if (camposTocados[campo]) {
          erroresFiltrados[campo] = erroresActuales[campo];
        }
      });
      
      // Verificar si el formulario es válido
      const formularioCompleto = campos.every(campo => datos[campo].trim() !== '');
      const sinErrores = Object.keys(erroresActuales).length === 0;
      
      setFormularioValido(formularioCompleto && sinErrores);
    };
    
    validarFormularioCompleto();
  }, [datos, camposTocados]);

  const validarFormulario = () => {
    // Marcar todos los campos como tocados para mostrar errores
    const todosTocados = {
      nombre: true,
      experiencia: true,
      educacion: true,
      habilidades: true,
    };
    setCamposTocados(todosTocados);
    
    // Validar todos los campos
    const nuevosErrores = {};
    Object.keys(datos).forEach(campo => {
      const error = validarCampo(campo, datos[campo]);
      if (error) {
        nuevosErrores[campo] = error;
      }
    });
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    if (validarFormulario()) {
      onSubmit(datos);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <header className="card-header">
          <h1 className="font-display text-2xl font-bold text-gray-900" id="form-title">
            Información del Currículum
          </h1>
          <p className="text-gray-600 mt-2" id="form-description">
            Completa los siguientes campos para generar tu CV profesional. Todos los campos marcados con asterisco (*) son obligatorios.
          </p>
        </header>
        
        <form 
          onSubmit={handleSubmit} 
          className="card-body"
          aria-labelledby="form-title"
          aria-describedby="form-description"
          noValidate
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Columna izquierda */}
            <div className="space-y-6">
              <div>
                <label 
                  htmlFor="nombre-input" 
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  Nombre completo *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="nombre-input"
                    name="nombre"
                    value={datos.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Ej: Juan Pérez García"
                    required
                    aria-required="true"
                    aria-invalid={errores.nombre ? 'true' : 'false'}
                    aria-describedby={`nombre-help ${errores.nombre ? 'nombre-error' : ''}`}
                    maxLength={100}
                    className={`${
                      errores.nombre 
                        ? 'input-field-error' 
                        : camposTocados.nombre && !errores.nombre && datos.nombre.trim()
                        ? 'input-field border-green-300 focus:ring-green-500'
                        : 'input-field'
                    }`}
                  />
                  {/* Indicador de estado */}
                  {camposTocados.nombre && !errores.nombre && datos.nombre.trim() && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center" aria-hidden="true">
                      <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div id="nombre-help" className="sr-only">
                  Campo obligatorio. Ingresa tu nombre completo. Máximo 100 caracteres.
                </div>
                {errores.nombre && (
                  <p id="nombre-error" className="text-red-600 text-sm mt-2 flex items-center" role="alert" aria-live="polite">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errores.nombre}
                  </p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="experiencia-input" 
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  Experiencia laboral *
                </label>
                <div className="relative">
                  <textarea
                    id="experiencia-input"
                    name="experiencia"
                    value={datos.experiencia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Describe tu experiencia profesional, cargos anteriores, responsabilidades principales..."
                    rows="6"
                    required
                    aria-required="true"
                    aria-invalid={errores.experiencia ? 'true' : 'false'}
                    aria-describedby={`experiencia-help experiencia-counter ${errores.experiencia ? 'experiencia-error' : ''}`}
                    maxLength={1000}
                    className={`${
                      errores.experiencia 
                        ? 'input-field-error resize-none' 
                        : camposTocados.experiencia && !errores.experiencia && datos.experiencia.trim()
                        ? 'input-field resize-none border-green-300 focus:ring-green-500'
                        : 'input-field resize-none'
                    }`}
                  />
                  {/* Contador de caracteres */}
                  <div 
                    id="experiencia-counter" 
                    className="absolute bottom-2 right-2 text-xs text-gray-400"
                    aria-live="polite"
                  >
                    {datos.experiencia.length} de 1000 caracteres
                  </div>
                  {/* Indicador de estado */}
                  {camposTocados.experiencia && !errores.experiencia && datos.experiencia.trim() && (
                    <div className="absolute top-2 right-2" aria-hidden="true">
                      <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div id="experiencia-help" className="sr-only">
                  Campo obligatorio. Describe tu experiencia laboral con detalle. Mínimo 10 caracteres, máximo 1000 caracteres.
                </div>
                {errores.experiencia && (
                  <p id="experiencia-error" className="text-red-600 text-sm mt-2 flex items-center" role="alert" aria-live="polite">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errores.experiencia}
                  </p>
                )}
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-6">
              <div>
                <label 
                  htmlFor="educacion-input" 
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  Educación *
                </label>
                <div className="relative">
                  <textarea
                    id="educacion-input"
                    name="educacion"
                    value={datos.educacion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Incluye tu formación académica, títulos, certificaciones, cursos relevantes..."
                    rows="6"
                    required
                    aria-required="true"
                    aria-invalid={errores.educacion ? 'true' : 'false'}
                    aria-describedby={`educacion-help educacion-counter ${errores.educacion ? 'educacion-error' : ''}`}
                    maxLength={800}
                    className={`${
                      errores.educacion 
                        ? 'input-field-error resize-none' 
                        : camposTocados.educacion && !errores.educacion && datos.educacion.trim()
                        ? 'input-field resize-none border-green-300 focus:ring-green-500'
                        : 'input-field resize-none'
                    }`}
                  />
                  {/* Contador de caracteres */}
                  <div 
                    id="educacion-counter" 
                    className="absolute bottom-2 right-2 text-xs text-gray-400"
                    aria-live="polite"
                  >
                    {datos.educacion.length} de 800 caracteres
                  </div>
                  {/* Indicador de estado */}
                  {camposTocados.educacion && !errores.educacion && datos.educacion.trim() && (
                    <div className="absolute top-2 right-2" aria-hidden="true">
                      <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div id="educacion-help" className="sr-only">
                  Campo obligatorio. Describe tu formación académica y certificaciones. Mínimo 10 caracteres, máximo 800 caracteres.
                </div>
                {errores.educacion && (
                  <p id="educacion-error" className="text-red-600 text-sm mt-2 flex items-center" role="alert" aria-live="polite">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errores.educacion}
                  </p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="habilidades-input" 
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  Habilidades *
                </label>
                <div className="relative">
                  <textarea
                    id="habilidades-input"
                    name="habilidades"
                    value={datos.habilidades}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Lista tus habilidades técnicas, blandas, idiomas, herramientas que manejas..."
                    rows="6"
                    required
                    aria-required="true"
                    aria-invalid={errores.habilidades ? 'true' : 'false'}
                    aria-describedby={`habilidades-help habilidades-counter ${errores.habilidades ? 'habilidades-error' : ''}`}
                    maxLength={500}
                    className={`${
                      errores.habilidades 
                        ? 'input-field-error resize-none' 
                        : camposTocados.habilidades && !errores.habilidades && datos.habilidades.trim()
                        ? 'input-field resize-none border-green-300 focus:ring-green-500'
                        : 'input-field resize-none'
                    }`}
                  />
                  {/* Contador de caracteres */}
                  <div 
                    id="habilidades-counter" 
                    className="absolute bottom-2 right-2 text-xs text-gray-400"
                    aria-live="polite"
                  >
                    {datos.habilidades.length} de 500 caracteres
                  </div>
                  {/* Indicador de estado */}
                  {camposTocados.habilidades && !errores.habilidades && datos.habilidades.trim() && (
                    <div className="absolute top-2 right-2" aria-hidden="true">
                      <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div id="habilidades-help" className="sr-only">
                  Campo obligatorio. Lista tus habilidades profesionales y técnicas. Mínimo 5 caracteres, máximo 500 caracteres.
                </div>
                {errores.habilidades && (
                  <p id="habilidades-error" className="text-red-600 text-sm mt-2 flex items-center" role="alert" aria-live="polite">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errores.habilidades}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Botón de envío */}
          <section className="mt-10 pt-6 border-t border-gray-200" aria-labelledby="submit-section">
            <h2 id="submit-section" className="sr-only">Envío del formulario</h2>
            
            {/* Indicador de progreso del formulario */}
            <div className="mb-6" role="region" aria-labelledby="progress-label">
              <div className="flex justify-between items-center mb-2">
                <span id="progress-label" className="text-sm font-medium text-gray-700">
                  Progreso del formulario
                </span>
                <span className="text-sm text-gray-500" aria-live="polite">
                  {Object.values(datos).filter(valor => valor.trim() !== '').length} de 4 campos completados
                </span>
              </div>
              <div 
                className="w-full bg-gray-200 rounded-full h-2" 
                role="progressbar" 
                aria-valuenow={Object.values(datos).filter(valor => valor.trim() !== '').length}
                aria-valuemin={0}
                aria-valuemax={4}
                aria-labelledby="progress-label"
              >
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    formularioValido ? 'bg-green-500' : 'bg-primary-500'
                  }`}
                  style={{
                    width: `${(Object.values(datos).filter(valor => valor.trim() !== '').length / 4) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            <button
              type="submit"
              disabled={cargando || !formularioValido}
              aria-describedby="submit-status"
              aria-live="polite"
              className={`w-full text-lg py-4 transition-all duration-200 ${
                cargando 
                  ? 'opacity-50 cursor-not-allowed btn-accent' 
                  : !formularioValido
                  ? 'opacity-60 cursor-not-allowed bg-gray-400 text-white rounded-xl font-medium'
                  : 'btn-accent hover:scale-105'
              }`}
            >
              {cargando ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generando tu CV profesional...
                </span>
              ) : !formularioValido ? (
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  Completa todos los campos requeridos
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generar CV con IA
                </span>
              )}
            </button>
            
            <div id="submit-status" className="mt-4 text-center" aria-live="polite">
              {formularioValido ? (
                <p className="text-sm text-green-600 flex items-center justify-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  ¡Formulario listo! Haz clic para generar tu CV
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  La generación puede tomar unos segundos mientras la IA procesa tu información
                </p>
              )}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
