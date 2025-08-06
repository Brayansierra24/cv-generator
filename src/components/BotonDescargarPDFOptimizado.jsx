import React, { useCallback, memo } from 'react';
import { jsPDF } from 'jspdf';

const BotonDescargarPDFOptimizado = memo(function BotonDescargarPDFOptimizado({ cv, datos }) {
  // Memoizar la función de descarga para evitar recreaciones
  const handleDescargar = useCallback(() => {
    try {
      const doc = new jsPDF();
      
      // Colores del tema
      const primaryColor = [67, 56, 202]; // Indigo
      const secondaryColor = [99, 102, 241]; // Blue
      const accentColor = [16, 185, 129]; // Emerald
      const textColor = [31, 41, 55]; // Gray-800
      const lightGray = [243, 244, 246]; // Gray-100
      
      // === HEADER SECTION ===
      // Fondo del header
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 45, 'F');
      
      // Nombre principal
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text(datos?.nombre || 'NOMBRE COMPLETO', 105, 20, { align: 'center' });
      
      // Cargo deseado
      doc.setFontSize(14);
      doc.setFont('helvetica', 'normal');
      doc.text(datos?.cargo_deseado || 'Cargo Profesional', 105, 30, { align: 'center' });
      
      // Línea decorativa
      doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.setLineWidth(2);
      doc.line(60, 35, 150, 35);
      
      // === LAYOUT DE DOS COLUMNAS ===
      let leftY = 60;
      let rightY = 60;
      const leftX = 20;
      const rightX = 115;
      const columnWidth = 80;
      
      // Función para crear secciones con estilo
      const createSection = (title, content, x, y, isLeft = true) => {
        // Título de la sección
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(title.toUpperCase(), x, y);
        
        // Línea bajo el título
        doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2]);
        doc.setLineWidth(1);
        doc.line(x, y + 2, x + (isLeft ? 85 : 75), y + 2);
        
        // Contenido
        doc.setTextColor(textColor[0], textColor[1], textColor[2]);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        const lines = doc.splitTextToSize(content || 'No especificado', columnWidth);
        doc.text(lines, x, y + 8);
        
        return y + 8 + (lines.length * 4) + 12;
      };
      
      // === COLUMNA IZQUIERDA ===
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('INFORMACIÓN PERSONAL', leftX, 55);
      
      // Información personal con iconos
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      if (datos?.email) {
        doc.text('✉ Email:', leftX, leftY);
        doc.text(datos.email, leftX + 15, leftY);
        leftY += 6;
      }
      
      if (datos?.telefono) {
        doc.text('📱 Teléfono:', leftX, leftY);
        doc.text(datos.telefono, leftX + 20, leftY);
        leftY += 6;
      }
      
      if (datos?.ubicacion) {
        doc.text('📍 Ubicación:', leftX, leftY);
        doc.text(datos.ubicacion, leftX + 22, leftY);
        leftY += 6;
      }
      
      leftY += 10;
      
      // Habilidades
      leftY = createSection('🚀 Habilidades', datos?.habilidades, leftX, leftY, true);
      
      // Idiomas
      if (datos?.idiomas) {
        leftY = createSection('🌍 Idiomas', datos?.idiomas, leftX, leftY, true);
      }
      
      // === COLUMNA DERECHA ===
      // Experiencia Laboral
      rightY = createSection('💼 Experiencia Laboral', datos?.experiencia, rightX, rightY, false);
      
      // Educación
      rightY = createSection('🎓 Educación', datos?.educacion, rightX, rightY, false);
      
      // Proyectos (si existe)
      if (datos?.proyectos) {
        rightY = createSection('🔧 Proyectos', datos?.proyectos, rightX, rightY, false);
      }
      
      // === FOOTER ===
      const pageHeight = doc.internal.pageSize.height;
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.rect(0, pageHeight - 20, 210, 20, 'F');
      
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.text('Currículum generado con IA - ' + new Date().toLocaleDateString(), 105, pageHeight - 10, { align: 'center' });
      
      // === ELEMENTOS DECORATIVOS ===
      // Círculos decorativos
      doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      doc.circle(200, 50, 3, 'F');
      doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.circle(195, 55, 2, 'F');
      doc.circle(205, 45, 1.5, 'F');
      
      // Generar nombre de archivo seguro
      const nombreArchivo = datos?.nombre 
        ? `CV_${datos.nombre.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
        : 'CV_usuario.pdf';
      
      // Guardar el PDF
      doc.save(nombreArchivo);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
    }
  }, [cv, datos]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="card-body">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 mb-6">
              <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
              ¡Tu CV está listo!
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Descarga tu currículum profesional en formato PDF, listo para enviar a empleadores.
            </p>
            
            <button
              className="btn-accent text-lg py-4 px-8 w-full sm:w-auto min-w-64"
              onClick={handleDescargar}
              aria-label="Descargar currículum en formato PDF"
            >
              <span className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar CV en PDF
              </span>
            </button>
            
            <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Formato PDF profesional • Listo para imprimir
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default BotonDescargarPDFOptimizado;
