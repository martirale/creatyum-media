"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }

    window.location.reload();
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center font-BricolageGrotesque text-5xl mx-2 md:pl-4"
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
  );
}
