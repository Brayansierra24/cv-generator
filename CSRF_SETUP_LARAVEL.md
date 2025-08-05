# 🔐 Configuración CSRF Laravel + React

## Problema Resuelto
Error 419 "Token CSRF inválido o expirado" al hacer peticiones POST desde React a Laravel.

## ✅ Configuración del Frontend (React) - YA IMPLEMENTADA

La configuración del frontend ya está completa con las siguientes mejoras:

### Características implementadas:
- ✅ Inicialización automática del token CSRF
- ✅ Manejo inteligente de cookies
- ✅ Reintento automático en caso de error 419
- ✅ Interceptors mejorados para ambas instancias de Axios
- ✅ Indicador de carga durante la inicialización

## 🚨 Configuración Requerida en Laravel (Backend)

Para que funcione correctamente, necesitas configurar lo siguiente en tu backend Laravel:

### 1. Configuración de CORS (`config/cors.php`)

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'register', 'logout'],
    
    'allowed_methods' => ['*'],
    
    'allowed_origins' => ['http://localhost:3000', 'http://127.0.0.1:3000'],
    
    'allowed_origins_patterns' => [],
    
    'allowed_headers' => ['*'],
    
    'exposed_headers' => [],
    
    'max_age' => 0,
    
    'supports_credentials' => true, // 🔥 CRÍTICO: Debe ser true
];
```

### 2. Configuración de Sanctum (`config/sanctum.php`)

```php
<?php

return [
    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
        '%s%s',
        'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1',
        Sanctum::currentApplicationUrlWithPort()
    ))),

    'guard' => ['web'],

    'expiration' => null,

    'middleware' => [
        'verify_csrf_token' => App\Http\Middleware\VerifyCsrfToken::class,
        'encrypt_cookies' => App\Http\Middleware\EncryptCookies::class,
    ],
];
```

### 3. Variables de Entorno (`.env`)

```env
# Configuración de sesión
SESSION_DRIVER=cookie
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=localhost

# Configuración de Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000

# URL de la aplicación
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
```

### 4. Middleware CSRF (`app/Http/Middleware/VerifyCsrfToken.php`)

```php
<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     */
    protected $except = [
        // Si necesitas excluir alguna ruta específica
        // 'api/generar-cv', // Solo si es absolutamente necesario
    ];
}
```

### 5. Rutas Web (`routes/web.php`)

```php
<?php

use Illuminate\Support\Facades\Route;

// Ruta para obtener el token CSRF (ya incluida en Sanctum)
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['message' => 'CSRF cookie set']);
});

// Tus rutas de autenticación
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout']);
```

### 6. Rutas API (`routes/api.php`)

```php
<?php

use Illuminate\Support\Facades\Route;

// Rutas protegidas por CSRF
Route::middleware(['web'])->group(function () {
    Route::post('/generar-cv', [CVController::class, 'generar']);
});
```

### 7. Configuración de Sesión (`config/session.php`)

```php
<?php

return [
    'driver' => env('SESSION_DRIVER', 'file'),
    'lifetime' => env('SESSION_LIFETIME', 120),
    'expire_on_close' => false,
    'encrypt' => false,
    'files' => storage_path('framework/sessions'),
    'connection' => null,
    'table' => 'sessions',
    'store' => null,
    'lottery' => [2, 100],
    'cookie' => env(
        'SESSION_COOKIE',
        Str::slug(env('APP_NAME', 'laravel'), '_').'_session'
    ),
    'path' => '/',
    'domain' => env('SESSION_DOMAIN', 'localhost'), // 🔥 Importante
    'secure' => env('SESSION_SECURE_COOKIE', false),
    'http_only' => true,
    'same_site' => 'lax', // 🔥 Importante para CORS
];
```

## 🧪 Cómo Probar

1. **Reinicia tu servidor Laravel** después de hacer los cambios
2. **Limpia las cookies del navegador** para el dominio localhost
3. **Abre las DevTools** y ve a la pestaña Network
4. **Recarga tu aplicación React** y verifica que:
   - Se hace una petición a `/sanctum/csrf-cookie`
   - Se establece la cookie `XSRF-TOKEN`
   - Las peticiones POST incluyen el header `X-XSRF-TOKEN`

## 🔍 Debugging

Si sigues teniendo problemas, verifica en las DevTools:

### Cookies esperadas:
- `XSRF-TOKEN` - Token CSRF
- `laravel_session` - Sesión de Laravel

### Headers esperados en peticiones POST:
- `X-XSRF-TOKEN` - Token CSRF
- `X-Requested-With: XMLHttpRequest`

### Logs útiles en la consola:
- 🔐 Inicializando token CSRF...
- ✅ Token CSRF inicializado correctamente
- 🔑 Token CSRF agregado a la petición: /api/generar-cv

## 🚀 Resultado Esperado

Con esta configuración:
- ✅ No más errores 419
- ✅ Autenticación CSRF automática
- ✅ Reintento automático en caso de token expirado
- ✅ Mejor experiencia de usuario
- ✅ Seguridad mantenida

## 📞 Soporte Adicional

Si necesitas ayuda adicional, verifica:
1. Que Laravel Sanctum esté instalado: `composer require laravel/sanctum`
2. Que las migraciones estén ejecutadas: `php artisan migrate`
3. Que el middleware esté publicado: `php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"`
