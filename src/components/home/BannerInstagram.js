import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function BannerInstagram() {
  return (
    <div className="mb-8 md:mb-16">
      <div className="px-6 py-12 rounded-2xl bg-black text-yellow dark:bg-yellow dark:text-black md:px-12 md:rounded-3xl">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <Link
              href="https://www.instagram.com/creatyum_md"
              rel="noreferrer noopener"
              target="_blank"
            >
              <h2 className="text-center text-5xl font-BricolageGrotesque font-extrabold md:text-7xl">
                Síguenos en{" "}
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="w-11 h-11 md:w-16 md:h-16"
                />
              </h2>
            </Link>
            <div className="space-x-2 text-center py-2 lg:py-0">
              <Link
                href="https://www.instagram.com/creatyum_md"
                rel="noreferrer noopener"
                target="_blank"
                className="font-bold text-xl md:text-3xl"
              >
                @creatyum_md
              </Link>
            </div>
            <Link
              href="https://www.instagram.com/creatyum_md"
              rel="noreferrer noopener"
              target="_blank"
              className="px-5 mt-4 lg:mt-0 py-3 rounded-full font-bold text-xl block border border-yellow bg-yellow text-black hover:bg-black hover:text-yellow dark:border-black dark:bg-black dark:text-yellow dark:hover:bg-yellow dark:hover:text-black md:px-8 md:text-3xl transition duration-300"
            >
              ¡Síguenos!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
