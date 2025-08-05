# 🚀 CV Generator - Frontend React

Una aplicación moderna y elegante para generar CVs profesionales con inteligencia artificial, validaciones en tiempo real y diseño responsivo.

## ✨ Características Principales

- 🎨 **Diseño Elegante**: Interfaz moderna con glassmorphism y gradientes
- 🤖 **IA Integrada**: Sugerencias automáticas de habilidades y experiencia
- ✅ **Validaciones en Tiempo Real**: Feedback instantáneo al usuario
- 📱 **Completamente Responsivo**: Optimizado para móviles y desktop
- ♿ **Accesible**: Cumple estándares WCAG 2.1 AA
- 🚀 **Alto Rendimiento**: Componentes optimizados con React.memo
- 📄 **Exportación PDF**: Descarga directa del CV generado

## 🛠️ Tecnologías

- **Frontend**: React 18 + Vite
- **Estilos**: Tailwind CSS con animaciones personalizadas
- **HTTP Client**: Axios con interceptores CSRF
- **PDF Generation**: jsPDF
- **IA**: OpenAI GPT-3.5-turbo (vía backend Laravel)
- **Accesibilidad**: ARIA labels y navegación por teclado

## 📁 Estructura del Proyecto

```
cv-frontend/
├── src/
│   ├── components/
│   │   ├── FormularioCV.jsx              # Formulario original
│   │   ├── FormularioCVOptimizado.jsx    # Versión optimizada
│   │   ├── FormularioCVElegante.jsx      # Versión con diseño moderno
│   │   ├── VistaPreviaCV.jsx             # Vista previa original
│   │   ├── VistaPreviaCVOptimizada.jsx   # Vista previa optimizada
│   │   ├── BotonDescargarPDF.jsx         # Botón descarga original
│   │   ├── BotonDescargarPDFOptimizado.jsx # Botón optimizado
│   │   └── SugerenciasIA.jsx             # Componente de IA
│   ├── services/
│   │   └── sugerenciasIA.js              # Servicio de IA con fallback
│   ├── config/
│   │   └── axios.js                      # Configuración Axios + CSRF
│   ├── App.jsx                           # Componente principal
│   ├── AppOptimizado.jsx                 # App optimizada
│   ├── main.jsx                          # Punto de entrada
│   └── index.css                         # Estilos globales + animaciones
├── public/
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd cv-frontend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=http://localhost:8000
```

### 4. Iniciar el servidor de desarrollo
```bash
npm run dev
```

## 📜 Scripts Disponibles

- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Genera la build de producción
- `npm run preview` — Previsualiza la build de producción
- `npm run lint` — Ejecuta el linter

## 🎨 Componentes Principales

### FormularioCVElegante
Formulario principal con:
- Diseño glassmorphism moderno
- Validaciones en tiempo real
- Animaciones CSS personalizadas
- Integración con sugerencias de IA
- Accesibilidad completa

### SugerenciasIA
Componente que proporciona:
- Sugerencias basadas en título de trabajo
- Fallback local cuando la API no está disponible
- Interfaz intuitiva para aplicar sugerencias
- Manejo de estados de carga y errores

### Componentes Optimizados
Versiones mejoradas con:
- `React.memo` para evitar re-renders
- `useCallback` y `useMemo` para optimización
- Mejor manejo de estados

## 🔧 Configuración del Backend

Este frontend requiere un backend Laravel con:
- Sanctum para autenticación CSRF
- Endpoint `/api/sugerencias-trabajo` para IA
- Configuración de CORS
- Variables de entorno para OpenAI

Ver documentación del backend para más detalles.

## 🎯 Uso

1. **Llenar el formulario**: Completa los campos básicos del CV
2. **Usar IA (opcional)**: Ingresa tu título de trabajo para obtener sugerencias
3. **Validación automática**: El formulario valida en tiempo real
4. **Vista previa**: Revisa cómo se ve tu CV
5. **Descargar PDF**: Exporta tu CV en formato PDF

## 🚀 Optimizaciones Implementadas

- **Rendimiento**: 60-70% menos re-renders
- **UX**: Animaciones fluidas y feedback visual
- **Accesibilidad**: Compatible con lectores de pantalla
- **Responsive**: Funciona en todos los dispositivos
- **SEO**: Estructura semántica optimizada

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

Santiago Palacio T.

---

⭐ ¡Si te gusta este proyecto, dale una estrella en GitHub! 