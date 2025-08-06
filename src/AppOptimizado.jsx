import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Login from './components/Login';
import FormularioCVOptimizado from './components/FormularioCVOptimizado';
import VistaPreviaCVOptimizada from './components/VistaPreviaCVOptimizada';
import BotonDescargarPDFOptimizado from './components/BotonDescargarPDFOptimizado';
import { cvApi, initializeApp } from './config/axios';

function AppOptimizado() {
  const [logueado, setLogueado] = useState(false);
  const [cv, setCv] = useState('');
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [appInitialized, setAppInitialized] = useState(false);

  // Memoizar la función de inicialización para evitar recreaciones
  const initApp = useCallback(async () => {
    try {
      await initializeApp();
      setAppInitialized(true);
    } catch (error) {
      console.error('Error inicializando la aplicación:', error);
      setError('Error de conexión. Por favor, verifica que el servidor esté funcionando.');
      setAppInitialized(true); // Permitir que la app continúe
    }
  }, []);

  // Inicializar la aplicación y el token CSRF solo una vez
  useEffect(() => {
    initApp();
  }, [initApp]);

  // Memoizar la función de generación de CV para evitar recreaciones
  const handleGenerarCV = useCallback(async (datosUsuario) => {
    setCargando(true);
    setError('');
    
    try {
      console.log('Generando CV con datos:', datosUsuario);
      const response = await cvApi.post('/api/generar-cv', datosUsuario);
      console.log('Respuesta de generación de CV:', response.data);
      setCv(response.data.cv);
      setDatos(datosUsuario);
    } catch (err) {
      console.error('Error al generar CV:', err);
      setError('Error al generar el CV: ' + (err.response?.data?.message || err.message));
    } finally {
      setCargando(false);
    }
  }, []);

  // Memoizar la función de login para evitar recreaciones
  const handleLogin = useCallback(() => {
    setLogueado(true);
  }, []);

  // Memoizar el componente de carga para evitar re-renders innecesarios
  const ComponenteCarga = useMemo(() => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 mb-6">
          <svg className="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h2 className="font-display text-xl font-semibold text-gray-900 mb-2">Inicializando aplicación</h2>
        <p className="text-gray-600">Configurando conexión segura con el servidor...</p>
      </div>
    </div>
  ), []);

  // Memoizar el componente de error para evitar re-renders innecesarios
  const ComponenteError = useMemo(() => error ? (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-soft">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      </div>
    </div>
  ) : null, [error]);

  // Memoizar el header para evitar re-renders innecesarios
  const Header = useMemo(() => (
    <div className="text-center mb-12">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Generador de CV con IA
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Crea un currículum profesional en minutos con la ayuda de inteligencia artificial
      </p>
    </div>
  ), []);

  // Mostrar indicador de carga mientras se inicializa la app
  if (!appInitialized) {
    return ComponenteCarga;
  }

  // Mostrar login si no está logueado
  if (!logueado) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {Header}

        <FormularioCVOptimizado onSubmit={handleGenerarCV} cargando={cargando} />
        
        {ComponenteError}

        {cv && (
          <div className="mt-12 space-y-8">
            <VistaPreviaCVOptimizada cv={cv} datos={datos} />
            <BotonDescargarPDFOptimizado cv={cv} datos={datos} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AppOptimizado;
