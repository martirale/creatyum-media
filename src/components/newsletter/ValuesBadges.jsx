import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faArrowTrendUp,
  faPodcast,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";

export default function ValuesBadges({ className = "" }) {
  return (
    <section className={`w-full ${className}`}>
      <h2 className="text-5xl text-center font-extrabold mb-8">
        ¿Qué esperar?
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 border border-black rounded-2xl dark:border-yellow">
          <FontAwesomeIcon icon={faNewspaper} className="w-16 h-16 mb-4" />
          <span className="block uppercase font-bold">Resúmenes semanales</span>
        </div>
        <div className="text-center p-4 border border-black rounded-2xl dark:border-yellow">
          <FontAwesomeIcon icon={faArrowTrendUp} className="w-16 h-16 mb-4" />
          <span className="block uppercase font-bold">
            Tendencias y novedades
          </span>
        </div>
        <div className="text-center p-4 border border-black rounded-2xl dark:border-yellow">
          <FontAwesomeIcon icon={faPodcast} className="w-16 h-16 mb-4" />
          <span className="block uppercase font-bold">Nuevos podcasts</span>
        </div>
        <div className="text-center p-4 border border-black rounded-2xl dark:border-yellow">
          <FontAwesomeIcon icon={faToolbox} className="w-16 h-16 mb-4" />
          <span className="block uppercase font-bold">Tips y herramientas</span>
        </div>
      </div>
    </section>
  );
}
