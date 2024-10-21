import React from "react";

export default function ValuesBadges({ className = "" }) {
  return (
    <section className={`w-full ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 border border-black rounded-2xl dark:border-yellow">
          <span className="block font-BricolageGrotesque text-5xl"></span>
          <span className="block uppercase font-bold">Días</span>
        </div>
        <div className="text-center p-4 border border-black rounded-2xl dark:border-yellow">
          <span className="block font-BricolageGrotesque text-5xl"></span>
          <span className="block uppercase font-bold">Horas</span>
        </div>
        <div className="text-center p-4 border border-black rounded-2xl dark:border-yellow">
          <span className="block font-BricolageGrotesque text-5xl"></span>
          <span className="block uppercase font-bold">Minutos</span>
        </div>
        <div className="text-center p-4 border border-black rounded-2xl dark:border-yellow">
          <span className="block font-BricolageGrotesque text-5xl"></span>
          <span className="block uppercase font-bold">Segundos</span>
        </div>
      </div>
    </section>
  );
}
