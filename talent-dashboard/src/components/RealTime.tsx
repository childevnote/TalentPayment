import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
const fontUrl = 'https://fonts.googleapis.com/css?family=Poor+Story:400';
const fontStyles = `@import url('${fontUrl}');`;

const RealTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Typography
  fontWeight={'bold'}
  style={{ fontFamily: 'Poor Story, sans-serif'}} 
> 
  <span style={{ marginRight: "1rem",fontSize:'27px' }}> [ 현재시각 {currentTime} ]  </span>
  
</Typography>;
};

export default RealTime;
