"use client";

import React, { useState, useEffect } from "react";
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
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    fetchReactionCounts();
    const savedReaction = localStorage.getItem(`reaction_${articleId}`);
    if (savedReaction) {
      setUserReaction(savedReaction);
    }
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
      const method = userReaction === reaction ? "DELETE" : "POST";
      const oldReaction = userReaction;
      const response = await fetch(`/api/reactions/${articleId}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reaction, oldReaction }),
      });
      if (!response.ok) {
        throw new Error("Failed to update reaction");
      }
      const data = await response.json();
      setReactionCounts(data);
      if (userReaction === reaction) {
        setUserReaction(null);
        localStorage.removeItem(`reaction_${articleId}`);
      } else {
        setUserReaction(reaction);
        localStorage.setItem(`reaction_${articleId}`, reaction);
      }
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
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-l font-bold border border-black dark:border-yellow transition-colors duration-300 ${
            userReaction === key
              ? "bg-black text-yellow dark:bg-yellow dark:text-black"
              : "bg-yellow text-black dark:bg-black dark:text-yellow hover:bg-black hover:text-yellow dark:hover:bg-yellow dark:hover:text-black"
          }`}
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
