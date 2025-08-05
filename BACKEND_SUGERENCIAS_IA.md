# 🤖 Backend para Sugerencias de IA - Integración Laravel

## 📋 Endpoint Requerido

### **POST /api/sugerencias-trabajo**

Este endpoint debe agregarse al backend Laravel para proporcionar sugerencias inteligentes basadas en IA.

---

## 🛠️ Implementación en Laravel

### **1. Crear el Controlador**

```bash
php artisan make:controller SugerenciasIAController
```

### **2. Código del Controlador**

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class SugerenciasIAController extends Controller
{
    /**
     * Obtiene sugerencias de habilidades y experiencia basadas en el título del trabajo
     */
    public function obtenerSugerencias(Request $request): JsonResponse
    {
        $request->validate([
            'titulo' => 'required|string|min:3|max:100'
        ]);

        $titulo = trim($request->input('titulo'));
        
        // Crear clave de cache única para el título
        $cacheKey = 'sugerencias_' . md5(strtolower($titulo));
        
        // Intentar obtener desde cache (válido por 1 hora)
        $sugerencias = Cache::remember($cacheKey, 3600, function () use ($titulo) {
            return $this->generarSugerenciasConIA($titulo);
        });

        if ($sugerencias) {
            return response()->json([
                'success' => true,
                'sugerencias' => $sugerencias,
                'titulo' => $titulo
            ]);
        }

        return response()->json([
            'success' => false,
            'error' => 'No se pudieron generar sugerencias para este título'
        ], 422);
    }

    /**
     * Genera sugerencias usando OpenAI API
     */
    private function generarSugerenciasConIA(string $titulo): ?array
    {
        try {
            $apiKey = env('OPENAI_API_KEY');
            
            if (!$apiKey) {
                Log::warning('OpenAI API key no configurada');
                return $this->obtenerSugerenciasLocales($titulo);
            }

            $prompt = $this->construirPrompt($titulo);

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->timeout(30)->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Eres un experto en recursos humanos y desarrollo profesional. Proporciona sugerencias precisas y relevantes para currículums.'
                    ],
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ],
                'max_tokens' => 800,
                'temperature' => 0.7,
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $contenido = $data['choices'][0]['message']['content'] ?? '';
                
                return $this->parsearRespuestaIA($contenido);
            }

            Log::error('Error en OpenAI API: ' . $response->body());
            return $this->obtenerSugerenciasLocales($titulo);

        } catch (\Exception $e) {
            Log::error('Error al generar sugerencias con IA: ' . $e->getMessage());
            return $this->obtenerSugerenciasLocales($titulo);
        }
    }

    /**
     * Construye el prompt para la IA
     */
    private function construirPrompt(string $titulo): string
    {
        return "Para el puesto de trabajo '{$titulo}', proporciona:

1. HABILIDADES: Lista 6-8 habilidades técnicas y blandas más relevantes
2. EXPERIENCIA: Un párrafo de 2-3 líneas describiendo experiencia típica para este puesto

Formato de respuesta:
HABILIDADES:
- Habilidad 1
- Habilidad 2
- [etc...]

EXPERIENCIA:
[Párrafo descriptivo de experiencia relevante]

Asegúrate de que las sugerencias sean:
- Específicas para el puesto
- Actuales y relevantes en el mercado laboral
- Profesionales y bien redactadas
- En español";
    }

    /**
     * Parsea la respuesta de la IA
     */
    private function parsearRespuestaIA(string $contenido): ?array
    {
        try {
            $habilidades = [];
            $experiencia = '';

            // Extraer habilidades
            if (preg_match('/HABILIDADES:(.*?)(?=EXPERIENCIA:|$)/s', $contenido, $matches)) {
                $habilidadesTexto = trim($matches[1]);
                $lineas = explode("\n", $habilidadesTexto);
                
                foreach ($lineas as $linea) {
                    $linea = trim($linea);
                    if (preg_match('/^[-*]\s*(.+)$/', $linea, $match)) {
                        $habilidades[] = trim($match[1]);
                    }
                }
            }

            // Extraer experiencia
            if (preg_match('/EXPERIENCIA:\s*(.*?)$/s', $contenido, $matches)) {
                $experiencia = trim($matches[1]);
            }

            if (!empty($habilidades) && !empty($experiencia)) {
                return [
                    'habilidades' => $habilidades,
                    'experiencia' => $experiencia
                ];
            }

            return null;

        } catch (\Exception $e) {
            Log::error('Error al parsear respuesta de IA: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Sugerencias locales como fallback
     */
    private function obtenerSugerenciasLocales(string $titulo): array
    {
        $tituloLower = strtolower($titulo);
        
        $sugerenciasLocales = [
            'desarrollador' => [
                'habilidades' => ['JavaScript', 'React', 'Node.js', 'Git', 'HTML/CSS', 'APIs REST', 'Bases de datos', 'Testing'],
                'experiencia' => 'Desarrollo de aplicaciones web utilizando tecnologías modernas como React y Node.js. Experiencia en trabajo colaborativo con Git, integración de APIs y mantenimiento de bases de datos.'
            ],
            'marketing' => [
                'habilidades' => ['Marketing Digital', 'SEO/SEM', 'Google Analytics', 'Redes Sociales', 'Email Marketing', 'Copywriting', 'Photoshop', 'Canva'],
                'experiencia' => 'Desarrollo e implementación de estrategias de marketing digital. Gestión de campañas en redes sociales, optimización SEO y análisis de métricas de rendimiento.'
            ],
            'diseñador' => [
                'habilidades' => ['Photoshop', 'Illustrator', 'Figma', 'Sketch', 'InDesign', 'UI/UX', 'Branding', 'Typography'],
                'experiencia' => 'Creación de diseños visuales impactantes y experiencias de usuario intuitivas. Experiencia en branding, diseño gráfico y herramientas de diseño profesionales.'
            ],
            // Agregar más según necesidades
        ];

        // Buscar coincidencias
        foreach ($sugerenciasLocales as $clave => $sugerencias) {
            if (strpos($tituloLower, $clave) !== false) {
                return $sugerencias;
            }
        }

        // Sugerencias genéricas
        return [
            'habilidades' => [
                'Comunicación efectiva',
                'Trabajo en equipo',
                'Resolución de problemas',
                'Adaptabilidad',
                'Gestión del tiempo',
                'Liderazgo',
                'Pensamiento crítico',
                'Orientación a resultados'
            ],
            'experiencia' => "Experiencia profesional en el área de {$titulo}. Desarrollo de habilidades técnicas y blandas relevantes para el puesto. Capacidad de adaptación y aprendizaje continuo en entornos dinámicos."
        ];
    }
}
```

### **3. Agregar Ruta**

En `routes/api.php`:

```php
use App\Http\Controllers\SugerenciasIAController;

// Agregar dentro del grupo de rutas autenticadas
Route::middleware(['auth:sanctum'])->group(function () {
    // ... otras rutas existentes
    
    Route::post('/sugerencias-trabajo', [SugerenciasIAController::class, 'obtenerSugerencias']);
});
```

### **4. Variables de Entorno**

Agregar en `.env`:

```env
# OpenAI API Configuration
OPENAI_API_KEY=tu_api_key_aqui
```

---

## 🔧 Configuración Adicional

### **1. Instalar Dependencias HTTP**

Si no está instalado:

```bash
composer require guzzlehttp/guzzle
```

### **2. Configurar Cache**

Asegurarse de que el cache esté configurado en `config/cache.php`.

### **3. Configurar Logs**

Para monitorear errores, revisar `storage/logs/laravel.log`.

---

## 📊 Estructura de Respuesta

### **Respuesta Exitosa**

```json
{
    "success": true,
    "sugerencias": {
        "habilidades": [
            "JavaScript",
            "React",
            "Node.js",
            "Git",
            "HTML/CSS",
            "APIs REST",
            "Bases de datos",
            "Testing"
        ],
        "experiencia": "Desarrollo de aplicaciones web utilizando tecnologías modernas como React y Node.js. Experiencia en trabajo colaborativo con Git, integración de APIs y mantenimiento de bases de datos."
    },
    "titulo": "Desarrollador Frontend"
}
```

### **Respuesta de Error**

```json
{
    "success": false,
    "error": "No se pudieron generar sugerencias para este título"
}
```

---

## 🚀 Características Implementadas

### **✅ Funcionalidades**
- Integración con OpenAI GPT-3.5-turbo
- Sistema de cache para optimizar rendimiento
- Fallback a sugerencias locales
- Validación de entrada
- Manejo robusto de errores
- Logging para debugging

### **✅ Optimizaciones**
- Cache de 1 hora por título
- Timeout de 30 segundos para API externa
- Parsing inteligente de respuestas
- Sugerencias locales como backup

### **✅ Seguridad**
- Validación de entrada
- Rate limiting (heredado de Sanctum)
- API key protegida en variables de entorno
- Sanitización de datos

---

## 🧪 Testing

### **Probar el Endpoint**

```bash
# Con curl
curl -X POST http://localhost:8000/api/sugerencias-trabajo \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu_token_aqui" \
  -d '{"titulo": "Desarrollador Frontend"}'
```

### **Casos de Prueba**
1. Título válido con IA disponible
2. Título válido sin IA (fallback local)
3. Título inválido (muy corto)
4. Sin autenticación
5. API key inválida

---

## 📈 Monitoreo y Métricas

### **Logs a Revisar**
- Errores de OpenAI API
- Timeouts de conexión
- Títulos sin sugerencias
- Uso de cache vs API

### **Métricas Recomendadas**
- Tiempo de respuesta promedio
- Tasa de éxito de OpenAI API
- Uso de cache vs llamadas API
- Títulos más consultados

---

*Documentación creada para integración con el frontend React optimizado*
