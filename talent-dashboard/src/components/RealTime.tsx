import React, { useState, useEffect } from "react";

const RealTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>현재시각 - {currentTime}</div>;
};

export default RealTime;
