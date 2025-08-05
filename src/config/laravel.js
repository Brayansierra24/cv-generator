// Configuración específica para Laravel
export const LARAVEL_CONFIG = {
  // URLs base
  API_BASE_URL: 'http://localhost:8000',
  SANCTUM_CSRF_URL: '/sanctum/csrf-cookie',
  
  // Headers requeridos por Laravel
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  
  // Configuración de CORS
  CORS_CONFIG: {
    withCredentials: true,
    credentials: 'include',
  }
};

// Función para manejar errores de Laravel
export const handleLaravelError = (error) => {
  const response = error.response;
  
  if (!response) {
    return {
      message: 'Error de conexión. Verifica que el servidor esté funcionando.',
      type: 'connection'
    };
  }
  
  switch (response.status) {
    case 419:
      return {
        message: 'Error de autenticación CSRF. Por favor, intenta de nuevo.',
        type: 'csrf'
      };
    case 422:
      const validationErrors = response.data.errors;
      if (validationErrors) {
        const errorMessages = Object.values(validationErrors).flat();
        return {
          message: 'Errores de validación: ' + errorMessages.join(', '),
          type: 'validation',
          errors: validationErrors
        };
      }
      return {
        message: 'Error de validación en los datos.',
        type: 'validation'
      };
    case 401:
      return {
        message: 'Credenciales incorrectas.',
        type: 'auth'
      };
    case 403:
      return {
        message: 'No tienes permisos para realizar esta acción.',
        type: 'permission'
      };
    case 404:
      return {
        message: 'Recurso no encontrado.',
        type: 'not_found'
      };
    case 500:
      return {
        message: 'Error del servidor. Por favor, intenta más tarde.',
        type: 'server'
      };
    default:
      return {
        message: response.data?.message || 'Error desconocido.',
        type: 'unknown'
      };
  }
}; 