import React, { useEffect, useState, useCallback } from 'react'
import init, { grayscale_filter, negative_filter, sepia_filter, rgb_glitch_filter } from './wasm/img_processing.js';
import { useDropzone } from 'react-dropzone';
import StudentCard from './components/student-card.jsx';
import HeroSection from './components/HeroSection.jsx';
import { FiUploadCloud } from 'react-icons/fi';
import TeamSection from './components/TeamSection.jsx';
import InstructionsSection from './components/InstructionsSection.jsx';
import { Button } from './components/ui/button.jsx';

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

  const handleGlitch = async () => {
    if (!uploadedImage) return;

    const fileType = uploadedFile.type;
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    if (!wasmInitialized) {
      await init();
      setWasmInitialized(true);
    }

    const result = rgb_glitch_filter(uint8Array);

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

  const handleDownloadImage = () => {
    if (newImageUrl) {
      const link = document.createElement('a');
      link.href = newImageUrl;
      // Regex para reemplazar la extensión del archivo original por la nueva entregado por copilot
      link.download = `${uploadedFile.name.replace(/\.[^/.]+$/, '')}_edited${uploadedFile.name.match(/\.[^/.]+$/)?.[0] || '.jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      {/* Hero Section */}
      <HeroSection />

      <TeamSection />

      <InstructionsSection />

      {/* Image Upload Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text text-white">Modificador de Imágenes</h2>
    

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
                <div className=" grid grid-cols-2 justify-center gap-3">
                  <Button variant="outline"
                  onClick={handleGrayscale}
                  className="mt-4 gap-2 text-white bg-zinc-400 whitespace-normal break-words
                  transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-grey-700">
                   Cambiar a escala de grises
                  </Button>
                  <Button variant= "outline"
                  onClick={handleInvertColors}
                  className="mt-4 gap-2 text-white bg-zinc-400 whitespace-normal break-words
                  transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-lime-500 hover:bg-lime-300">
                    Invertir colores
                  </Button>
                  <Button 
                  onClick={handleSepia} variant= "outline"
                  className="mt-4 gap-2 text-white bg-zinc-400 whitespace-normal break-words
                  transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-amber-300 hover:bg-yellow-300">
                    Aplicar Sepia
                  </Button>
                  <Button variant= "outline"
                  onClick={handleGlitch}
                  className="mt-4 gap-2 text-white bg-zinc-400 transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-700 hover:bg-blue-600">
                    Glitch RGB
                  </Button>
                  <Button variant= "outline"
                  onClick={handleRemoveImage}
                  className="mt-4 gap-2 text-white bg-zinc-400 transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-rose-700 hover:bg-rose-400">
                    Quitar Imagen
                  </Button>
                </div>
                {(newImageUrl && newImageFile) && (
                  <div className="mt-4 text-center">
                  <Button variant= "outline"
                    onClick={handleDownloadImage}
                    className="mt-4 gap-2 text-white bg-zinc-400 transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-purple-700 hover:bg-purple-400">
                      Descargar Imagen
                  </Button>
                </div>)}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;