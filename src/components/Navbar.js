"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

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
            href="/podcast"
            className="font-BricolageGrotesque text-5xl mx-2 hover:underline md:pl-4"
          >
            Podcast
          </Link>
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
