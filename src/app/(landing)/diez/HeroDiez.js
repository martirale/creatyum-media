import LogoCreatyum from "../../../components/LogoCreatyum";
import CafeCreativoIllustration from "../../../components/CafeCreativoIllustration";

const HeroDiez = () => {
  return (
    <section className="mb-8">
      <div className="rounded-2xl bg-black text-yellow dark:bg-yellow dark:text-black md:p-8 md:rounded-3xl">
        <div className="flex flex-wrap items-center w-full">
          <div className="w-full md:w-1/2 p-4 md:p-0">
            <CafeCreativoIllustration className="fill-yellow w-full h-auto my-8 dark:fill-black" />
          </div>

          <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
            <div className="text-center md:px-2">
              <h2 className="font-BricolageGrotesque font-extrabold text-4xl md:text-7xl">
                ¡Diez años divulgando sobre diseño!
              </h2>

              <p className="text-2xl md:text-3xl mt-5 md:mt-8">Octubre 2024</p>
            </div>
          </div>

          <div className="w-full flex flex-col items-center mt-16 mb-4 md:mb-0">
            <LogoCreatyum className="fill-yellow w-24 h-auto dark:fill-black" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDiez;
