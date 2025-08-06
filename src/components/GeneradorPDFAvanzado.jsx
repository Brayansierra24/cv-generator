import React, { useCallback, memo, useState } from 'react';
import { jsPDF } from 'jspdf';

// Configuración de fuentes personalizadas y mejoras visuales
const FONT_CONFIG = {
  sizes: {
    title: { moderna: 28, clasica: 24, creativa: 30 },
    subtitle: { moderna: 16, clasica: 14, creativa: 18 },
    section: { moderna: 14, clasica: 12, creativa: 15 },
    text: { moderna: 11, clasica: 10, creativa: 11 },
    small: { moderna: 9, clasica: 8, creativa: 9 }
  },
  lineHeight: {
    title: 1.2,
    subtitle: 1.3,
    section: 1.4,
    text: 1.5,
    small: 1.4
  }
};

// Utilidades avanzadas para PDF
const PDFUtils = {
  // Crear gradientes simulados con múltiples rectángulos
  createGradient: (doc, x, y, width, height, color1, color2, steps = 10) => {
    for (let i = 0; i < steps; i++) {
      const ratio = i / (steps - 1);
      const r = Math.round(color1[0] * (1 - ratio) + color2[0] * ratio);
      const g = Math.round(color1[1] * (1 - ratio) + color2[1] * ratio);
      const b = Math.round(color1[2] * (1 - ratio) + color2[2] * ratio);
      
      doc.setFillColor(r, g, b);
      doc.rect(x, y + (i * height / steps), width, height / steps, 'F');
    }
  },
  
  // Crear sombras simuladas
  createShadow: (doc, x, y, width, height, blur = 2) => {
    for (let i = 0; i < blur; i++) {
      const alpha = 0.1 - (i * 0.02);
      doc.setFillColor(0, 0, 0);
      doc.setGState(doc.GState({ opacity: alpha }));
      doc.rect(x + i, y + i, width, height, 'F');
    }
    doc.setGState(doc.GState({ opacity: 1 })); // Reset opacity
  },
  
  // Texto con mejor formato y espaciado
  addFormattedText: (doc, text, x, y, maxWidth, fontSize, lineHeight = 1.5) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    let currentY = y;
    
    lines.forEach((line, index) => {
      if (currentY > 280) return; // Evitar overflow
      doc.text(line, x, currentY);
      currentY += fontSize * lineHeight;
    });
    
    return currentY;
  },
  
  // Crear iconos SVG simulados con formas básicas
  drawIcon: (doc, type, x, y, size = 4) => {
    doc.setLineWidth(0.5);
    switch (type) {
      case 'briefcase':
        doc.rect(x, y, size, size * 0.7, 'S');
        doc.rect(x + size * 0.2, y - size * 0.2, size * 0.6, size * 0.2, 'S');
        break;
      case 'graduation':
        doc.circle(x + size/2, y + size/2, size/2, 'S');
        doc.line(x, y + size, x + size, y);
        break;
      case 'star':
        // Estrella simplificada
        doc.circle(x + size/2, y + size/2, size/3, 'F');
        break;
      case 'globe':
        doc.circle(x + size/2, y + size/2, size/2, 'S');
        doc.line(x, y + size/2, x + size, y + size/2);
        break;
      case 'code':
        doc.rect(x, y, size, size * 0.8, 'S');
        doc.line(x + size * 0.2, y + size * 0.2, x + size * 0.8, y + size * 0.6);
        break;
    }
  }
};

