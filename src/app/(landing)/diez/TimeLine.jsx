import React from "react";

const TimelineItem = ({ date, title, description, isEven }) => (
  <div
    className={`mb-8 flex justify-between items-center w-full ${isEven ? "flex-row-reverse" : ""}`}
  >
    <div className="w-5/12"></div>
    <div className="w-2/12 flex justify-center">
      <div className="w-4 h-4 bg-primary rounded-full z-10"></div>
    </div>
    <div className="w-5/12">
      <div className="p-4 bg-white shadow-md rounded-lg">
        <span className="font-bold text-primary">{date}</span>
        <h3 className="font-semibold mt-1">{title}</h3>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  </div>
);

const Timeline = ({ items }) => (
  <section className="py-12 px-4 md:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        Nuestra Trayectoria
      </h2>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200"></div>
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
    date: "2020",
    title: "Fundación",
    description: "Comenzamos nuestra aventura con una visión clara.",
  },
  {
    date: "2021",
    title: "Expansión",
    description: "Duplicamos nuestro equipo y alcance en el mercado.",
  },
  {
    date: "2022",
    title: "Innovación",
    description: "Lanzamos nuestro producto revolucionario.",
  },
  {
    date: "2023",
    title: "Reconocimiento",
    description: "Ganamos premios de la industria por nuestra excelencia.",
  },
];

const TimelinePage = () => <Timeline items={timelineItems} />;

export default TimelinePage;
