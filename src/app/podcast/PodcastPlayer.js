"use client";

import "../../styles/page.module.css";
import {
  faPause,
  faPlay,
  faRotateBack,
  faRotateForward,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef, useCallback } from "react";
import Parser from "rss-parser";
import Image from "next/image";
import ReactAudioPlayer from "react-audio-player";

const PodcastPlayer = () => {
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [volume, setVolume] = useState(1);
  const [lastPlayTime, setLastPlayTime] = useState(0);
  const [hasSent60SecEvent, setHasSent60SecEvent] = useState(false);
  const [hasSentCompleteEvent, setHasSentCompleteEvent] = useState(false);

  const audioRef = useRef(null);
  const rssUrl = "https://anchor.fm/s/a59b2a8/podcast/rss";

  const handleTimeUpdate = useCallback(() => {
    const current = audioRef.current?.audioEl.current.currentTime;
    setCurrentTime(current);

    if (!hasSent60SecEvent && current >= 60) {
      send60SecondListenEvent();
      setHasSent60SecEvent(true);
    }

    if (!hasSentCompleteEvent && current / duration >= 0.8) {
      sendCompleteListenEvent();
      setHasSentCompleteEvent(true);
    }
  }, [hasSent60SecEvent, hasSentCompleteEvent, duration]);

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.audioEl.current.duration);
  };

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
    const audioElement = audioRef.current?.audioEl.current;

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
  }, [currentEpisode, handleTimeUpdate]);

  const handleEpisodeClick = (episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(false);
    setHasSent60SecEvent(false);
    setHasSentCompleteEvent(false);
  };

  const handleSkip = (seconds) => {
    if (audioRef.current) {
      audioRef.current.audioEl.current.currentTime += seconds;
    }
  };

  const togglePlayPause = () => {
    const now = Date.now();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.audioEl.current.pause();
      } else {
        audioRef.current.audioEl.current.play();
        if (now - lastPlayTime >= 3600000) {
          setHasSent60SecEvent(false);
        }
      }
      setIsPlaying(!isPlaying);
      setLastPlayTime(now);
    }
  };

  const cyclePlaybackRate = () => {
    const rates = [0.5, 1, 1.5, 2];
    const currentRateIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentRateIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.audioEl.current.playbackRate = nextRate;
    }
  };

  const handleVolumeChange = (e) => {
    const volumeValue = e.target.value;
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.audioEl.current.volume = volumeValue;
    }
  };

  const toggleVolumeVisibility = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };

  const send60SecondListenEvent = () => {
    if (window.gtag) {
      window.gtag("event", "listen_60_seconds", {
        event_category: "Podcast",
        event_label: currentEpisode?.title,
        value: 60,
      });
    }
  };

  const sendCompleteListenEvent = () => {
    if (window.gtag) {
      window.gtag("event", "complete_listen", {
        event_category: "Podcast",
        event_label: currentEpisode?.title,
        value: 80,
      });
    }
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
      <div className="w-full bg-black px-4 pt-8 pb-10 rounded-3xl flex flex-col items-center md:w-1/2 md:max-h-[756px] md:p-12 dark:bg-yellow">
        {currentEpisode && (
          <div className="flex flex-col items-center">
            {/* Episode Cover */}
            <Image
              src={currentEpisode.imageUrl}
              alt={currentEpisode.title}
              width={512}
              height={512}
              className="w-48 h-48 object-cover rounded-3xl mb-8 border border-yellow md:w-96 md:h-96 dark:border-black"
            />
            {/* Episode Title */}
            <h2 className="text-yellow text-2xl font-extrabold mb-4 text-center md:text-4xl dark:text-black">
              {currentEpisode.title}
            </h2>
            {/* Progress and Time */}
            <div className="w-64 mb-6 md:w-96">
              <div className="flex items-center justify-between text-yellow mb-2 dark:text-black">
                <span className="text-xs md:text-base">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  className="w-full mx-4 accent-yellow dark:accent-black"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={(e) =>
                    (audioRef.current.audioEl.current.currentTime =
                      e.target.value)
                  }
                />
                <span className="text-xs md:text-base">
                  {formatTime(duration)}
                </span>
              </div>
              {/* ReactAudioPlayer (hidden) */}
              <div style={{ display: "none" }}>
                <ReactAudioPlayer
                  ref={audioRef}
                  src={currentEpisode.audioUrl}
                  autoPlay={isPlaying}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onLoadedMetadata={(e) => setDuration(e.target.duration)}
                  onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                  onEnded={() => {
                    setIsPlaying(false);
                    setCurrentTime(0);
                  }}
                  volume={volume}
                  playbackRate={playbackRate}
                />
              </div>
            </div>
            {/* Control Buttons */}
            <div className="flex justify-around w-64 text-yellow text-2xl md:w-96 dark:text-black">
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
                className="bg-yellow text-black px-4 py-3.5 rounded-full dark:bg-black dark:text-yellow"
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
                <button onClick={toggleVolumeVisibility}>
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
                    onChange={handleVolumeChange}
                    defaultValue="1"
                    className="bg-yellow accent-yellow absolute top-20 -right-1 w-60 h-2 md:left-4 md:transform md:-rotate-90 md:w-20 md:top-7 dark:bg-black dark:accent-black"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Columna 2: Lista de episodios */}
      <div className="w-full md:w-1/2 max-h-96 p-4 rounded-3xl border border-black md:max-h-[756px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] dark:border-yellow">
        <ul>
          {episodes.map((episode, index) => (
            <li
              key={index}
              className="cursor-pointer"
              onClick={() => handleEpisodeClick(episode)}
            >
              <div className="flex items-center space-x-4 px-2 py-3 md:px-5">
                <Image
                  key={index}
                  src={episode.imageUrl}
                  alt={episode.title}
                  width={360}
                  height={360}
                  className="w-12 h-12 object-cover rounded-full border border-black md:w-16 md:h-16 dark:border-yellow"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-2xl font-BricolageGrotesque font-extrabold leading-none md:text-4xl hover:underline">
                    {episode.title}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PodcastPlayer;
