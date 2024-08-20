"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faBarsStaggered,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
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
      root.style.setProperty(
        "--logo-layered",
        "url('/creatyum-layered-logo-k.svg')"
      );
    } else {
      root.style.setProperty("--logo", "url('/creatyum-logo-k.svg')");
      root.style.setProperty("--logo-icon", "url('/creatyum-icon-k.svg')");
      root.style.setProperty(
        "--logo-layered",
        "url('/creatyum-layered-logo-y.svg')"
      );
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  function getMenuClasses() {
    let menuClasses = [];

    if (isOpen) {
      menuClasses = [
        "flex",
        "absolute",
        "bg-black",
        "text-yellow",
        "dark:bg-yellow",
        "dark:text-black",
        "w-full",
        "flex-col",
        "top-[81px]",
        "left-0",
        "p-8",
        "gap-7",
      ];
    } else {
      menuClasses = ["hidden", "md:flex"];
    }

    return menuClasses.join(" ");
  }

  return (
    <nav className="md:p-0 md:flex md:justify-between md:items-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="logo"></div>
        </Link>

        <div className={getMenuClasses()}>
          <Link
            href="/"
            className="font-BricolageGrotesque text-5xl mx-2 hover:underline md:pl-4"
          >
            Portada
          </Link>
          <Link
            href="/categorias"
            className="font-BricolageGrotesque text-5xl mx-2 hover:underline md:pl-4"
          >
            Categorías
          </Link>
          <Link
            href="/podcast"
            className="font-BricolageGrotesque text-5xl mx-2 hover:underline md:pl-4"
          >
            Podcast
          </Link>
          <button
            onClick={toggleTheme}
            className="font-BricolageGrotesque text-5xl text-left mx-2 md:pl-4"
          >
            <span className="mr-2 md:hidden">Modo</span>
            {theme === "dark" ? (
              <FontAwesomeIcon
                icon={faSun}
                className="text-black align-baseline w-8 h-8 md:text-yellow"
              />
            ) : (
              <FontAwesomeIcon
                icon={faMoon}
                className="text-yellow align-baseline w-8 h-8 md:text-black"
              />
            )}
          </button>
        </div>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? (
              <FontAwesomeIcon
                icon={faXmark}
                className="text-black text-2xl dark:text-yellow"
              />
            ) : (
              <FontAwesomeIcon
                icon={faBarsStaggered}
                className="text-black text-xl dark:text-yellow"
              />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
