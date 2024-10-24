"use client";

import React from "react";
import Link from "next/link";
import IconCreatyum from "@logos/IconCreatyum";
import { usePathname } from "next/navigation";
import FooterFeaturedArticles from "./FooterFeaturedArticles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleAd } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const pathname = usePathname();
  const isArticlePage = pathname.startsWith("/articulo/");
  const isCategoriesPage = pathname.startsWith("/categorias");
  const isCategoryPage = pathname.startsWith("/categoria/");
  const isArchivePage = pathname.startsWith("/archivo");

  const shouldShowFeaturedArticles =
    isArticlePage || isCategoriesPage || isCategoryPage || isArchivePage;

  return (
    <footer className="mt-8">
      {shouldShowFeaturedArticles && (
        <div className="bg-black dark:bg-yellow inverse-select">
          <div className="container mx-auto px-8 py-4 justify-between items-center md:px-0 md:py-8">
            <FooterFeaturedArticles />
          </div>
        </div>
      )}

      <div className="border-t-black border-t-[1px] text-black dark:border-t-yellow dark:text-yellow">
        <div className="container mx-auto py-6 flex flex-col md:flex-row justify-between items-center">
          {/* ICON */}
          <div className="flex items-center mt-8 mb-16 md:mt-0 md:mb-0">
            <Link href="/">
              <IconCreatyum className="fill-black w-20 h-20 md:w-9 md:h-9 dark:fill-yellow" />
            </Link>
          </div>
          {/* LARGE OPTIONS */}
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
              className="text-5xl pb-8 hover:underline md:hidden md:pb-0"
            >
              Podcast
            </Link>
            {/* SMALL OPTIONS */}
            <div className="flex flex-wrap justify-center border-t-black border-t-[1px] px-8 pt-8 md:px-0 md:pt-0 gap-y-2 gap-x-8 md:gap-y-0 md:gap-x-0 dark:border-t-yellow md:border-t-0">
              <Link
                href="/patrocinado"
                className="text-xl hover:underline md:text-base md:mr-8"
              >
                Patrocinado
                <FontAwesomeIcon
                  icon={faRectangleAd}
                  className="w-4 h-4 align-middle ml-1 md:w-3.5 md:h-3.5"
                />
              </Link>
              <Link
                href="/transparencia"
                className="text-xl hover:underline md:text-base md:mr-8"
              >
                Transparencia
              </Link>
              <Link
                href="/privacidad"
                className="text-xl hover:underline md:text-base md:mr-8"
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
          {/* COPYRIGHT */}
          <div className="text-xs p-12 mb-8 text-center md:flex md:items-center md:p-0 md:mt-0 md:mb-0">
            <p>
              <Link
                href="https://alemartir.com"
                target="_blank"
                rel="noopener"
                className="hover:underline"
              >
                CREATYUM &copy; 2024 AM
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
