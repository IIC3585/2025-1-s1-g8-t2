import {
    ScrollText,
    FileText,
    UserCheck
  } from "lucide-react";

import { Card } from "./ui/card";


const sections = [
    {
    title: "1. Instrucciones",
    icon: FileText,
    subsections: [
      { title: "1.1 Cargar o arrastrar imagen", placeholder: "Debes hacer click en la zona de subida de imágenes o arrastrar una imagen a ella" },
      { title: "1.2 Extensiones permitidas", placeholder: ".gif, .jpeg, .jpg, .png" },
      { title: "1.3 Filtros y funcionalidades", placeholder: "Inversión de colores, Cambiar escala grises, Aplicar Sepia " }
    ]
  },
  {
    title: "2. Aspectos de una PWA",
    icon: UserCheck,
    subsections: [
      { title: "2.1 Notificaciones push", placeholder: "Se generan notificaciones push cada vez que se modifica una imagen..." },
      { title: "2.2 Funcionamiento sin Internet", placeholder: "Se pueden editar imágenes sin la necesidad de estar conectado a internet..." },
    ]
  }
]

export default function InstructionsSection() {
    return (
      <section className="bg-white pb-20"> 
    
        <div className="pt-32 pb-2 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <ScrollText className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Instrucciones de Uso & Aspectos PWA
            </h1>
          </div>
        </div>
  
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="space-y-12">
              {sections.map((section, index) => (
                <Card
                  key={index}
                  className="p-8 border-primary/20 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-primary/10">
                      <section.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">
                      {section.title}
                    </h2>
                  </div>
  
                  {/* Subapartados */}
                  <div className="space-y-6 pl-14">
                    {section.subsections.map((sub, subIndex) => (
                      <div key={subIndex}>
                        <h3 className="text-lg font-semibold text-primary mb-2">
                          {sub.title}
                        </h3>
                        <p className="text-black pl-4 border-l-2 border-primary/20">
                          {sub.placeholder}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  