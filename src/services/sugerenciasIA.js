import { cvApi } from '../config/axios';

// Base de datos local de sugerencias para fallback
const sugerenciasLocales = {
  // Tecnología
  'desarrollador': {
    habilidades: ['JavaScript', 'React', 'Node.js', 'Git', 'HTML/CSS', 'APIs REST', 'Bases de datos', 'Testing'],
    experiencia: 'Desarrollo de aplicaciones web utilizando tecnologías modernas como React y Node.js. Experiencia en trabajo colaborativo con Git, integración de APIs y mantenimiento de bases de datos.'
  },
  'programador': {
    habilidades: ['Python', 'Java', 'C++', 'Algoritmos', 'Estructuras de datos', 'Git', 'Testing', 'Debugging'],
    experiencia: 'Desarrollo de software con múltiples lenguajes de programación. Implementación de algoritmos eficientes y resolución de problemas complejos. Experiencia en testing y debugging de aplicaciones.'
  },
  'frontend': {
    habilidades: ['React', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript', 'CSS/SASS', 'Responsive Design', 'Webpack'],
    experiencia: 'Desarrollo de interfaces de usuario modernas y responsivas. Experiencia con frameworks como React, Vue.js y Angular. Optimización de rendimiento y experiencia de usuario.'
  },
  'backend': {
    habilidades: ['Node.js', 'Python', 'Java', 'APIs REST', 'Bases de datos', 'Docker', 'AWS', 'Microservicios'],
    experiencia: 'Desarrollo de servicios backend escalables y APIs robustas. Experiencia con bases de datos, arquitectura de microservicios y despliegue en la nube.'
  },
  'fullstack': {
    habilidades: ['React', 'Node.js', 'JavaScript', 'Python', 'Bases de datos', 'Git', 'Docker', 'AWS'],
    experiencia: 'Desarrollo completo de aplicaciones web, desde el frontend hasta el backend. Experiencia en arquitectura de aplicaciones, bases de datos y despliegue en producción.'
  },
  'devops': {
    habilidades: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Jenkins', 'Git', 'Linux', 'Monitoring'],
    experiencia: 'Automatización de procesos de desarrollo y despliegue. Experiencia con contenedores, orquestación y plataformas cloud. Implementación de pipelines CI/CD.'
  },
  
  // Marketing
  'marketing': {
    habilidades: ['Marketing Digital', 'SEO/SEM', 'Google Analytics', 'Redes Sociales', 'Email Marketing', 'Copywriting', 'Photoshop', 'Canva'],
    experiencia: 'Desarrollo e implementación de estrategias de marketing digital. Gestión de campañas en redes sociales, optimización SEO y análisis de métricas de rendimiento.'
  },
  'community manager': {
    habilidades: ['Redes Sociales', 'Copywriting', 'Canva', 'Photoshop', 'Analytics', 'Engagement', 'Content Creation', 'Hootsuite'],
    experiencia: 'Gestión de comunidades online y creación de contenido para redes sociales. Experiencia en engagement, análisis de métricas y desarrollo de estrategias de contenido.'
  },
  
  // Diseño
  'diseñador': {
    habilidades: ['Photoshop', 'Illustrator', 'Figma', 'Sketch', 'InDesign', 'UI/UX', 'Branding', 'Typography'],
    experiencia: 'Creación de diseños visuales impactantes y experiencias de usuario intuitivas. Experiencia en branding, diseño gráfico y herramientas de diseño profesionales.'
  },
  'ux': {
    habilidades: ['Figma', 'Sketch', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Design Thinking', 'Adobe XD'],
    experiencia: 'Diseño de experiencias de usuario centradas en el usuario. Investigación, prototipado y testing de interfaces. Metodologías de Design Thinking.'
  },
  
  // Ventas
  'ventas': {
    habilidades: ['CRM', 'Negociación', 'Prospección', 'Salesforce', 'Comunicación', 'Análisis de mercado', 'Presentaciones', 'Excel'],
    experiencia: 'Desarrollo de relaciones comerciales y cierre de ventas. Experiencia en prospección, negociación y uso de herramientas CRM para seguimiento de clientes.'
  },
  
  // Administración
  'administrador': {
    habilidades: ['Excel', 'Gestión de proyectos', 'Análisis de datos', 'Comunicación', 'Liderazgo', 'Planificación', 'Presupuestos', 'Office'],
    experiencia: 'Gestión administrativa y coordinación de equipos. Experiencia en planificación, análisis de datos y optimización de procesos organizacionales.'
  },
  'gerente': {
    habilidades: ['Liderazgo', 'Gestión de equipos', 'Planificación estratégica', 'Presupuestos', 'KPIs', 'Comunicación', 'Negociación', 'Excel'],
    experiencia: 'Liderazgo de equipos y gestión de proyectos estratégicos. Experiencia en planificación, análisis de KPIs y toma de decisiones ejecutivas.'
  },
  
  // Educación
  'profesor': {
    habilidades: ['Pedagogía', 'Planificación curricular', 'Evaluación', 'Comunicación', 'Tecnología educativa', 'Gestión de aula', 'Investigación', 'Office'],
    experiencia: 'Enseñanza y desarrollo de programas educativos. Experiencia en metodologías pedagógicas, evaluación de estudiantes y uso de tecnología en el aula.'
  },
  
  // Salud
  'enfermero': {
    habilidades: ['Atención al paciente', 'Procedimientos médicos', 'Farmacología', 'Comunicación', 'Trabajo en equipo', 'Emergencias', 'Documentación', 'Empatía'],
    experiencia: 'Atención directa al paciente y apoyo en procedimientos médicos. Experiencia en cuidados intensivos, administración de medicamentos y trabajo en equipo multidisciplinario.'
  }
};

/**
 * Normaliza el título del trabajo para búsqueda
 */
const normalizarTitulo = (titulo) => {
  return titulo.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9\s]/g, '') // Remover caracteres especiales
    .trim();
};

