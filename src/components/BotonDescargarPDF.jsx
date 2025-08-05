import React from 'react';
import { jsPDF } from 'jspdf';

function BotonDescargarPDF({ cv, datos }) {
  const handleDescargar = () => {
    const doc = new jsPDF();
    
    // Configurar fuente y tamaño
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('CURRÍCULUM VITAE', 105, 20, { align: 'center' });
    
    // Información personal
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMACIÓN PERSONAL', 20, 40);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nombre: ${datos?.nombre || 'N/A'}`, 20, 50);
    
    // Experiencia
    doc.setFont('helvetica', 'bold');
    doc.text('EXPERIENCIA LABORAL', 20, 70);
    doc.setFont('helvetica', 'normal');
    const experienciaLines = doc.splitTextToSize(datos?.experiencia || 'N/A', 170);
    doc.text(experienciaLines, 20, 80);
    
    // Educación
    doc.setFont('helvetica', 'bold');
    doc.text('EDUCACIÓN', 20, 120);
    doc.setFont('helvetica', 'normal');
    const educacionLines = doc.splitTextToSize(datos?.educacion || 'N/A', 170);
    doc.text(educacionLines, 20, 130);
    
    // Habilidades
    doc.setFont('helvetica', 'bold');
    doc.text('HABILIDADES', 20, 170);
    doc.setFont('helvetica', 'normal');
    const habilidadesLines = doc.splitTextToSize(datos?.habilidades || 'N/A', 170);
    doc.text(habilidadesLines, 20, 180);
    
    // Guardar el PDF
    doc.save(`CV_${datos?.nombre?.replace(/\s+/g, '_') || 'usuario'}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="card-body">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 mb-6">
              <svg className="h-8 w-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            >
              <span className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar CV en PDF
              </span>
            </button>
            
            <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Formato PDF profesional • Listo para imprimir
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BotonDescargarPDF;
