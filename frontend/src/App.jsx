import React, { useEffect, useState, useCallback } from 'react'
import init, { grayscale_filter, negative_filter, sepia_filter } from './wasm/img_processing.js';
import { useDropzone } from 'react-dropzone';
import StudentCard from './components/student-card.jsx';
import HeroSection from './components/HeroSection.jsx';
import { FiUploadCloud } from 'react-icons/fi';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [wasmInitialized, setWasmInitialized] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  const handleGrayscale = async () => {
    if (!uploadedImage) return;

    const fileType = uploadedFile.type;
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    if (!wasmInitialized) {
      await init();
      setWasmInitialized(true);
    }

    const result = grayscale_filter(uint8Array);

    const newBlob = new Blob([result], { type: fileType || 'image/jpeg' });
    const newImageUrl = URL.createObjectURL(newBlob);
    setNewImageUrl(newImageUrl);
    setNewImageFile(newBlob);
  }

  const handleInvertColors = async () => {
    if (!uploadedImage) return;

    const fileType = uploadedFile.type;
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    if (!wasmInitialized) {
      await init();
      setWasmInitialized(true);
    }

    const result = negative_filter(uint8Array);

    const newBlob = new Blob([result], { type: fileType || 'image/jpeg' });
    const newImageUrl = URL.createObjectURL(newBlob);
    setNewImageUrl(newImageUrl);
    setNewImageFile(newBlob);
  }

  const handleSepia = async () => {
    if (!uploadedImage) return;

    const fileType = uploadedFile.type;
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    if (!wasmInitialized) {
      await init();
      setWasmInitialized(true);
    }

    const result = sepia_filter(uint8Array);

    const newBlob = new Blob([result], { type: fileType || 'image/jpeg' });
    const newImageUrl = URL.createObjectURL(newBlob);
    setNewImageUrl(newImageUrl);
    setNewImageFile(newBlob);
  }
  
  const handleRemoveImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
      setUploadedImage(null);
      setUploadedFile(null);
      setNewImageUrl(null);
      setNewImageFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <HeroSection />

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestro Equipo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StudentCard
              image="https://via.placeholder.com/200"
              name="Estudiante 1"
              role="Desarrollador Frontend"
            />
            <StudentCard
              image="https://via.placeholder.com/200"
              name="Estudiante 2"
              role="Desarrollador Backend"
            />
            <StudentCard
              image="https://via.placeholder.com/200"
              name="Estudiante 3"
              role="Diseñador UI/UX"
            />
          </div>
        </div>
      </section>

      {/* Image Upload Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Modificador de Imágenes</h2>
    

          <div className="max-w-2xl mx-auto">

            { uploadedImage == null && (
            <div
              {...getRootProps()}
              className={`upload-zone border-2 border-dashed p-8 rounded-xl text-center cursor-pointer transition-all duration-300 
                 ${isDragActive ? 'border-blue-500' : 'border-gray-300 bg-white hover:bg-gray-50'} h-80`}
            >
              <FiUploadCloud className="text-6xl text-blue-400 mb-4" />
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-xl text-blue-500 font-semibold">Suelta la imagen aquí...</p>
              ) : (
                <p className="text-xl text-gray-500 font-semibold">Arrastra una imagen aquí o haz clic para seleccionar</p>
              )}
            </div> )}


            {uploadedImage && (
              <div className="mt-8 text-center grid">
                <img
                  src={uploadedImage}
                  alt="Uploaded preview"
                  className="max-w-full h-auto mx-auto rounded-lg shadow-lg"
                />
                {newImageUrl && (
                  <img
                    src={newImageUrl}
                    alt="Processed preview"
                    className="max-w-full h-auto mx-auto mt-4 rounded-lg shadow-lg"
                  />
                )}
                <div className='flex flex-row justify-between'>
                  <button onClick={handleGrayscale}
                  className="mt-4 gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Cambiar a escala de grises
                  </button>
                  <button onClick={handleInvertColors}
                  className="mt-4 gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Invertir colores
                  </button>
                  <button onClick={handleSepia}
                  className="mt-4 gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Aplicar Sepia
                  </button>
                </div>
                <button onClick={handleRemoveImage}
                 className="mt-4 gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Quitar Imagen
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;