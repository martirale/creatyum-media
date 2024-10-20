import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpotify,
  faApple,
  faAmazon,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const buttons = [
  {
    name: "Spotify",
    icon: faSpotify,
    color:
      "hover:bg-[#1ED760] dark:hover:text-black dark:hover:bg-[#1ED760] dark:hover:border-[#1ED760]",
    url: "https://open.spotify.com/show/63OtmwwXCqFtCW5nUpkeYp",
  },
  {
    name: "Apple Podcasts",
    icon: faApple,
    color:
      "hover:bg-[#B150E2] dark:hover:text-black dark:hover:bg-[#B150E2] dark:hover:border-[#B150E2]",
    url: "https://podcasts.apple.com/sv/podcast/caf%C3%A9-creativo/id1459333511",
  },
  {
    name: "Amazon Music",
    icon: faAmazon,
    color:
      "hover:bg-[#25d1da] dark:hover:text-black dark:hover:bg-[#25d1da] dark:hover:border-[#25d1da]",
    url: "https://music.amazon.com/podcasts/063f9823-7f6b-46d8-a904-15a1dfbb5af6/caf%C3%A9-creativo",
  },
  {
    name: "YouTube",
    icon: faYoutube,
    color:
      "hover:bg-[#FF0000] dark:hover:text-black dark:hover:bg-[#FF0000] dark:hover:border-[#FF0000]",
    url: "https://www.youtube.com/playlist?list=PL1TpZ81o-L_n7fAEjExV0uOMCFSy-Rcxs",
  },
];

export default function PodcastButtons() {
  return (
    <div className="mt-16">
      <h3 className="text-center text-3xl font-extrabold mb-4">
        También disponible en:
      </h3>
      <div className="flex flex-col sm:flex-row gap-4">
        {buttons.map((button) => (
          <Link
            key={button.name}
            href={button.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-full sm:w-1/4 px-4 py-3 text-black bg-yellow border border-black rounded-full transition-colors duration-300 ${button.color} dark:text-yellow dark:bg-black dark:border-yellow`}
          >
            <FontAwesomeIcon icon={button.icon} className="mr-2 w-4 h-4" />
            <span>{button.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
