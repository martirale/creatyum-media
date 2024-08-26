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
    <button onClick={toggleTheme} className="flex items-center">
      {theme === "dark" ? (
        <FontAwesomeIcon
          icon={faSun}
          className="text-black w-8 h-8 dark:text-yellow"
        />
      ) : (
        <FontAwesomeIcon
          icon={faMoon}
          className="text-yellow w-8 h-8 dark:text-black"
        />
      )}
    </button>
  );
}
