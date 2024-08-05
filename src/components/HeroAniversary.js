import Link from "next/link";

export default function HeroAniversary() {
  return (
    <section>
      <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-24 xl:max-w-7xl">
        <h2 className="text-7xl font-extrabold leading-none mb-16 md:text-9xl md:mb-8">
          Década de creatividad en Creatyum
        </h2>
        <div className="flex flex-wrap justify-center">
          <Link href="https://creatyum.media">
            <button className="px-8 py-3 m-2 text-lg text-yellow bg-black border border-black hover:text-black hover:bg-yellow dark:text-black dark:bg-yellow dark:border-yellow dark:hover:text-yellow dark:hover:bg-black">
              Leer artículos
            </button>
          </Link>
          <Link href="/podcast">
            <button className="px-8 py-3 m-2 text-lg text-black border border-yellow hover:border-black dark:text-yellow dark:border-black dark:hover:border-yellow">
              Escucha el podcast
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
