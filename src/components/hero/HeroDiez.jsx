import React from "react";
import LogoCreatyum from "@logos/LogoCreatyum";
import CafeCreativoIllustration from "@components/illustrations/CafeCreativoIllustration";

const HeroDiez = ({ className = "" }) => {
  return (
    <section
      className={`rounded-2xl bg-black text-yellow dark:bg-yellow dark:text-black md:p-8 md:rounded-3xl inverse-select ${className}`}
    >
      <div className="flex flex-wrap items-center w-full">
        <div className="w-full md:w-1/2 p-4 md:p-0">
          <CafeCreativoIllustration className="fill-yellow w-full h-auto my-8 2xl:my-16 dark:fill-black" />
        </div>

        <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
          <div className="text-center md:px-2">
            <h2 className="font-BricolageGrotesque font-extrabold text-4xl md:text-7xl 2xl:text-8xl">
              ¡Diez años divulgando sobre diseño!
            </h2>

            <div className="px-8 md:px-24 2xl:px-32">
              <div className="mt-5 md:mt-8 px-3 py-1 rounded-full border border-yellow dark:border-black">
                <p className="md:text-md uppercase font-bold">
                  28 de octubre de 2024
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center mt-16 mb-4 md:mb-0">
          <LogoCreatyum className="fill-yellow w-32 h-auto dark:fill-black" />
        </div>
      </div>
    </section>
  );
};

export default HeroDiez;
