"use client";

import { useState, useEffect, useRef } from "react";
import Parser from "rss-parser";

const PodcastPlayer = () => {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  const audioRef = useRef(null);
  const rssUrl = "https://anchor.fm/s/a59b2a8/podcast/rss";

  useEffect(() => {
    const fetchEpisodes = async () => {
      const parser = new Parser();
      try {
        const feed = await parser.parseURL(rssUrl);
        const episodesData = feed.items.map((item) => ({
          title: item.title,
          audioUrl: item.enclosure.url,
          imageUrl:
            item.itunes?.image ||
            "https://d3t3ozftmdmh3i.cloudfront.net/staging/podcast_uploaded_nologo/1636506/1636506-1713733779208-14b89918f43a.jpg",
        }));

        setEpisodes(episodesData);
        setCurrentEpisode(episodesData[0]);
      } catch (error) {
        console.error("Error fetching podcast episodes:", error);
      }
    };

    fetchEpisodes();
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener("timeupdate", handleTimeUpdate);
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", handleTimeUpdate);
        audioElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
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
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
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
              controls={false}
            >
              Your browser does not support the audio element.
            </audio>
            <div className="flex justify-between space-x-4 items-center mb-4">
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