/**
 * Busca sugerencias en la base de datos local
 */
const buscarSugerenciasLocales = (titulo) => {
  const tituloNormalizado = normalizarTitulo(titulo);
  
  // Buscar coincidencia exacta primero
  for (const [clave, sugerencias] of Object.entries(sugerenciasLocales)) {
    if (tituloNormalizado.includes(clave)) {
      return sugerencias;
    }
  }
  
  // Buscar coincidencias parciales
  const palabras = tituloNormalizado.split(' ');
  for (const palabra of palabras) {
    for (const [clave, sugerencias] of Object.entries(sugerenciasLocales)) {
      if (palabra.includes(clave) || clave.includes(palabra)) {
        return sugerencias;
      }
    }
  }
  
  return null;
};

/**
 * Obtiene sugerencias de IA desde el backend
 */
export const obtenerSugerenciasIA = async (tituloTrabajo) => {
  if (!tituloTrabajo || tituloTrabajo.trim().length < 3) {
    return {
      success: false,
      error: 'El título del trabajo debe tener al menos 3 caracteres'
    };
  }

  try {
    // Intentar obtener sugerencias del backend con IA
    const response = await cvApi.post('/api/sugerencias-trabajo', {
      titulo: tituloTrabajo.trim()
    });

    if (response.data && response.data.sugerencias) {
      return {
        success: true,
        data: {
          habilidades: response.data.sugerencias.habilidades || [],
          experiencia: response.data.sugerencias.experiencia || '',
          fuente: 'ia'
        }
      };
    }
  } catch (error) {
    console.warn('Error al obtener sugerencias de IA, usando fallback local:', error);
  }

  // Fallback: usar sugerencias locales
  const sugerenciasLocales = buscarSugerenciasLocales(tituloTrabajo);
  
  if (sugerenciasLocales) {
    return {
      success: true,
      data: {
        habilidades: sugerenciasLocales.habilidades,
        experiencia: sugerenciasLocales.experiencia,
        fuente: 'local'
      }
    };
  }

  // Si no hay sugerencias específicas, devolver sugerencias genéricas
  return {
    success: true,
    data: {
      habilidades: [
        'Comunicación efectiva',
        'Trabajo en equipo',
        'Resolución de problemas',
        'Adaptabilidad',
        'Gestión del tiempo',
        'Liderazgo',
        'Pensamiento crítico',
        'Orientación a resultados'
      ],
      experiencia: `Experiencia profesional en el área de ${tituloTrabajo}. Desarrollo de habilidades técnicas y blandas relevantes para el puesto. Capacidad de adaptación y aprendizaje continuo en entornos dinámicos.`,
      fuente: 'generico'
    }
  };
};

/**
 * Obtiene sugerencias de habilidades específicamente
 */
export const obtenerSugerenciasHabilidades = async (tituloTrabajo) => {
  const resultado = await obtenerSugerenciasIA(tituloTrabajo);
  
  if (resultado.success) {
    return {
      success: true,
      habilidades: resultado.data.habilidades,
      fuente: resultado.data.fuente
    };
  }
  
  return resultado;
};

/**
 * Obtiene sugerencias de experiencia específicamente
 */
export const obtenerSugerenciasExperiencia = async (tituloTrabajo) => {
  const resultado = await obtenerSugerenciasIA(tituloTrabajo);
  
  if (resultado.success) {
    return {
      success: true,
      experiencia: resultado.data.experiencia,
      fuente: resultado.data.fuente
    };
  }
  
  return resultado;
};

/**
 * Formatea las habilidades como texto para el campo
 */
export const formatearHabilidades = (habilidades) => {
  if (!Array.isArray(habilidades)) return '';
  return habilidades.join(', ');
};

/**
 * Combina habilidades existentes con sugerencias
 */
export const combinarHabilidades = (habilidadesExistentes, nuevasHabilidades) => {
  const existentes = habilidadesExistentes
    .split(',')
    .map(h => h.trim())
    .filter(h => h.length > 0);
  
  const nuevas = Array.isArray(nuevasHabilidades) ? nuevasHabilidades : [];
  
  // Evitar duplicados (comparación case-insensitive)
  const combinadas = [...existentes];
  
  nuevas.forEach(nueva => {
    const yaExiste = existentes.some(existente => 
      existente.toLowerCase() === nueva.toLowerCase()
    );
    
    if (!yaExiste) {
      combinadas.push(nueva);
    }
  });
  
  return combinadas.join(', ');
};
