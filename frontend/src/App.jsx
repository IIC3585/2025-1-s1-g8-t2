import React, { useEffect, useState, useCallback } from 'react'
import initWasm, * as wasm from './wasm/img_processing.js'
import { useDropzone } from 'react-dropzone';
import StudentCard from './components/student-card.jsx';
import HeroSection from './components/HeroSection.jsx';
import { FiUploadCloud } from 'react-icons/fi';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
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

  const handleRemoveImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
      setUploadedImage(null);
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
                <button
                className="mt-4 gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Modificar Imagen
                </button>
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