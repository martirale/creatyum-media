import React from "react";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="fixed w-full px-4 py-6 bg-yellow bg-opacity-90 border-b-black border-b-[1px] text-black dark:bg-black dark:bg-opacity-90 dark:border-b-yellow dark:text-yellow z-50">
      <Navbar />
    </header>
  );
}
