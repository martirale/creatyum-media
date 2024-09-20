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
      <div className="p-4 border border-black rounded-2xl">
        <span className="font-bold">{date}</span>
        <h3 className="text-xl md:text-2xl font-extrabold my-1 uppercase">
          {title}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

const Timeline = ({ items }) => (
  <section className="py-12 px-4 md:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8">
        Nuestra Trayectoria
      </h2>
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
    date: "MMM.20XX",
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet",
  },
  {
    date: "MMM.20XX",
    title: "Lorem ipsum",
    description: "Lorem ipsum dolor sit amet",
  },
];

const TimelinePage = () => <Timeline items={timelineItems} />;

export default TimelinePage;
