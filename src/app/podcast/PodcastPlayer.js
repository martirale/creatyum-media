"use client";

import { useState, useEffect } from "react";

const PodcastPlayer = ({ rssFeed }) => {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);

  useEffect(() => {
    fetch(rssFeed)
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        const items = Array.from(data.querySelectorAll("item"));
        const episodesData = items.map((item) => ({
          title: item.querySelector("title").textContent,
          audioUrl: item.querySelector("enclosure").getAttribute("url"),
          imageUrl: item.querySelector("image")
            ? item.querySelector("image").textContent
            : "/default-image.jpg",
        }));
        setEpisodes(episodesData);
        setCurrentEpisode(episodesData[0]);
      });
  }, [rssFeed]);

  const handleEpisodeClick = (episode) => {
    setCurrentEpisode(episode);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Columna 1: Reproductor */}
      <div className="w-full md:w-1/2 bg-gray-800 p-4 rounded-lg">
        {currentEpisode && (
          <div>
            <img
              src={currentEpisode.imageUrl}
              alt={currentEpisode.title}
              className="w-full h-auto mb-4 rounded"
            />
            <h2 className="text-white text-xl mb-4">{currentEpisode.title}</h2>
            <audio controls src={currentEpisode.audioUrl} className="w-full">
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>

      {/* Columna 2: Lista de episodios */}
      <div className="w-full md:w-1/2 bg-gray-700 p-4 rounded-lg overflow-y-auto max-h-96">
        <ul className="space-y-2">
          {episodes.map((episode, index) => (
            <li
              key={index}
              className="cursor-pointer text-white hover:bg-gray-600 p-2 rounded"
              onClick={() => handleEpisodeClick(episode)}
            >
              {episode.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PodcastPlayer;
