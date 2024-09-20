import React from "react";
import Link from "next/link";

export default function AuthorList() {
  return (
    <div>
      <ul>
        <li className="text-xs font-bold">PRINCIPALES</li>
        <li>
          <Link href="/autor/alejandro-martir" className="hover:underline">
            Alejandro Mártir
          </Link>
        </li>
        <li className="text-xs font-bold mt-5">INVITADOS</li>
        <li>
          <Link href="/autor/vladimir-guardado" className="hover:underline">
            Vladimir Guardado
          </Link>
        </li>
        <li>
          <Link href="/autor/eduardo-carballo" className="hover:underline">
            Eduardo Carballo
          </Link>
        </li>
        <li>
          <Link href="/autor/federico-alegria" className="hover:underline">
            Federico Alegría
          </Link>
        </li>
      </ul>
    </div>
  );
}
