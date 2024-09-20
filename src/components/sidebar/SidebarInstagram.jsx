import React from "react";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function SidebarInstagram() {
  return (
    <div>
      <div className="rounded-2xl mb-8 text-yellow bg-black border border-black dark:text-black dark:bg-yellow dark:border-yellow md:rounded-3xl">
        <div className="p-4">
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-between">
              <Link
                href="https://www.instagram.com/creatyum_md"
                rel="noreferrer noopener"
                target="_blank"
              >
                <h2 className="text-center text-5xl font-extrabold">
                  Síguenos en{" "}
                  <FontAwesomeIcon icon={faInstagram} className="w-11 h-11" />
                </h2>
              </Link>
              <div className="space-x-2 text-center py-2">
                <Link
                  href="https://www.instagram.com/creatyum_md"
                  rel="noreferrer noopener"
                  target="_blank"
                  className="font-bold text-xl"
                >
                  @creatyum_md
                </Link>
              </div>
              <Link
                href="https://www.instagram.com/creatyum_md"
                rel="noreferrer noopener"
                target="_blank"
                className="px-5 mt-4 py-3 rounded-full font-bold text-xl block border border-yellow bg-yellow text-black hover:bg-black hover:text-yellow dark:border-black dark:bg-black dark:text-yellow dark:hover:bg-yellow dark:hover:text-black"
              >
                ¡Síguenos!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
