"use client";

import { useState, useEffect } from "react";

export default function CountdownDiez() {
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
    <div className="w-full">
      <h1 className="text-center mb-4">Cuenta Regresiva</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <span className="block">{timeLeft.days}</span>
          <span className="block">Días</span>
        </div>
        <div className="text-center">
          <span className="block">{timeLeft.hours}</span>
          <span className="block">Horas</span>
        </div>
        <div className="text-center">
          <span className="block">{timeLeft.minutes}</span>
          <span className="block">Minutos</span>
        </div>
        <div className="text-center">
          <span className="block">{timeLeft.seconds}</span>
          <span className="block">Segundos</span>
        </div>
      </div>
    </div>
  );
}
