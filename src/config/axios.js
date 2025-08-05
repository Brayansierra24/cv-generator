import axios from 'axios';

// Configuración base para todas las peticiones
const baseConfig = {
  baseURL: 'http://localhost:8000',
  withCredentials: true, // CRÍTICO: Permite envío de cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // Requerido por Laravel
  },
};

// Instancia principal de Axios con CSRF
const api = axios.create(baseConfig);

// Instancia para generación de CV (también con CSRF para consistencia)
const cvApi = axios.create(baseConfig);

// Variable para controlar si ya se obtuvo el token CSRF
let csrfTokenInitialized = false;

// Función para inicializar el token CSRF
const initializeCsrfToken = async () => {
  if (csrfTokenInitialized) return;
  
  try {
    console.log('🔐 Inicializando token CSRF...');
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true
    });
    csrfTokenInitialized = true;
    console.log('✅ Token CSRF inicializado correctamente');
  } catch (error) {
    console.error('❌ Error obteniendo CSRF token:', error);
    csrfTokenInitialized = false;
    throw error;
  }
};

// Función para obtener el token CSRF desde las cookies
const getCsrfTokenFromCookie = () => {
  const name = 'XSRF-TOKEN';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return null;
};

// Interceptor de request para ambas instancias
const requestInterceptor = async (config) => {
  // Inicializar CSRF token si no se ha hecho
  if (!csrfTokenInitialized) {
    await initializeCsrfToken();
  }
  
  // Para peticiones que modifican datos, agregar el token CSRF
  if (['post', 'put', 'delete', 'patch'].includes(config.method?.toLowerCase())) {
    const csrfToken = getCsrfTokenFromCookie();
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
      console.log('🔑 Token CSRF agregado a la petición:', config.url);
    } else {
      console.warn('⚠️ No se encontró token CSRF en las cookies');
      // Intentar obtener el token nuevamente
      await initializeCsrfToken();
      const newCsrfToken = getCsrfTokenFromCookie();
      if (newCsrfToken) {
        config.headers['X-XSRF-TOKEN'] = newCsrfToken;
      }
    }
  }
  
  return config;
};

// Interceptor de response para manejar errores CSRF
const responseInterceptor = {
  success: (response) => response,
  error: async (error) => {
    if (error.response?.status === 419) {
      console.error('❌ Error 419: Token CSRF inválido o expirado');
      
      // Resetear el estado del token CSRF
      csrfTokenInitialized = false;
      
      // Intentar obtener un nuevo token
      try {
        await initializeCsrfToken();
        
        // Reintentar la petición original con el nuevo token
        const originalRequest = error.config;
        const newCsrfToken = getCsrfTokenFromCookie();
        
        if (newCsrfToken && !originalRequest._retry) {
          originalRequest._retry = true;
          originalRequest.headers['X-XSRF-TOKEN'] = newCsrfToken;
          console.log('🔄 Reintentando petición con nuevo token CSRF');
          return axios(originalRequest);
        }
      } catch (retryError) {
        console.error('❌ Error al reintentar con nuevo token CSRF:', retryError);
      }
    }
    
    return Promise.reject(error);
  }
};

// Aplicar interceptors a ambas instancias
api.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));
api.interceptors.response.use(responseInterceptor.success, responseInterceptor.error);

cvApi.interceptors.request.use(requestInterceptor, (error) => Promise.reject(error));
cvApi.interceptors.response.use(responseInterceptor.success, responseInterceptor.error);

// Función de utilidad para inicializar la aplicación
export const initializeApp = async () => {
  try {
    await initializeCsrfToken();
    console.log('🚀 Aplicación inicializada correctamente');
  } catch (error) {
    console.error('❌ Error inicializando la aplicación:', error);
    throw error;
  }
};

export { api as default, cvApi }; 