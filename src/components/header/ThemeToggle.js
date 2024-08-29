"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

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
