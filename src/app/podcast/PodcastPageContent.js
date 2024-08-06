"use client";

import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Parser from "rss-parser";

const PodcastPageContent = () => {
  const [latestEpisode, setLatestEpisode] = useState(null);
  const [otherEpisodes, setOtherEpisodes] = useState([]);
  const keyword = "#Temporada4";
  const rssUrl = "https://anchor.fm/s/a59b2a8/podcast/rss";

  useEffect(() => {
    const fetchEpisodes = async () => {
      const parser = new Parser();
      try {
        const feed = await parser.parseURL(rssUrl);
        const filteredEpisodes = feed.items.filter(
          (item) =>
            item.content.includes(keyword) ||
            item.contentSnippet.includes(keyword)
        );

        if (filteredEpisodes.length > 0) {
          setLatestEpisode(filteredEpisodes[0]);
          setOtherEpisodes(filteredEpisodes.slice(1));
        }
      } catch (error) {
        console.error("Error fetching podcast episodes:", error);
      }
    };

    fetchEpisodes();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div className="container mx-auto px-8 py-5 md:px-0">
      {latestEpisode && (
        // FEATURED MOST RECENT EPISODE
        <div className="grid grid-cols-12 items-center border border-black bg-black text-yellow rounded-3xl dark:border-yellow dark:bg-yellow dark:text-black">
          <div className="col-span-12 md:col-span-6">
            <div className="w-100 h-100 overflow-hidden rounded-t-3xl md:rounded-t-none md:rounded-l-3xl">
              <img
                src={latestEpisode.itunes.image}
                alt={latestEpisode.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="p-4 md:p-10">
              <h3 className="text-3xl font-extrabold mb-2 md:text-9xl">
                {latestEpisode.title}
              </h3>
              <p className="text-lg md:text-xl">
                <span className="mr-2">
                  <FontAwesomeIcon icon={faCalendarDay} />
                </span>
                {formatDate(latestEpisode.pubDate)}
              </p>
              <audio controls className="w-full mt-4">
                <source src={latestEpisode.enclosure.url} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 mt-4 gap-4 md:grid-cols-2 md:mt-16 lg:grid-cols-3">
        {otherEpisodes.map((episode) => (
          // RECENT EPISODES GRID
          <div
            key={episode.guid}
            className="border border-black bg-black text-yellow rounded-3xl dark:border-yellow"
          >
            <div className="w-100 h-100 overflow-hidden">
              <img
                src={episode.itunes.image}
                alt={episode.title}
                className="w-full h-full object-cover rounded-t-3xl"
              />
            </div>
            <div className="p-4">
              <h3 className="text-3xl font-extrabold mb-2">{episode.title}</h3>
              <p className="text-lg">
                <span className="mr-2">
                  <FontAwesomeIcon icon={faCalendarDay} />
                </span>
                {formatDate(episode.pubDate)}
              </p>
              <audio controls className="w-full mt-4">
                <source src={episode.enclosure.url} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastPageContent;
