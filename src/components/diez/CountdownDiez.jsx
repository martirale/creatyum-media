"use client";

import React, { useState, useEffect } from "react";

export default function CountdownDiez({ className = "" }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2024-10-28T19:00:00");

    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(intervalId);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className={`w-full ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 border border-black rounded-2xl dark:border-yellow">
          <span className="block font-BricolageGrotesque text-5xl">
            {timeLeft.days}
          </span>
          <span className="block uppercase font-bold">Días</span>
        </div>
        <div className="text-center p-4 border border-black rounded-2xl dark:border-yellow">
          <span className="block font-BricolageGrotesque text-5xl">
            {timeLeft.hours}
          </span>
          <span className="block uppercase font-bold">Horas</span>
        </div>
        <div className="text-center p-4 border border-black rounded-2xl dark:border-yellow">
          <span className="block font-BricolageGrotesque text-5xl">
            {timeLeft.minutes}
          </span>
          <span className="block uppercase font-bold">Minutos</span>
        </div>
        <div className="text-center p-4 border border-black rounded-2xl dark:border-yellow">
          <span className="block font-BricolageGrotesque text-5xl">
            {timeLeft.seconds}
          </span>
          <span className="block uppercase font-bold">Segundos</span>
        </div>
      </div>
    </section>
  );
}