const GeneradorPDFAvanzado = memo(function GeneradorPDFAvanzado({ 
  datos, 
  plantilla = 'moderna', 
  seccionesOpcionales = {},
  seccionesActivas = []
}) {
  const [isGenerating, setIsGenerating] = useState(false);

  // Configuraciones de plantillas
  const plantillasConfig = {
    moderna: {
      colores: {
        primary: [67, 56, 202], // Indigo
        secondary: [99, 102, 241], // Blue
        accent: [16, 185, 129], // Emerald
        text: [31, 41, 55], // Gray-800
        light: [243, 244, 246] // Gray-100
      },
      fuentes: {
        titulo: { size: 24, style: 'bold' },
        subtitulo: { size: 14, style: 'normal' },
        seccion: { size: 12, style: 'bold' },
        texto: { size: 10, style: 'normal' }
      }
    },
    clasica: {
      colores: {
        primary: [31, 41, 55], // Gray-800
        secondary: [55, 65, 81], // Gray-700
        accent: [107, 114, 128], // Gray-500
        text: [17, 24, 39], // Gray-900
        light: [249, 250, 251] // Gray-50
      },
      fuentes: {
        titulo: { size: 22, style: 'bold' },
        subtitulo: { size: 12, style: 'normal' },
        seccion: { size: 11, style: 'bold' },
        texto: { size: 9, style: 'normal' }
      }
    },
    creativa: {
      colores: {
        primary: [124, 58, 237], // Purple
        secondary: [236, 72, 153], // Pink
        accent: [245, 158, 11], // Amber
        text: [31, 41, 55], // Gray-800
        light: [253, 244, 255] // Purple-50
      },
      fuentes: {
        titulo: { size: 26, style: 'bold' },
        subtitulo: { size: 15, style: 'normal' },
        seccion: { size: 13, style: 'bold' },
        texto: { size: 10, style: 'normal' }
      }
    }
  };

  const generarPDFModerno = useCallback((doc, config) => {
    const { colores } = config;
    const fonts = FONT_CONFIG.sizes[plantilla] || FONT_CONFIG.sizes.moderna;
    let yPosition = 20;

    // === HEADER MODERNO MEJORADO ===
    // Fondo principal con gradiente
    PDFUtils.createGradient(doc, 0, 0, 210, 55, colores.primary, colores.secondary, 15);
    
    // Sombra del header
    PDFUtils.createShadow(doc, 0, 52, 210, 3, 3);
    
    // Decoración lateral izquierda
    doc.setFillColor(...colores.accent);
    doc.circle(15, 25, 8, 'F');
    doc.setFillColor(255, 255, 255, 0.3);
    doc.circle(15, 25, 5, 'F');
    
    // Decoración lateral derecha
    doc.setFillColor(...colores.accent);
    doc.rect(185, 15, 20, 3, 'F');
    doc.rect(185, 20, 15, 3, 'F');
    doc.rect(185, 25, 25, 3, 'F');

    // Nombre principal con mejor tipografía
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(fonts.title);
    doc.setFont('helvetica', 'bold');
    const nombreTexto = (datos?.nombre || 'NOMBRE COMPLETO').toUpperCase();
    doc.text(nombreTexto, 105, 28, { align: 'center' });

    // Cargo deseado con estilo mejorado
    doc.setFontSize(fonts.subtitle);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255, 0.9);
    doc.text(datos?.cargo_deseado || 'Cargo Profesional', 105, 40, { align: 'center' });

    // Líneas decorativas múltiples
    doc.setDrawColor(255, 255, 255, 0.8);
    doc.setLineWidth(1);
    doc.line(70, 45, 140, 45);
    doc.setLineWidth(2);
    doc.line(80, 47, 130, 47);

    yPosition = 70;

    // === LAYOUT DE DOS COLUMNAS ===
    const leftX = 20;
    const rightX = 115;
    const columnWidth = 80;
    let leftY = yPosition;
    let rightY = yPosition;

    // Función para crear secciones con estilo moderno mejorado
    const createModernSection = (title, content, x, y, width = columnWidth, iconType = null) => {
      // Fondo de sección con gradiente sutil
      PDFUtils.createGradient(doc, x - 8, y - 8, width + 16, 12, 
        [...colores.light, 0.3], [...colores.primary, 0.1], 5);
      
      // Sombra de la sección
      PDFUtils.createShadow(doc, x - 6, y - 6, width + 12, 8, 1);
      
      // Icono de la sección
      if (iconType) {
        doc.setFillColor(...colores.accent);
        PDFUtils.drawIcon(doc, iconType, x - 2, y - 4, 4);
      }

      // Título con mejor tipografía
      doc.setTextColor(...colores.primary);
      doc.setFontSize(fonts.section);
      doc.setFont('helvetica', 'bold');
      const titleX = iconType ? x + 8 : x;
      doc.text(title.toUpperCase(), titleX, y);

      // Línea decorativa con gradiente simulado
      doc.setDrawColor(...colores.accent);
      doc.setLineWidth(2);
      doc.line(titleX, y + 2, titleX + width - (iconType ? 8 : 0), y + 2);
      
      // Línea secundaria más sutil
      doc.setDrawColor(...colores.secondary);
      doc.setLineWidth(0.5);
      doc.line(titleX, y + 3, titleX + (width - (iconType ? 8 : 0)) * 0.7, y + 3);

      // Contenido con mejor formato
      doc.setTextColor(...colores.text);
      doc.setFontSize(fonts.text);
      doc.setFont('helvetica', 'normal');

      const currentY = PDFUtils.addFormattedText(
        doc, content, titleX, y + 10, width - (iconType ? 8 : 0), 
        fonts.text, FONT_CONFIG.lineHeight.text
      );

      return currentY + 8;
    };

    // === COLUMNA IZQUIERDA ===
    if (datos?.experiencia) {
      leftY = createModernSection('EXPERIENCIA PROFESIONAL', datos.experiencia, leftX, leftY, columnWidth, 'briefcase');
    }

    if (datos?.educacion) {
      leftY = createModernSection('EDUCACIÓN', datos.educacion, leftX, leftY, columnWidth, 'graduation');
    }

    // === COLUMNA DERECHA ===
    if (datos?.habilidades) {
      rightY = createModernSection('HABILIDADES', datos.habilidades, rightX, rightY, columnWidth, 'star');
    }

    // === SECCIONES OPCIONALES MEJORADAS ===
    const procesarSeccionesOpcionales = (startY) => {
      let currentY = startY;
      let useLeftColumn = true; // Alternar columnas para mejor distribución

      seccionesActivas.forEach(seccionId => {
        const seccionData = seccionesOpcionales[seccionId];
        if (!seccionData) return;

        const columnX = useLeftColumn ? leftX : rightX;
        const columnWidth = useLeftColumn ? 85 : 75;

        switch (seccionId) {
          case 'redes_sociales':
            const redes = Object.entries(seccionData)
              .filter(([key, value]) => value && value.trim())
              .map(([key, value]) => {
                const platform = key.charAt(0).toUpperCase() + key.slice(1);
                return `${platform}: ${value}`;
              })
              .join('\n');
            if (redes) {
              currentY = createModernSection('REDES SOCIALES', redes, columnX, currentY, columnWidth, 'globe');
            }
            break;

          case 'habilidades_tecnicas':
            const habilidadesTec = Object.entries(seccionData)
              .filter(([key, value]) => value && value.trim())
              .map(([key, value]) => {
                const category = key.replace('_', ' ').toUpperCase();
                return `${category}:\n${value}`;
              })
              .join('\n\n');
            if (habilidadesTec) {
              currentY = createModernSection('HABILIDADES TÉCNICAS', habilidadesTec, columnX, currentY, columnWidth, 'code');
            }
            break;

          case 'proyectos':
            const proyectos = Object.entries(seccionData)
              .filter(([key, value]) => value && value.trim())
              .map(([key, value], index) => `${index + 1}. ${value}`)
              .join('\n\n');
            if (proyectos) {
              currentY = createModernSection('PROYECTOS DESTACADOS', proyectos, columnX, currentY, columnWidth, 'briefcase');
            }
            break;

          case 'idiomas':
            const idiomas = Object.entries(seccionData)
              .filter(([key, value]) => value && value.trim())
              .map(([key, value]) => `• ${value}`)
              .join('\n');
            if (idiomas) {
              currentY = createModernSection('IDIOMAS', idiomas, columnX, currentY, columnWidth, 'globe');
            }
            break;

          case 'certificaciones':
            const certificaciones = Object.entries(seccionData)
              .filter(([key, value]) => value && value.trim())
              .map(([key, value]) => `✓ ${value}`)
              .join('\n');
            if (certificaciones) {
              currentY = createModernSection('CERTIFICACIONES', certificaciones, columnX, currentY, columnWidth, 'star');
            }
            break;
        }
        
        useLeftColumn = !useLeftColumn; // Alternar columnas
      });

      return currentY;
    };

    // Procesar secciones opcionales
    const finalY = Math.max(leftY, rightY);
    procesarSeccionesOpcionales(finalY);

    return doc;
  }, []);

  const generarPDFClasico = useCallback((doc, config) => {
    const { colores, fuentes } = config;
    let yPosition = 30;

    // === HEADER CLÁSICO ===
    doc.setTextColor(...colores.primary);
    doc.setFontSize(fuentes.titulo.size);
    doc.setFont('helvetica', fuentes.titulo.style);
    doc.text(datos?.nombre || 'NOMBRE COMPLETO', 105, yPosition, { align: 'center' });

    yPosition += 10;
    doc.setFontSize(fuentes.subtitulo.size);
    doc.setFont('helvetica', fuentes.subtitulo.style);
    doc.text(datos?.cargo_deseado || 'Cargo Profesional', 105, yPosition, { align: 'center' });

    // Línea horizontal clásica
    yPosition += 8;
    doc.setDrawColor(...colores.accent);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);

    yPosition += 15;

    // Función para secciones clásicas
    const createClassicSection = (title, content, y) => {
      doc.setTextColor(...colores.primary);
      doc.setFontSize(fuentes.seccion.size);
      doc.setFont('helvetica', fuentes.seccion.style);
      doc.text(title, 20, y);

      // Línea bajo el título
      doc.setDrawColor(...colores.accent);
      doc.line(20, y + 2, 190, y + 2);

      doc.setTextColor(...colores.text);
      doc.setFontSize(fuentes.texto.size);
      doc.setFont('helvetica', fuentes.texto.style);

      const lines = doc.splitTextToSize(content, 170);
      let currentY = y + 8;
      
      lines.forEach(line => {
        doc.text(line, 20, currentY);
        currentY += 5;
      });

      return currentY + 8;
    };

    // Secciones principales
    if (datos?.experiencia) {
      yPosition = createClassicSection('EXPERIENCIA PROFESIONAL', datos.experiencia, yPosition);
    }

    if (datos?.educacion) {
      yPosition = createClassicSection('EDUCACIÓN', datos.educacion, yPosition);
    }

    if (datos?.habilidades) {
      yPosition = createClassicSection('HABILIDADES', datos.habilidades, yPosition);
    }

    // Secciones opcionales en formato clásico
    seccionesActivas.forEach(seccionId => {
      const seccionData = seccionesOpcionales[seccionId];
      if (!seccionData) return;

      const contenido = Object.entries(seccionData)
        .filter(([key, value]) => value && value.trim())
        .map(([key, value]) => `${key.replace('_', ' ')}: ${value}`)
        .join('\n');

      if (contenido) {
        const titulos = {
          'redes_sociales': 'REDES SOCIALES',
          'habilidades_tecnicas': 'HABILIDADES TÉCNICAS',
          'proyectos': 'PROYECTOS DESTACADOS',
          'idiomas': 'IDIOMAS',
          'certificaciones': 'CERTIFICACIONES'
        };
        
        yPosition = createClassicSection(titulos[seccionId] || seccionId.toUpperCase(), contenido, yPosition);
      }
    });

    return doc;
  }, []);

  const generarPDFCreativo = useCallback((doc, config) => {
    const { colores, fuentes } = config;

    // === HEADER CREATIVO CON FORMAS ===
    // Fondo principal
    doc.setFillColor(...colores.primary);
    doc.rect(0, 0, 210, 60, 'F');

    // Formas decorativas
    doc.setFillColor(...colores.secondary);
    doc.circle(190, 15, 20, 'F');
    doc.setFillColor(...colores.accent);
    doc.circle(25, 45, 15, 'F');

    // Nombre con estilo creativo
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(fuentes.titulo.size);
    doc.setFont('helvetica', fuentes.titulo.style);
    doc.text(datos?.nombre || 'NOMBRE COMPLETO', 105, 25, { align: 'center' });

    doc.setFontSize(fuentes.subtitulo.size);
    doc.text(datos?.cargo_deseado || 'Cargo Profesional', 105, 40, { align: 'center' });

    // Layout asimétrico
    let leftY = 80;
    let rightY = 80;

    const createCreativeSection = (title, content, x, y, width, color) => {
      // Barra lateral colorida
      doc.setFillColor(...color);
      doc.rect(x - 8, y - 5, 4, 15, 'F');

      // Título
      doc.setTextColor(...colores.primary);
      doc.setFontSize(fuentes.seccion.size);
      doc.setFont('helvetica', fuentes.seccion.style);
      doc.text(title, x, y);

      // Contenido
      doc.setTextColor(...colores.text);
      doc.setFontSize(fuentes.texto.size);
      doc.setFont('helvetica', fuentes.texto.style);

      const lines = doc.splitTextToSize(content, width);
      let currentY = y + 8;
      
      lines.forEach(line => {
        doc.text(line, x, currentY);
        currentY += 5;
      });

      return currentY + 10;
    };

    // Secciones con colores diferentes
    if (datos?.experiencia) {
      leftY = createCreativeSection('💼 EXPERIENCIA', datos.experiencia, 20, leftY, 85, colores.primary);
    }

    if (datos?.habilidades) {
      rightY = createCreativeSection('⚡ HABILIDADES', datos.habilidades, 115, rightY, 75, colores.secondary);
    }

    if (datos?.educacion) {
      leftY = createCreativeSection('🎓 EDUCACIÓN', datos.educacion, 20, leftY, 85, colores.accent);
    }

    // Secciones opcionales creativas
    let currentY = Math.max(leftY, rightY);
    const coloresSeccion = [colores.primary, colores.secondary, colores.accent];
    let colorIndex = 0;

    seccionesActivas.forEach(seccionId => {
      const seccionData = seccionesOpcionales[seccionId];
      if (!seccionData) return;

      const contenido = Object.entries(seccionData)
        .filter(([key, value]) => value && value.trim())
        .map(([key, value]) => `• ${value}`)
        .join('\n');

      if (contenido) {
        const titulos = {
          'redes_sociales': '🌐 REDES SOCIALES',
          'habilidades_tecnicas': '💻 TECH SKILLS',
          'proyectos': '🚀 PROYECTOS',
          'idiomas': '🌍 IDIOMAS',
          'certificaciones': '🏆 CERTIFICACIONES'
        };
        
        const x = colorIndex % 2 === 0 ? 20 : 115;
        const width = colorIndex % 2 === 0 ? 85 : 75;
        
        currentY = createCreativeSection(
          titulos[seccionId] || seccionId.toUpperCase(), 
          contenido, 
          x, 
          currentY, 
          width, 
          coloresSeccion[colorIndex % 3]
        );
        
        colorIndex++;
      }
    });

    return doc;
  }, []);

  const handleDescargar = useCallback(async () => {
    setIsGenerating(true);
    
    try {
      // Simular tiempo de procesamiento para UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      
      const config = plantillasConfig[plantilla] || plantillasConfig.moderna;

      // Agregar metadatos al PDF
      doc.setProperties({
        title: `CV - ${datos?.nombre || 'Curriculum Vitae'}`,
        subject: `Curriculum Vitae de ${datos?.nombre || 'Profesional'}`,
        author: datos?.nombre || 'Usuario',
        creator: 'CV Generator Pro',
        producer: 'CV Generator Pro - Generador de CV Profesional',
        keywords: `cv, curriculum, ${datos?.cargo_deseado || 'profesional'}, ${plantilla}`,
        creationDate: new Date()
      });

      // Generar PDF según la plantilla seleccionada
      switch (plantilla) {
        case 'clasica':
          generarPDFClasico(doc, config);
          break;
        case 'creativa':
          generarPDFCreativo(doc, config);
          break;
        case 'moderna':
        default:
          generarPDFModerno(doc, config);
          break;
      }

      // Generar nombre de archivo inteligente
      const fecha = new Date().toISOString().split('T')[0];
      const nombreLimpio = (datos?.nombre || 'MiCV')
        .replace(/[^a-zA-Z0-9À-ſ\s]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 20);
      const nombreArchivo = `CV_${nombreLimpio}_${plantilla}_${fecha}.pdf`;
      
      // Descargar el PDF
      doc.save(nombreArchivo);
      
      // Feedback de éxito
      console.log(`✅ PDF generado exitosamente: ${nombreArchivo}`);
      
    } catch (error) {
      console.error('❌ Error al generar PDF:', error);
      
      // Manejo de errores más detallado
      let mensajeError = 'Error desconocido al generar el PDF.';
      
      if (error.message.includes('jsPDF')) {
        mensajeError = 'Error en la generación del PDF. Verifica que todos los campos estén completos.';
      } else if (error.message.includes('memory')) {
        mensajeError = 'Error de memoria. Intenta reducir el contenido o usar una plantilla más simple.';
      } else if (error.message.includes('network')) {
        mensajeError = 'Error de conexión. Verifica tu conexión a internet.';
      }
      
      alert(`⚠️ ${mensajeError}\n\nDetalles técnicos: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  }, [datos, plantilla, seccionesOpcionales, seccionesActivas, plantillasConfig, generarPDFModerno, generarPDFClasico, generarPDFCreativo]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="group relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
        <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mr-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-slate-800">Descargar CV Premium</h3>
                <p className="text-slate-600">Plantilla: <span className="font-semibold capitalize">{plantilla}</span></p>
              </div>
            </div>

            {/* Información de secciones incluidas */}
            {seccionesActivas.length > 0 && (
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-800 font-medium">
                  ✨ Incluye {seccionesActivas.length} sección{seccionesActivas.length !== 1 ? 'es' : ''} adicional{seccionesActivas.length !== 1 ? 'es' : ''}
                </p>
              </div>
            )}

            <button
              onClick={handleDescargar}
              disabled={isGenerating}
              className={`group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 rounded-xl focus:outline-none focus:ring-4 shadow-lg transform ${
                isGenerating 
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:ring-green-500/50 hover:shadow-xl hover:scale-105'
              }`}
            >
              {isGenerating ? (
                <>
                  <svg className="w-6 h-6 mr-3 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generando PDF...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-3 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Descargar PDF Premium
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </>
              )}
            </button>

            <p className="mt-4 text-sm text-slate-600">
              Tu CV se descargará en formato PDF optimizado para ATS y reclutadores
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default GeneradorPDFAvanzado;
