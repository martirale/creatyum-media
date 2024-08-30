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
  const [userReaction, setUserReaction] = useState(null);
  const [reactionCounts, setReactionCounts] = useState({
    like: 0,
    love: 0,
    haha: 0,
    wow: 0,
    sad: 0,
    angry: 0,
  });

  useEffect(() => {
    const savedReactions = localStorage.getItem(`reactions_${articleId}`);
    if (savedReactions) {
      setReactionCounts(JSON.parse(savedReactions));
    }
    const savedUserReaction = localStorage.getItem(`userReaction_${articleId}`);
    if (savedUserReaction) {
      setUserReaction(savedUserReaction);
    }
  }, [articleId]);

  const handleReaction = (reaction) => {
    const newCounts = { ...reactionCounts };

    if (userReaction) {
      newCounts[userReaction]--;
    }

    if (userReaction !== reaction) {
      newCounts[reaction]++;
      setUserReaction(reaction);
      localStorage.setItem(`userReaction_${articleId}`, reaction);
    } else {
      setUserReaction(null);
      localStorage.removeItem(`userReaction_${articleId}`);
    }

    setReactionCounts(newCounts);
    localStorage.setItem(`reactions_${articleId}`, JSON.stringify(newCounts));
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
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-l font-bold border border-black dark:border-yellow transition-colors duration-300
            ${
              userReaction === key
                ? "bg-black text-yellow dark:bg-yellow dark:text-black"
                : "bg-yellow text-black dark:bg-black dark:text-yellow hover:bg-black hover:text-yellow dark:hover:bg-yellow dark:hover:text-black"
            }`}
          onClick={() => handleReaction(key)}
        >
          <FontAwesomeIcon icon={icon} className="w-4 h-4" />
          <span>{reactionCounts[key]}</span>
          <span className="sr-only">{key}</span>
        </button>
      ))}
    </div>
  );
}
