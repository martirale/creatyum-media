"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
      setCSSVariables("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
      setCSSVariables("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
      setCSSVariables("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
      setCSSVariables("dark");
    }
  };

  const setCSSVariables = (theme) => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.style.setProperty("--logo", "url('/creatyum-logo-y.svg')");
      root.style.setProperty("--logo-icon", "url('/creatyum-icon-y.svg')");
    } else {
      root.style.setProperty("--logo", "url('/creatyum-logo-k.svg')");
      root.style.setProperty("--logo-icon", "url('/creatyum-icon-k.svg')");
    }
  };

  return (
    <footer className="border-t-black border-t-[1px] text-black dark:border-t-yellow dark:border-t-[1px] dark:text-yellow p-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mt-8 mb-16 md:mt-0 md:mb-0">
          <Link href="/">
            <div className="logo-icon"></div>
          </Link>
        </div>
        <div className="flex flex-col text-center font-BricolageGrotesque font-extrabold md:flex-row md:items-center md:font-Roboto md:font-normal space-y-5 md:space-y-0 md:space-x-8 mb-4 md:mb-0">
          <Link href="/about" className="text-5xl hover:underline md:text-base">
            About
          </Link>
          <Link
            href="/podcast"
            className="text-5xl hover:underline md:text-base"
          >
            Podcast
          </Link>
          <div className="pt-12 md:pt-0">
            <Link
              href="/privacidad"
              className="text-2xl mr-4 hover:underline md:text-base md:mr-8"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos"
              className="text-2xl mr-4 hover:underline md:text-base md:mr-8"
            >
              Términos
            </Link>
            <button
              onClick={toggleTheme}
              className="text-2xl focus:outline-none md:text-base"
            >
              <span className="mr-2 hover:underline">Modo</span>
              {theme === "dark" ? (
                <FontAwesomeIcon
                  icon={faSun}
                  className="text-yellow w-6 h-6 md:w-4 md:h-4"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faMoon}
                  className="text-black w-6 h-6 md:w-4 md:h-4"
                />
              )}
            </button>
          </div>
        </div>
        <div className="text-xs p-12 text-center md:flex md:items-center md:p-0">
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
    </footer>
  );
}
