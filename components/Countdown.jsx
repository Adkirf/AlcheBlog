import React, { useEffect, useState } from "react";

//const targetTime = new Date("2035-01-01").getTime();

const Countdown = ({date}) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  const targetTime = new Date(date).getTime();

  const timeBetween = targetTime - currentTime;
  const minutes = Math.floor((timeBetween / 1000 / 60) % 60);
  const hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeBetween / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <p className="text-pink-500">
        <span>{days}d </span>
        <span>{hours}h </span>
        <span>{minutes}min </span>
      </p>
    </>
  );
};

export default Countdown;