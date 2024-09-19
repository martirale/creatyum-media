import LogoCreatyum from "../../../components/LogoCreatyum";
import Image from "next/image";

const HeroDiez = () => {
  return (
    <section className="mb-8">
      <div className="rounded-2xl bg-black text-yellow dark:bg-yellow dark:text-black md:p-8 md:rounded-3xl">
        <div className="flex flex-wrap items-center w-full">
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
            <LogoCreatyum className="fill-yellow w-64 h-auto md:w-[512px] md:h-auto dark:fill-black" />
            <div className="text-center mt-8 md:px-16">
              <p className="mb-8">Lorem ipsum dolor sit amet.</p>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-4">
            <Image
              src="/placeholder.svg"
              alt="creatyum-layered-comic"
              width={1080}
              height={1080}
              className="w-full h-auto object-cover rounded-2xl border border-yellow dark:border-black md:rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDiez;
