import React from "react";
import Image from "next/image";

const HeroNewsletter = () => {
  return (
    <section className="mb-8">
      <div className="rounded-2xl bg-black text-yellow dark:bg-yellow dark:text-black md:rounded-3xl">
        <div className="flex flex-wrap items-center w-full">
          <div className="w-full md:w-1/2">
            <Image
              src="/NewsletterIllustration.svg"
              alt="Newsletter illustration."
              width="1080"
              height="1050"
              className="pt-8 px-8 border border-b-yellow md:border-b-0 dark:border-b-black"
            />
          </div>

          <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col items-center">
            <div className="text-center md:px-2">
              <h2 className="font-BricolageGrotesque font-extrabold text-4xl md:text-7xl">
                ¡Únete a nuestra comunidad creativa!
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroNewsletter;
