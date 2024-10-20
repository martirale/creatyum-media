import React from "react";
import LogoCreatyum from "@logos/LogoCreatyum";
import CafeCreativoIllustration from "@components/illustrations/CafeCreativoIllustration";

const HeroNewsletter = () => {
  return (
    <section className="mb-8">
      <div className="rounded-2xl bg-black text-yellow dark:bg-yellow dark:text-black md:rounded-3xl">
        <div className="flex flex-wrap items-center w-full">
          <div className="w-full md:w-1/2">
            <CafeCreativoIllustration className="fill-yellow w-full h-auto pt-8 px-10 2xl:pt-10 2xl:px-12 dark:fill-black" />
          </div>

          <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col items-center">
            <div className="text-center md:px-2">
              <h2 className="font-BricolageGrotesque font-extrabold text-4xl md:text-7xl">
                ¡Únete a nuestra comunidad creativa!
              </h2>
            </div>

            <LogoCreatyum className="fill-yellow w-32 h-auto mt-16 mb-4 md:mb-0 dark:fill-black" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroNewsletter;
