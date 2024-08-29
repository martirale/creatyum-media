"use client";

import Logo from "../Logo";
import ThemeToggle from "./ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
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

  // MENU LINKS
  const buttons = [
    {
      name: "Portada",
      url: "/",
    },
    {
      name: "Categorías",
      url: "/categorias",
    },
    {
      name: "Podcast",
      url: "/podcast",
    },
  ];

  return (
    <nav className="md:p-0 md:flex md:justify-between md:items-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="w-[196px] h-[40px] md:w-[269px] md:h-[55px]">
            <Logo filename="creatyum-logo.svg" />
          </div>
        </Link>

        <div className={getMenuClasses()}>
          {buttons.map((button) => (
            <Link
              key={button.name}
              href={button.url}
              className="font-BricolageGrotesque text-5xl mx-2 hover:underline md:pl-4"
            >
              <span>{button.name}</span>
            </Link>
          ))}

          <ThemeToggle />
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
