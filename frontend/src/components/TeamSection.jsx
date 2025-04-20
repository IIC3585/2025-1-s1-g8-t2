export default function TeamSection() {
    return (
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black text-white rounded-t-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary/70 bg-clip-text text-transparent mb-6">
              Equipo del Grupo 8
            </h2>
            <p className="text-xl text-white">
              Apasionados por el desarrollo de interfaces e implementación de Features y funcionalidades web.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Bruno Tike Palaneck",
                carrer:
                  "Major en Investigación Operativa, Minor en Tecnologías de la Información",
                image:
                  "/student_images/bruno_tike.png",
                description:
                  "Full-stack developer, expert in UX/UI designs.",
              },
              {
                name: "Rafael Fodor",
                carrer:
                  "Major en Software, Minor en Ingeniería Industrial",
                image:
                  "/student_images/rafael_fodor.jpeg",
                description:
                  "Full-stack developer specializing in AI and machine learning applications.",
              },
              {
                name: "Agustín Pini",
                carrer:
                  "Major en Investigación Operativa, Minor en Tecnologías de la Información",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&auto=format&fit=crop",
                description:
                  "Expert in creating intuitive interfaces for educational platforms.",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-card/40 backdrop-blur-sm rounded-xl border p-6 transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-blue-400"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-center text-secondary mb-3">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-justify text-secondary mb-3">
                  {member.carrer}
                </p>
                <p className="text-white text-justify text-secondary text-xs">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  