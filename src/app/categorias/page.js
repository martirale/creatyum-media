import Link from "next/link";

export const metadata = {
  title: "Categorías — Creatyum Media",
  description:
    "En Creatyum ofrecemos artículos y podcasts sobre diseño y creatividad que educan, empoderan y amplían tu perspectiva en el sector creativo.",
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Categorías</h1>

      <h2 className="font-extrabold text-7xl mb-8 md:text-9xl">Categorías</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/categoria/diseno`}>
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <img
                src="/images/creatyum-media-diseno-cover.webp"
                alt="creatyum-media-diseno-cover"
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                Diseño
              </h2>
            </div>
          </Link>
        </div>

        <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/categoria/industria`}
          >
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <img
                src="/images/creatyum-media-industria-cover.webp"
                alt="creatyum-media-industria-cover"
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                Industria Creativa
              </h2>
            </div>
          </Link>
        </div>

        <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/categoria/radar`}>
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <img
                src="/images/creatyum-media-radar-cover.webp"
                alt="creatyum-media-radar-cover"
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                Radar
              </h2>
            </div>
          </Link>
        </div>

        <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/categoria/entrevistas`}
          >
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <img
                src="/images/creatyum-media-entrevistas-cover.webp"
                alt="creatyum-media-entrevistas-cover"
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                Entrevistas
              </h2>
            </div>
          </Link>
        </div>

        <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/categoria/marcas`}>
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <img
                src="/images/creatyum-media-marcas-cover.webp"
                alt="creatyum-media-marcas-cover"
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                Marcas
              </h2>
            </div>
          </Link>
        </div>

        <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/categoria/ilustracion`}
          >
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <img
                src="/images/creatyum-media-ilustracion-cover.webp"
                alt="creatyum-media-ilustracion-cover"
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                Ilustración
              </h2>
            </div>
          </Link>
        </div>

        <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/categoria/foto`}>
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <img
                src="/images/creatyum-media-foto-cover.webp"
                alt="creatyum-media-foto-cover"
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                Fotografía
              </h2>
            </div>
          </Link>
        </div>

        <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/categoria/designer-class`}
          >
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <img
                src="/images/creatyum-media-designer-class-cover.webp"
                alt="creatyum-media-designer-class-cover"
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                The Designer Class
              </h2>
            </div>
          </Link>
        </div>

        <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/categoria/miscelaneo`}
          >
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <img
                src="/images/creatyum-media-misc-cover.webp"
                alt="creatyum-media-misc-cover"
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2 md:text-5xl">
                Misceláneo
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
