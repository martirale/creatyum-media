import React from "react";

const TimelineItem = ({ date, title, description, isEven }) => (
  <div
    className={`mb-8 flex justify-between items-center w-full ${isEven ? "flex-row-reverse" : ""}`}
  >
    <div className="w-5/12"></div>
    <div className="w-2/12 flex justify-center">
      <div className="w-4 h-4 bg-black rounded-full dark:bg-yellow z-10"></div>
    </div>
    <div className="w-5/12">
      <div className="p-4 border border-black rounded-2xl dark:border-yellow">
        <span className="font-bold text-sm uppercase">{date}</span>
        <h3 className="text-xl md:text-2xl font-extrabold my-1 uppercase">
          {title}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

const TimelineDiez = ({ items }) => (
  <section className="py-12 px-0 md:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-2">
        Nuestra Trayectoria
      </h2>
      <p className="mb-8">(Resumimos diez años, OMG)</p>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-black dark:bg-yellow"></div>
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            date={item.date}
            title={item.title}
            description={item.description}
            isEven={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  </section>
);

const timelineItems = [
  {
    date: "Oct28-2014",
    title: "Lanzamiento de Creatyum",
    description:
      "Lanzamos nuestro primer número de la revista tras empezar con la idea en el mes de julio",
  },
  {
    date: "Nov30-2014",
    title: "La primera entrevista",
    description:
      "Realizamos nuestra primera entrevista a la ilustradora Virginia Cortez para nuestro segundo número",
  },
  {
    date: "Ene10-2015",
    title: "Mois du Graphisme",
    description:
      "Colaboramos con DiseñoUNE para el mes del diseño en la Alianza Francesa de San Salvador",
  },
  {
    date: "Feb13-2015",
    title: "Portafolio UJMD",
    description:
      "Nos invitaron por primera vez a cubrir un evento de portafolio de diseño",
  },
  {
    date: "Mar28-2015",
    title: "Bye, formato epaper",
    description: "Dejamos el formato tipo epaper en nuestra sexta entrega",
  },
  {
    date: "Jun01-2015",
    title: "Los primeros cambios...",
    description:
      "Probamos algunas soluciones de web estática para seguir presentando la revista cada mes",
  },
  {
    date: "Sep30-2015",
    title: "El cambio definitivo",
    description:
      "Tras algunos meses de prueba nos pasamos por completo a formato blog",
  },
  {
    date: "Oct17-2015",
    title: "Creatyum Fest",
    description: "Realizamos nuestro primer (y único) mini festival de diseño",
  },
  {
    date: "Feb05-2017",
    title: "Podcast piloto",
    description:
      "Incursionamos en el mundo del audio con algunos episodios piloto",
  },
  {
    date: "May15-2019",
    title: "Café Creativo Podcast",
    description: "Iniciamos formalmente nuestro podcast con ocho episodios",
  },
  {
    date: "Oct28-2024",
    title: "Nuestro décimo aniversario",
    description:
      "Como si nada, cumplimos diez años con este increíble proyecto, ¡gracias!",
  },
];

const TimelineDiezPage = () => <TimelineDiez items={timelineItems} />;

export default TimelineDiezPage;
