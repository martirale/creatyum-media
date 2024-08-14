"use client";

import {
  faBackward,
  faPause,
  faPlay,
  faRotateBack,
  faRotateForward,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import Parser from "rss-parser";

const PodcastPlayer = () => {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [volume, setVolume] = useState(1);

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

  const cyclePlaybackRate = () => {
    const rates = [0.5, 1, 1.5, 2];
    const currentRateIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentRateIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const handleVolumeChange = (e) => {
    const volumeValue = e.target.value;
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
    }
  };

  const toggleVolumeVisibility = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? h + ":" : ""}${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center md:flex-row gap-4">
      {/* Columna 1: Reproductor */}
      <div className="w-full md:w-1/2 bg-black px-4 pt-4 pb-10 rounded-3xl flex flex-col items-center md:p-12">
        {currentEpisode && (
          <div className="flex flex-col items-center">
            {/* Episode Cover */}
            <img
              src={currentEpisode.imageUrl}
              alt={currentEpisode.title}
              className="w-auto h-auto object-cover rounded-3xl mb-8 border border-yellow md:w-96 md:h-96"
            />
            {/* Episode Title */}
            <h2 className="text-yellow text-2xl font-extrabold mb-4 text-center md:text-4xl">
              {currentEpisode.title}
            </h2>
            {/* Progress and Time */}
            <div className="w-full mb-6">
              <div className="flex items-center justify-between text-yellow mb-2">
                <span>{formatTime(currentTime)}</span>
                <input
                  type="range"
                  className="w-full mx-4 accent-yellow"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={(e) =>
                    (audioRef.current.currentTime = e.target.value)
                  }
                />
                <span>{formatTime(duration)}</span>
              </div>
              {/* Default Player HIDE */}
              <audio
                ref={audioRef}
                src={currentEpisode.audioUrl}
                className="w-full"
                controls={false}
              ></audio>
            </div>
            {/* Control Buttons */}
            <div className="flex justify-around w-full text-yellow text-2xl">
              {/* Speed Control */}
              <button
                onClick={cyclePlaybackRate}
                className="w-8 text-base text-center"
              >
                {playbackRate}x
              </button>
              {/* Backward 15s */}
              <button onClick={() => handleSkip(-15)}>
                <FontAwesomeIcon
                  icon={faRotateBack}
                  className="w-6 h-6 align-middle"
                />
              </button>
              {/* Play-Pause */}
              <button
                onClick={togglePlayPause}
                className="bg-yellow text-black px-4 py-3.5 rounded-full"
              >
                {isPlaying ? (
                  <FontAwesomeIcon
                    icon={faPause}
                    className="w-7 h-7 align-middle"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlay}
                    className="w-7 h-7 align-middle"
                  />
                )}
              </button>
              {/* Forward 30s */}
              <button onClick={() => handleSkip(30)}>
                <FontAwesomeIcon
                  icon={faRotateForward}
                  className="w-6 h-6 align-middle"
                />
              </button>
              {/* Volume Control */}
              <div className="relative flex items-center">
                <button onClick={() => setIsVolumeVisible(!isVolumeVisible)}>
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="w-6 h-6 align-middle"
                  />
                </button>
                {isVolumeVisible && (
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    onChange={(e) => (audioRef.current.volume = e.target.value)}
                    defaultValue="1"
                    className=" bg-yellow accent-yellow absolute top-20 right-0 w-64 h-2 md:left-4 md:transform md:-rotate-90 md:w-20 md:top-7"
                  />
                )}
              </div>
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
