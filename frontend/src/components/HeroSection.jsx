
import QRCode from "react-qr-code"

export default function HeroSection(){
  const url = window.location.origin
    return(
        <section className="text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
            Trabajo 2 Web Avanzado, Grupo 8
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto pb-10">
            Proyecto PWA para la asignatura de Web Avanzado. Implementación de funcionalidades modernas y responsive design.
          </p>
          <div className="max-w-xs mx-auto p-2 bg-white rounded-lg shadow-md flex flex-col items-center">
          <QRCode value={url} size={300}/>
          <p className="mt-2 text-gray-700 text-lg text-center">
            Escanea para abrir en tu móvil
            </p>
          </div>
        </div>
      </section>
    )
}