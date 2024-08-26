"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import FooterFeaturedArticles from "../components/FooterFeaturedArticles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleAd } from "@fortawesome/free-solid-svg-icons";

export default function Footer({ theme }) {
  const pathname = usePathname();
  const isArticlePage = pathname.startsWith("/articulo/");
  const isCategoriesPage = pathname.startsWith("/categorias");
  const isCategoryPage = pathname.startsWith("/categoria/");

  return (
    <footer className="mt-8">
      {isArticlePage && (
        <div className="bg-black dark:bg-yellow">
          <div className="container mx-auto px-8 py-4 justify-between items-center md:px-0 md:py-8">
            <FooterFeaturedArticles />
          </div>
        </div>
      )}

      {isCategoriesPage && (
        <div className="bg-black dark:bg-yellow">
          <div className="container mx-auto px-8 py-4 justify-between items-center md:px-0 md:py-8">
            <FooterFeaturedArticles />
          </div>
        </div>
      )}

      {isCategoryPage && (
        <div className="bg-black dark:bg-yellow">
          <div className="container mx-auto px-8 py-4 justify-between items-center md:px-0 md:py-8">
            <FooterFeaturedArticles />
          </div>
        </div>
      )}

      <div className="border-t-black border-t-[1px] text-black dark:border-t-yellow dark:border-t-[1px] dark:text-yellow">
        <div className="container mx-auto py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mt-8 mb-16 md:mt-0 md:mb-0">
            <Link href="/">
              <div className="w-20 h-20 md:w-9 md:h-9">
                <Logo filename="creatyum-icon.svg" theme={theme} />
              </div>
            </Link>
          </div>
          <div className="flex flex-col text-center font-BricolageGrotesque font-extrabold md:flex-row md:items-center md:font-Roboto md:font-normal space-y-5 md:space-y-0 md:space-x-8 mb-4 md:mb-0">
            <Link
              href="/about"
              className="text-5xl hover:underline md:text-base"
            >
              About
            </Link>
            <Link
              href="/categorias"
              className="text-5xl hover:underline md:hidden"
            >
              Categorías
            </Link>
            <Link
              href="/podcast"
              className="text-5xl hover:underline md:hidden"
            >
              Podcast
            </Link>
            <div className="pt-12 md:pt-0">
              <Link
                href="/patrocinado"
                className="text-xl mr-4 hover:underline md:text-base md:mr-8"
              >
                Patrocinado
                <FontAwesomeIcon
                  icon={faRectangleAd}
                  className="w-4 h-4 align-middle ml-1 md:w-3.5 md:h-3.5"
                />
              </Link>
              <Link
                href="/privacidad"
                className="text-xl mr-4 hover:underline md:text-base md:mr-8"
              >
                Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-xl hover:underline md:text-base"
              >
                Términos
              </Link>
            </div>
          </div>
          <div className="text-xs p-12 -mt-10 mb-8 text-center md:flex md:items-center md:p-0 md:mt-0 md:mb-0">
            <p>
              <a
                href="https://alemartir.com"
                target="_blank"
                className="hover:underline"
              >
                &copy; COPYRIGHT 2024 AM
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
