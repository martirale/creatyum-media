"use client";

import { useState, useEffect, useRef } from "react";

const PodcastPlayer = ({ rssFeed }) => {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const audioRef = useRef(null);

  useEffect(() => {
    fetch(rssFeed)
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        const items = Array.from(data.querySelectorAll("item"));
        const episodesData = items.map((item) => ({
          title: item.querySelector("title").textContent,
          audioUrl: item.querySelector("enclosure").getAttribute("url"),
          imageUrl: item.querySelector("itunes\\:image")
            ? item.querySelector("itunes\\:image").getAttribute("href")
            : data.querySelector("itunes\\:image")
              ? data.querySelector("itunes\\:image").getAttribute("href")
              : "/default-image.jpg",
        }));
        setEpisodes(episodesData);
        setCurrentEpisode(episodesData[0]);
      });
  }, [rssFeed]);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioElement.addEventListener("ended", handleNextEpisode);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioElement.removeEventListener("ended", handleNextEpisode);
      }
    };
  }, [currentEpisode]);

  const handleEpisodeClick = (episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSkip = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };

  const handleNextEpisode = () => {
    const currentIndex = episodes.findIndex(
      (episode) => episode === currentEpisode
    );
    const nextIndex = (currentIndex + 1) % episodes.length;
    setCurrentEpisode(episodes[nextIndex]);
  };

  const handlePreviousEpisode = () => {
    const currentIndex = episodes.findIndex(
      (episode) => episode === currentEpisode
    );
    const prevIndex = (currentIndex - 1 + episodes.length) % episodes.length;
    setCurrentEpisode(episodes[prevIndex]);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    audioRef.current.playbackRate = rate;
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? h + ":" : ""}${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
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
              className="w-full h-full object-cover mb-4 rounded"
            />
            <h2 className="text-white text-xl mb-4">{currentEpisode.title}</h2>
            <audio
              ref={audioRef}
              src={currentEpisode.audioUrl}
              className="w-full mb-4"
              controls={false} // Ocultar controles del reproductor por defecto
            >
              Your browser does not support the audio element.
            </audio>
            <div className="flex justify-between space-x-4 items-center mb-4">
              <button
                onClick={handlePreviousEpisode}
                className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              >
                Prev
              </button>
              <button
                onClick={() => handleSkip(-15)}
                className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              >
                -15s
              </button>
              <button
                onClick={togglePlayPause}
                className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                onClick={() => handleSkip(30)}
                className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              >
                +30s
              </button>
              <button
                onClick={handleNextEpisode}
                className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              >
                Next
              </button>
              <input
                type="range"
                className="w-24"
                min="0"
                max="1"
                step="0.01"
                onChange={(e) => (audioRef.current.volume = e.target.value)}
                defaultValue="1"
              />
              <select
                onChange={(e) => handlePlaybackRateChange(e.target.value)}
                className="bg-gray-700 text-white rounded px-2 py-1"
                value={playbackRate}
              >
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
            <div className="flex justify-between items-center text-white">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                className="w-full mx-4"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) =>
                  (audioRef.current.currentTime = e.target.value)
                }
              />
              <span>{formatTime(duration)}</span>
            </div>
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