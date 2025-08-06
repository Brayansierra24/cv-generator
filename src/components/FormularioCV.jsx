
import React, { useState, useCallback, useMemo } from 'react';
import SugerenciasIA from './SugerenciasIA';
import SelectorPlantillaCV from './SelectorPlantillaCV';
import SeccionesOpcionalesCV from './SeccionesOpcionalesCV';
import GeneradorPDFAvanzado from './GeneradorPDFAvanzado';

// Importar todos los módulos del CV
import DatosPersonalesModule from './modules/DatosPersonalesModule';
import EducacionModule from './modules/EducacionModule';
import ExperienciaModule from './modules/ExperienciaModule';
import HabilidadesModule from './modules/HabilidadesModule';
import IdiomasModule from './modules/IdiomasModule';
import ProyectosModule from './modules/ProyectosModule';
import FotoPerfilModule from './modules/FotoPerfilModule';

export default function FormularioCVElegante({ onSubmit, cargando = false }) {
  // Estado principal del CV con todos los módulos
  const [datos, setDatos] = useState({
    // Datos básicos (legacy)
    nombre: '',
    experiencia: '',
    educacion: '',
    habilidades: '',
    
    // Datos de los módulos
    datosPersonales: {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      ubicacion: '',
      sitioWeb: '',
      linkedin: '',
      resumenProfesional: ''
    },
    educacion: { lista: [] },
    experiencia: { lista: [] },
    habilidades: { 
      tecnicas: [],
      blandas: [],
      herramientas: [],
      modoVisualizacion: 'barras'
    },
    idiomas: { lista: [] },
    proyectos: { lista: [] },
    fotoPerfil: null
  });

  const [errores, setErrores] = useState({});
  const [camposTocados, setCamposTocados] = useState({});
  
  // Estados para funcionalidad avanzada del PDF
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState('moderna');
  const [seccionesActivas, setSeccionesActivas] = useState([]);
  const [datosOpcionales, setDatosOpcionales] = useState({});
  
  // Estado para funcionalidades inteligentes
  const [modoInteligente, setModoInteligente] = useState(false);
  const [sugerenciasIA, setSugerenciasIA] = useState([]);
  const [generandoIA, setGenerandoIA] = useState(false);

  // Validación optimizada
  const validarCampo = useCallback((nombre, valor) => {
    const valorLimpio = valor.trim();
    
    switch (nombre) {
      case 'nombre':
        if (!valorLimpio) return 'El nombre es requerido';
        if (valorLimpio.length < 2) return 'Mínimo 2 caracteres';
        if (valorLimpio.length > 100) return 'Máximo 100 caracteres';
        return '';
      case 'experiencia':
        if (!valorLimpio) return 'La experiencia es requerida';
        if (valorLimpio.length < 10) return 'Mínimo 10 caracteres';
        if (valorLimpio.length > 1000) return 'Máximo 1000 caracteres';
        return '';
      case 'educacion':
        if (!valorLimpio) return 'La educación es requerida';
        if (valorLimpio.length < 5) return 'Mínimo 5 caracteres';
        if (valorLimpio.length > 800) return 'Máximo 800 caracteres';
        return '';
      case 'habilidades':
        if (!valorLimpio) return 'Las habilidades son requeridas';
        if (valorLimpio.length < 5) return 'Mínimo 5 caracteres';
        if (valorLimpio.length > 500) return 'Máximo 500 caracteres';
        return '';
      default:
        return '';
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    // Actualizar todos los estados en una sola operación para evitar re-renderizados múltiples
    setDatos(prev => ({ ...prev, [name]: value }));
    
    // Solo marcar como tocado y validar después de un pequeño delay para evitar interferir con la escritura
    setTimeout(() => {
      setCamposTocados(prev => ({ ...prev, [name]: true }));
      
      // Validar usando la función inline para evitar dependencias
      const valorLimpio = value.trim();
      let error = '';
      
      switch (name) {
        case 'nombre':
          if (!valorLimpio) error = 'El nombre es requerido';
          else if (valorLimpio.length < 2) error = 'Mínimo 2 caracteres';
          else if (valorLimpio.length > 100) error = 'Máximo 100 caracteres';
          break;
        case 'experiencia':
          if (!valorLimpio) error = 'La experiencia es requerida';
          else if (valorLimpio.length < 10) error = 'Mínimo 10 caracteres';
          else if (valorLimpio.length > 1000) error = 'Máximo 1000 caracteres';
          break;
        case 'educacion':
          if (!valorLimpio) error = 'La educación es requerida';
          else if (valorLimpio.length < 5) error = 'Mínimo 5 caracteres';
          else if (valorLimpio.length > 800) error = 'Máximo 800 caracteres';
          break;
        case 'habilidades':
          if (!valorLimpio) error = 'Las habilidades son requeridas';
          else if (valorLimpio.length < 5) error = 'Mínimo 5 caracteres';
          else if (valorLimpio.length > 500) error = 'Máximo 500 caracteres';
          break;
      }
      
      setErrores(prev => ({ ...prev, [name]: error }));
    }, 0);
  }, []);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setCamposTocados(prev => ({ ...prev, [name]: true }));
    const error = validarCampo(name, value);
    setErrores(prev => ({ ...prev, [name]: error }));
  }, [validarCampo]);

  // Handlers para los módulos del CV
  const handleCambiarDatosModulo = useCallback((modulo, campo, valor) => {
    setDatos(prev => ({
      ...prev,
      [modulo]: {
        ...prev[modulo],
        [campo]: valor
      }
    }));
  }, []);

  const handleCampoTocado = useCallback((modulo, campo) => {
    setCamposTocados(prev => ({
      ...prev,
      [`${modulo}.${campo}`]: true
    }));
  }, []);

  // Funcionalidades inteligentes de IA
  const generarResumenProfesional = useCallback(async () => {
    setGenerandoIA(true);
    try {
      // Simular generación de IA basada en los datos del usuario
      const experiencias = datos.experiencia?.lista || [];
      const habilidades = [...(datos.habilidades?.tecnicas || []), ...(datos.habilidades?.blandas || [])];
      const educacion = datos.educacion?.lista || [];
      
      // Generar resumen inteligente
      let resumen = '';
      if (experiencias.length > 0) {
        const añosExperiencia = experiencias.length;
        const ultimoCargo = experiencias[0]?.cargo || 'Profesional';
        resumen += `${ultimoCargo} con ${añosExperiencia}+ años de experiencia. `;
      }
      
      if (habilidades.length > 0) {
        const habilidadesPrincipales = habilidades.slice(0, 3).map(h => h.nombre || h).join(', ');
        resumen += `Especializado en ${habilidadesPrincipales}. `;
      }
      
      if (educacion.length > 0) {
        const ultimaEducacion = educacion[0];
        resumen += `Formación en ${ultimaEducacion?.titulo || 'área relevante'}. `;
      }
      
      resumen += 'Comprometido con la excelencia y el crecimiento profesional continuo.';
      
      // Actualizar el resumen profesional
      handleCambiarDatosModulo('datosPersonales', 'resumenProfesional', resumen);
      
      // Mostrar sugerencia
      setSugerenciasIA([{
        id: Date.now(),
        tipo: 'resumen',
        titulo: '✨ Resumen profesional generado',
        descripcion: 'Se ha creado un resumen basado en tu experiencia y habilidades',
        accion: 'aplicado'
      }]);
      
    } catch (error) {
      console.error('Error generando resumen:', error);
    } finally {
      setGenerandoIA(false);
    }
  }, [datos, handleCambiarDatosModulo]);

  const sugerirHabilidades = useCallback(async () => {
    setGenerandoIA(true);
    try {
      const experiencias = datos.experiencia?.lista || [];
      const proyectos = datos.proyectos?.lista || [];
      
      // Extraer tecnologías de proyectos
      const tecnologiasProyectos = proyectos.flatMap(p => p.tecnologias || []);
      
      // Sugerir habilidades basadas en experiencia y proyectos
      const habilidadesSugeridas = [
        ...tecnologiasProyectos,
        'Trabajo en equipo',
        'Resolución de problemas',
        'Comunicación efectiva',
        'Liderazgo',
        'Adaptabilidad'
      ].filter((h, index, arr) => arr.indexOf(h) === index).slice(0, 8);
      
      setSugerenciasIA([{
        id: Date.now(),
        tipo: 'habilidades',
        titulo: '🎯 Habilidades sugeridas',
        descripcion: `Basado en tus proyectos y experiencia, te sugerimos: ${habilidadesSugeridas.slice(0, 3).join(', ')}`,
        datos: habilidadesSugeridas,
        accion: 'pendiente'
      }]);
      
    } catch (error) {
      console.error('Error sugiriendo habilidades:', error);
    } finally {
      setGenerandoIA(false);
    }
  }, [datos]);

  const aplicarSugerenciaIA = useCallback((sugerencia) => {
    if (sugerencia.tipo === 'habilidades' && sugerencia.datos) {
      const nuevasHabilidades = sugerencia.datos.map(nombre => ({
        id: Date.now() + Math.random(),
        nombre,
        nivel: 'intermedio',
        categoria: 'tecnica'
      }));
      
      handleCambiarDatosModulo('habilidades', 'tecnicas', [
        ...(datos.habilidades?.tecnicas || []),
        ...nuevasHabilidades
      ]);
    }
    
    // Marcar sugerencia como aplicada
    setSugerenciasIA(prev => 
      prev.map(s => s.id === sugerencia.id ? { ...s, accion: 'aplicado' } : s)
    );
  }, [datos, handleCambiarDatosModulo]);

  // Handlers para funcionalidad avanzada del PDF
  const handleSeleccionarPlantilla = useCallback((plantilla) => {
    setPlantillaSeleccionada(plantilla);
  }, []);

  const handleToggleSeccion = useCallback((seccionId) => {
    setSeccionesActivas(prev => {
      if (prev.includes(seccionId)) {
        return prev.filter(id => id !== seccionId);
      } else {
        return [...prev, seccionId];
      }
    });
  }, []);

  const handleCambiarDatosOpcionales = useCallback((seccionId, campo, valor) => {
    setDatosOpcionales(prev => ({
      ...prev,
      [seccionId]: {
        ...prev[seccionId],
        [campo]: valor
      }
    }));
  }, []);

  const formularioValido = useMemo(() => {
    const campos = ['nombre', 'experiencia', 'educacion', 'habilidades'];
    return campos.every(campo => datos[campo].trim() && !validarCampo(campo, datos[campo]));
  }, [datos, validarCampo]);

  const progresoFormulario = useMemo(() => {
    const completados = Object.values(datos).filter(v => v.trim()).length;
    return { completados, total: 4, porcentaje: (completados / 4) * 100 };
  }, [datos]);

  const handleAplicarSugerencias = useCallback((nuevasDatos) => {
    setDatos(prev => ({ ...prev, ...nuevasDatos }));
    const nuevosTocados = { ...camposTocados };
    const nuevosErrores = { ...errores };
    
    Object.keys(nuevasDatos).forEach(campo => {
      if (nuevasDatos[campo]?.trim()) {
        nuevosTocados[campo] = true;
        nuevosErrores[campo] = validarCampo(campo, nuevasDatos[campo]);
      }
    });
    
    setCamposTocados(nuevosTocados);
    setErrores(nuevosErrores);
  }, [camposTocados, errores, validarCampo]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (formularioValido) await onSubmit(datos);
  }, [datos, onSubmit, formularioValido]);

  // Componente de campo elegante
  const CampoElegante = ({ id, name, label, placeholder, maxLength, type = "text", rows, icon, required = false }) => {
    const isTextarea = type === "textarea";
    const Component = isTextarea ? "textarea" : "input";
    const hasError = errores[name];
    const isTouched = camposTocados[name];
    const isValid = isTouched && !hasError && datos[name] && datos[name].trim();
    
    return (
      <div className="group">
        <label htmlFor={id} className="flex items-center text-sm font-semibold text-slate-700 mb-3 transition-colors group-focus-within:text-indigo-600">
          {icon && <span className="mr-2 text-slate-500 group-focus-within:text-indigo-500 transition-colors">{icon}</span>}
          {label} <span className="text-red-500 ml-1">*</span>
        </label>
        
        <div className="relative">
          <Component
            id={id}
            name={name}
            value={datos[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 text-slate-800 placeholder-slate-400 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-4 hover:bg-white/90 hover:shadow-md ${
              isTextarea ? 'resize-none min-h-[120px]' : 'h-12'
            } ${
              hasError 
                ? 'border-red-400 bg-red-50/50 focus:border-red-500 focus:ring-red-500/20' 
                : isValid
                ? 'border-emerald-400 bg-emerald-50/30 focus:border-emerald-500 focus:ring-emerald-500/20'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/20'
            }`}
          />
          
          <div className="absolute top-3 right-3 flex items-center space-x-2">
            {isTextarea && (
              <div className={`text-xs px-2 py-1 rounded-full ${
                datos[name].length > maxLength * 0.8 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {datos[name].length}/{maxLength}
              </div>
            )}
            
            {isTouched && (
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                hasError ? 'bg-red-100 text-red-600' : isValid ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {hasError ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : isValid ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            )}
          </div>
        </div>
        
        {hasError && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-slideIn">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 text-sm font-medium">{hasError}</span>
            </div>
          </div>
        )}
        
        {isValid && (
          <div className="mt-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg animate-slideIn">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-emerald-700 text-sm font-medium">¡Perfecto!</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header elegante */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-indigo-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Crea tu CV Profesional
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Completa la información y genera un currículum impactante con ayuda de inteligencia artificial
          </p>
        </div>

        {/* Card principal con glassmorphism */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Sugerencias de IA */}
          <div className="p-8 border-b border-slate-200/50">
            <SugerenciasIA 
              onAplicarSugerencias={handleAplicarSugerencias}
              datosActuales={datos}
              disabled={cargando}
            />
          </div>
          
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-8" noValidate>
            {/* Grid responsivo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Columna izquierda */}
              <div className="space-y-8">
                {/* Campo de Nombre - Diseño Premium */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                    <label htmlFor="nombre-input" className="flex items-center text-sm font-bold text-slate-800 mb-4 group-focus-within:text-indigo-600 transition-colors">
                      <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mr-3 shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="text-lg">Nombre completo</span>
                      <span className="text-red-500 ml-2 text-base">*</span>
                    </label>
                    
                    <div className="relative">
                      <input
                        id="nombre-input"
                        name="nombre"
                        type="text"
                        value={datos.nombre || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Ej: Ana García López"
                        maxLength={100}
                        className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-500 text-slate-800 placeholder-slate-400 bg-gradient-to-r from-white/80 to-slate-50/80 backdrop-blur-sm focus:outline-none focus:ring-4 hover:shadow-lg transform hover:scale-[1.02] focus:scale-[1.02] h-14 text-lg font-medium ${
                          errores.nombre 
                            ? 'border-red-400 bg-gradient-to-r from-red-50/80 to-red-100/50 focus:border-red-500 focus:ring-red-500/30 shadow-red-200/50' 
                            : (camposTocados.nombre && !errores.nombre && datos.nombre && datos.nombre.trim())
                            ? 'border-emerald-400 bg-gradient-to-r from-emerald-50/80 to-green-50/50 focus:border-emerald-500 focus:ring-emerald-500/30 shadow-emerald-200/50'
                            : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/30 shadow-slate-200/30'
                        }`}
                      />
                      
                      {/* Contador de caracteres mejorado */}
                      <div className={`absolute top-4 right-4 text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                        (datos.nombre || '').length > 80 ? 'bg-amber-100 text-amber-700 shadow-amber-200/50' : 'bg-slate-100/80 text-slate-600 shadow-slate-200/30'
                      }`}>
                        {(datos.nombre || '').length}/100
                      </div>
                    </div>
                  
                    {/* Mensaje de error mejorado */}
                    {errores.nombre && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-red-100/50 border-l-4 border-red-400 rounded-xl shadow-lg animate-slideIn">
                        <div className="flex items-start">
                          <div className="p-1 bg-red-500 rounded-full mr-3">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-red-800 font-semibold text-sm">{errores.nombre}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Mensaje de éxito mejorado */}
                    {camposTocados.nombre && !errores.nombre && datos.nombre && datos.nombre.trim() && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-green-100/50 border-l-4 border-emerald-400 rounded-xl shadow-lg animate-slideIn">
                        <div className="flex items-center">
                          <div className="p-1 bg-emerald-500 rounded-full mr-3">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-emerald-800 font-semibold text-sm">¡Perfecto! Nombre registrado correctamente</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Campo de Experiencia - Diseño Premium */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                    <label htmlFor="experiencia-input" className="flex items-center text-sm font-bold text-slate-800 mb-4 group-focus-within:text-blue-600 transition-colors">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl mr-3 shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                        </svg>
                      </div>
                      <span className="text-lg">Experiencia laboral</span>
                      <span className="text-red-500 ml-2 text-base">*</span>
                    </label>
                    
                    <div className="relative">
                      <textarea
                        id="experiencia-input"
                        name="experiencia"
                        value={datos.experiencia || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Describe tu experiencia profesional, logros destacados, responsabilidades, proyectos importantes..."
                        rows={6}
                        maxLength={1000}
                        className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-500 text-slate-800 placeholder-slate-400 bg-gradient-to-r from-white/80 to-slate-50/80 backdrop-blur-sm focus:outline-none focus:ring-4 hover:shadow-lg transform hover:scale-[1.01] focus:scale-[1.01] resize-none min-h-[180px] text-base font-medium leading-relaxed ${
                          errores.experiencia 
                            ? 'border-red-400 bg-gradient-to-r from-red-50/80 to-red-100/50 focus:border-red-500 focus:ring-red-500/30 shadow-red-200/50' 
                            : (camposTocados.experiencia && !errores.experiencia && datos.experiencia && datos.experiencia.trim())
                            ? 'border-emerald-400 bg-gradient-to-r from-emerald-50/80 to-green-50/50 focus:border-emerald-500 focus:ring-emerald-500/30 shadow-emerald-200/50'
                            : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/30 shadow-slate-200/30'
                        }`}
                      />
                      
                      {/* Contador de caracteres mejorado */}
                      <div className={`absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                        (datos.experiencia || '').length > 800 ? 'bg-amber-100 text-amber-700 shadow-amber-200/50' : 'bg-slate-100/80 text-slate-600 shadow-slate-200/30'
                      }`}>
                        {(datos.experiencia || '').length}/1000
                      </div>
                    </div>
                  
                    {/* Mensaje de error mejorado */}
                    {errores.experiencia && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-red-100/50 border-l-4 border-red-400 rounded-xl shadow-lg animate-slideIn">
                        <div className="flex items-start">
                          <div className="p-1 bg-red-500 rounded-full mr-3">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-red-800 font-semibold text-sm">{errores.experiencia}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Mensaje de éxito mejorado */}
                    {camposTocados.experiencia && !errores.experiencia && datos.experiencia && datos.experiencia.trim() && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-green-100/50 border-l-4 border-emerald-400 rounded-xl shadow-lg animate-slideIn">
                        <div className="flex items-center">
                          <div className="p-1 bg-emerald-500 rounded-full mr-3">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-emerald-800 font-semibold text-sm">¡Excelente! Experiencia registrada correctamente</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Columna derecha */}
              <div className="space-y-8">
                {/* Campo de Educación - Diseño Premium */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                    <label htmlFor="educacion-input" className="flex items-center text-sm font-bold text-slate-800 mb-4 group-focus-within:text-emerald-600 transition-colors">
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl mr-3 shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                      </div>
                      <span className="text-lg">Educación</span>
                      <span className="text-red-500 ml-2 text-base">*</span>
                    </label>
                    
                    <div className="relative">
                      <textarea
                        id="educacion-input"
                        name="educacion"
                        value={datos.educacion || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Incluye tu formación académica, títulos, certificaciones, cursos, especializaciones..."
                        rows={6}
                        maxLength={800}
                        className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-500 text-slate-800 placeholder-slate-400 bg-gradient-to-r from-white/80 to-slate-50/80 backdrop-blur-sm focus:outline-none focus:ring-4 hover:shadow-lg transform hover:scale-[1.01] focus:scale-[1.01] resize-none min-h-[180px] text-base font-medium leading-relaxed ${
                          errores.educacion 
                            ? 'border-red-400 bg-gradient-to-r from-red-50/80 to-red-100/50 focus:border-red-500 focus:ring-red-500/30 shadow-red-200/50' 
                            : (camposTocados.educacion && !errores.educacion && datos.educacion && datos.educacion.trim())
                            ? 'border-emerald-400 bg-gradient-to-r from-emerald-50/80 to-green-50/50 focus:border-emerald-500 focus:ring-emerald-500/30 shadow-emerald-200/50'
                            : 'border-slate-300 focus:border-emerald-500 focus:ring-emerald-500/30 shadow-slate-200/30'
                        }`}
                      />
                      
                      {/* Contador de caracteres mejorado */}
                      <div className={`absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                        (datos.educacion || '').length > 640 ? 'bg-amber-100 text-amber-700 shadow-amber-200/50' : 'bg-slate-100/80 text-slate-600 shadow-slate-200/30'
                      }`}>
                        {(datos.educacion || '').length}/800
                      </div>
                    </div>
                  
                    {/* Mensaje de error mejorado */}
                    {errores.educacion && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-red-100/50 border-l-4 border-red-400 rounded-xl shadow-lg animate-slideIn">
                        <div className="flex items-start">
                          <div className="p-1 bg-red-500 rounded-full mr-3">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-red-800 font-semibold text-sm">{errores.educacion}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Mensaje de éxito mejorado */}
                    {camposTocados.educacion && !errores.educacion && datos.educacion && datos.educacion.trim() && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-green-100/50 border-l-4 border-emerald-400 rounded-xl shadow-lg animate-slideIn">
                        <div className="flex items-center">
                          <div className="p-1 bg-emerald-500 rounded-full mr-3">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-emerald-800 font-semibold text-sm">¡Excelente! Educación registrada correctamente</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Campo de Habilidades - Diseño Premium */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                    <label htmlFor="habilidades-input" className="flex items-center text-sm font-bold text-slate-800 mb-4 group-focus-within:text-amber-600 transition-colors">
                      <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl mr-3 shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <span className="text-lg">Habilidades</span>
                      <span className="text-red-500 ml-2 text-base">*</span>
                    </label>
                    
                    <div className="relative">
                      <textarea
                        id="habilidades-input"
                        name="habilidades"
                        value={datos.habilidades || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Lista tus habilidades técnicas, blandas, idiomas, certificaciones, herramientas..."
                        rows={6}
                        maxLength={500}
                        className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-500 text-slate-800 placeholder-slate-400 bg-gradient-to-r from-white/80 to-slate-50/80 backdrop-blur-sm focus:outline-none focus:ring-4 hover:shadow-lg transform hover:scale-[1.01] focus:scale-[1.01] resize-none min-h-[180px] text-base font-medium leading-relaxed ${
                          errores.habilidades 
                            ? 'border-red-400 bg-gradient-to-r from-red-50/80 to-red-100/50 focus:border-red-500 focus:ring-red-500/30 shadow-red-200/50' 
                            : (camposTocados.habilidades && !errores.habilidades && datos.habilidades && datos.habilidades.trim())
                            ? 'border-emerald-400 bg-gradient-to-r from-emerald-50/80 to-green-50/50 focus:border-emerald-500 focus:ring-emerald-500/30 shadow-emerald-200/50'
                            : 'border-slate-300 focus:border-amber-500 focus:ring-amber-500/30 shadow-slate-200/30'
                        }`}
                      />
                      
                      {/* Contador de caracteres mejorado */}
                      <div className={`absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full font-semibold transition-all ${
                        (datos.habilidades || '').length > 400 ? 'bg-amber-100 text-amber-700 shadow-amber-200/50' : 'bg-slate-100/80 text-slate-600 shadow-slate-200/30'
                      }`}>
                        {(datos.habilidades || '').length}/500
                      </div>
                    </div>
                    
                    {/* Mensaje de error mejorado */}
                    {errores.habilidades && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-red-100/50 border-l-4 border-red-400 rounded-xl shadow-lg animate-slideIn">
                        <div className="flex items-start">
                          <div className="p-1 bg-red-500 rounded-full mr-3">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-red-800 font-semibold text-sm">{errores.habilidades}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Mensaje de éxito mejorado */}
                    {camposTocados.habilidades && !errores.habilidades && datos.habilidades && datos.habilidades.trim() && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-green-100/50 border-l-4 border-emerald-400 rounded-xl shadow-lg animate-slideIn">
                        <div className="flex items-center">
                          <div className="p-1 bg-emerald-500 rounded-full mr-3">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-emerald-800 font-semibold text-sm">¡Excelente! Habilidades registradas correctamente</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Selector de Plantilla */}
            <div className="mt-8">
              <SelectorPlantillaCV 
                plantillaSeleccionada={plantillaSeleccionada}
                onSeleccionarPlantilla={handleSeleccionarPlantilla}
              />
            </div>
            
            {/* Secciones Opcionales */}
            <div className="mt-8">
              <SeccionesOpcionalesCV 
                seccionesActivas={seccionesActivas}
                onToggleSeccion={handleToggleSeccion}
                datosOpcionales={datosOpcionales}
                onCambiarDatos={handleCambiarDatosOpcionales}
              />
            </div>
            
            {/* Generador de PDF Avanzado */}
            {formularioValido && (
              <div className="mt-8">
                <GeneradorPDFAvanzado 
                  datos={datos}
                  plantilla={plantillaSeleccionada}
                  seccionesOpcionales={datosOpcionales}
                  seccionesActivas={seccionesActivas}
                />
              </div>
            )}
            
            {/* Progreso y envío */}
            <div className="mt-12 pt-8 border-t border-slate-200/50">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-slate-700 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Progreso del formulario
                  </h3>
                  <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    {progresoFormulario.completados} de {progresoFormulario.total} completados
                  </span>
                </div>
                
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${
                      formularioValido ? 'from-emerald-500 to-green-500' : 'from-indigo-500 to-purple-500'
                    }`}
                    style={{ width: `${progresoFormulario.porcentaje}%` }}
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  disabled={cargando || !formularioValido}
                  className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform ${
                    cargando 
                      ? 'bg-slate-400 text-white cursor-not-allowed scale-95' 
                      : !formularioValido
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed scale-95'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:scale-105 hover:shadow-2xl active:scale-95'
                  }`}
                >
                  <span className="flex items-center justify-center">
                    {cargando ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Generando tu CV profesional...
                      </>
                    ) : !formularioValido ? (
                      <>
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Completa todos los campos
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Generar CV con IA
                      </>
                    )}
                  </span>
                </button>
                
                <div className="mt-4">
                  {formularioValido ? (
                    <p className="text-emerald-600 font-medium flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      ¡Formulario listo! Haz clic para generar tu CV
                    </p>
                  ) : (
                    <p className="text-slate-500">
                      La generación puede tomar unos segundos mientras la IA procesa tu información
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
