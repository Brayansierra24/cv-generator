import React, { useState, useCallback, useRef } from 'react';

const FotoPerfilModule = ({ datos, onCambiarDatos, errores, camposTocados, onCampoTocado }) => {
  const [arrastrando, setArrastrando] = useState(false);
  const [previsualizando, setPrevisualizando] = useState(false);
  const fileInputRef = useRef(null);

  const fotoPerfil = datos?.fotoPerfil || null;

  const tiposArchivosPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const tamañoMaximo = 5 * 1024 * 1024; // 5MB

  const validarArchivo = useCallback((archivo) => {
    if (!tiposArchivosPermitidos.includes(archivo.type)) {
      return 'Tipo de archivo no permitido. Use JPG, PNG o WebP.';
    }
    if (archivo.size > tamañoMaximo) {
      return 'El archivo es muy grande. Máximo 5MB.';
    }
    return null;
  }, []);

  const procesarArchivo = useCallback((archivo) => {
    const error = validarArchivo(archivo);
    if (error) {
      alert(error);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fotoData = {
        archivo: archivo,
        url: e.target.result,
        nombre: archivo.name,
        tamaño: archivo.size,
        tipo: archivo.type,
        fechaSubida: new Date().toISOString()
      };
      
      onCambiarDatos('fotoPerfil', 'datos', fotoData);
    };
    reader.readAsDataURL(archivo);
  }, [validarArchivo, onCambiarDatos]);

  const handleFileSelect = useCallback((e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      procesarArchivo(archivo);
    }
  }, [procesarArchivo]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setArrastrando(false);
    
    const archivo = e.dataTransfer.files[0];
    if (archivo) {
      procesarArchivo(archivo);
    }
  }, [procesarArchivo]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setArrastrando(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setArrastrando(false);
  }, []);

  const eliminarFoto = useCallback(() => {
    onCambiarDatos('fotoPerfil', 'datos', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onCambiarDatos]);

  const abrirSelector = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const formatearTamaño = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mr-3 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Foto de Perfil</h3>
              <p className="text-slate-600 text-sm">Opción de subir o eliminar (opcional)</p>
            </div>
          </div>
          
          {fotoPerfil && (
            <button
              onClick={() => setPrevisualizando(!previsualizando)}
              className="flex items-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {previsualizando ? 'Ocultar' : 'Vista previa'}
            </button>
          )}
        </div>

        {/* Información sobre la foto */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <div className="flex items-start">
            <div className="p-1 bg-blue-500 rounded-full mr-3 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h5 className="font-semibold text-blue-800 text-sm mb-1">📸 Recomendaciones para tu foto</h5>
              <ul className="text-blue-700 text-xs leading-relaxed space-y-1">
                <li>• <strong>Profesional:</strong> Fondo neutro, vestimenta formal</li>
                <li>• <strong>Calidad:</strong> Alta resolución, buena iluminación</li>
                <li>• <strong>Formato:</strong> JPG, PNG o WebP (máx. 5MB)</li>
                <li>• <strong>Encuadre:</strong> Desde los hombros hacia arriba</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Área de subida */}
        {!fotoPerfil ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              arrastrando
                ? 'border-indigo-400 bg-indigo-50'
                : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                arrastrando ? 'bg-indigo-100' : 'bg-slate-100'
              }`}>
                <svg className={`w-8 h-8 ${arrastrando ? 'text-indigo-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-slate-700 mb-2">
                  {arrastrando ? 'Suelta la imagen aquí' : 'Sube tu foto de perfil'}
                </h4>
                <p className="text-slate-500 text-sm mb-4">
                  Arrastra y suelta una imagen o haz clic para seleccionar
                </p>
                
                <button
                  onClick={abrirSelector}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Seleccionar archivo
                </button>
              </div>
              
              <div className="text-xs text-slate-400">
                Formatos: JPG, PNG, WebP • Máximo: 5MB
              </div>
            </div>
          </div>
        ) : (
          /* Foto subida */
          <div className="space-y-6">
            {/* Vista previa */}
            {previsualizando && (
              <div className="text-center">
                <div className="inline-block p-2 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-lg">
                  <img
                    src={fotoPerfil.url}
                    alt="Foto de perfil"
                    className="w-48 h-48 object-cover rounded-xl shadow-md"
                  />
                </div>
              </div>
            )}

            {/* Información del archivo */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">{fotoPerfil.nombre}</h4>
                  <p className="text-sm text-green-600">
                    {formatearTamaño(fotoPerfil.tamaño)} • {fotoPerfil.tipo.split('/')[1].toUpperCase()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={abrirSelector}
                  className="flex items-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                  title="Cambiar foto"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Cambiar
                </button>
                <button
                  onClick={eliminarFoto}
                  className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  title="Eliminar foto"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Eliminar
                </button>
              </div>
            </div>

            {/* Input oculto para cambiar foto */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}

        {/* Nota sobre privacidad */}
        <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-start">
            <svg className="w-4 h-4 text-slate-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Privacidad:</strong> Tu foto se almacena localmente y solo se incluye en el PDF generado. 
                No se sube a ningún servidor externo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FotoPerfilModule;
