"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faHeart,
  faLaugh,
  faAngry,
  faFrown,
  faFaceGrinStars,
} from "@fortawesome/free-solid-svg-icons";

export default function ArticleReactions({ articleId }) {
  const [reactionCounts, setReactionCounts] = useState({
    like: 0,
    love: 0,
    haha: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  });

  useEffect(() => {
    fetchReactionCounts();
  }, [articleId]);

  const fetchReactionCounts = async () => {
    try {
      const response = await fetch(`/api/reactions/${articleId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch reaction counts");
      }
      const data = await response.json();
      setReactionCounts(data);
    } catch (error) {
      console.error("Error fetching reaction counts:", error);
    }
  };

  const handleReaction = async (reaction) => {
    try {
      const response = await fetch(`/api/reactions/${articleId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reaction }),
      });
      if (!response.ok) {
        throw new Error("Failed to update reaction");
      }
      const data = await response.json();
      setReactionCounts(data);
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };

  const reactionIcons = {
    like: faThumbsUp,
    love: faHeart,
    haha: faLaugh,
    wow: faFaceGrinStars,
    sad: faFrown,
    angry: faAngry,
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center p-4">
      {Object.entries(reactionIcons).map(([key, icon]) => (
        <button
          key={key}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-l font-bold border border-black dark:border-yellow hover:bg-black hover:text-yellow dark:hover:bg-yellow dark:hover:text-black transition duration-300"
          onClick={() => handleReaction(key)}
          aria-label={`Reaccionar con ${key}`}
        >
          <FontAwesomeIcon icon={icon} className="w-4 h-4" aria-hidden="true" />
          <span>{reactionCounts[key]}</span>
        </button>
      ))}
    </div>
  );
}
