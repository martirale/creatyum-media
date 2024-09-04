"use client";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-3 bg-black text-yellow bg-opacity-90 border border-yellow dark:bg-yellow dark:text-black dark:border-black dark:bg-opacity-90 rounded-full md:left-auto md:right-4 md:translate-x-0 z-[1000]"
      >
        <FontAwesomeIcon icon={faArrowUp} className="w-4 h-4 align-middle" />
      </button>
    )
  );
};

export default BackToTopButton;
