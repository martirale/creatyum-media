"use client";

import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";
import { height, width } from "@fortawesome/free-brands-svg-icons/fa42Group";

const Logo = ({ filename }) => {
  const { theme } = useTheme();
  const [logoSrc, setLogoSrc] = useState("");

  useEffect(() => {
    const currentTheme = theme === "dark" ? "dark" : "light";
    setLogoSrc(`/logos/${currentTheme}/${filename}`);
  }, [theme, filename]);

  return (
    <Image
      src={logoSrc}
      alt={`${filename} logo`}
      width={width}
      height={height}
    />
  );
};

export default Logo;
