import Link from "next/link";

export const metadata = {
  title: "Categorías — Creatyum Media",
  description: "Revista digital para diseñadores y creativos en Latam.",
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-2 md:px-0">
      <h1>Categorías</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/categoria/diseno`}>
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <img
                src=""
                alt=""
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2">
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
                src=""
                alt=""
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2">
                Industria Creativa
              </h2>
            </div>
          </Link>
        </div>

        <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/categoria/radar`}>
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <img
                src=""
                alt=""
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2">
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
                src=""
                alt=""
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2">
                Entrevistas
              </h2>
            </div>
          </Link>
        </div>

        <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/categoria/marcas`}>
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <img
                src=""
                alt=""
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2">
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
                src=""
                alt=""
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2">
                Ilustración
              </h2>
            </div>
          </Link>
        </div>

        <div className="rounded-3xl bg-yellow text-black border border-black hover:bg-black hover:text-yellow dark:bg-black dark:text-yellow dark:border-yellow dark:hover:bg-yellow dark:hover:text-black">
          <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/categoria/foto`}>
            <div className="relative w-full aspect-w-1 aspect-h-1">
              <img
                src=""
                alt=""
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2">
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
                src=""
                alt=""
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2">
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
                src=""
                alt=""
                className="rounded-t-3xl absolute inset-0 w-full h-full object-cover border border-t-0 border-l-0 border-r-0 border-b-black dark:border-b-yellow"
              />
            </div>
            <div className="p-4">
              <h2 className="text-4xl text-center font-extrabold mb-2">
                Misceláneo
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
