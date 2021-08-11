import React from 'react'
import { useState, useEffect } from 'react';

const TimeUpCounter = () => {
  const [ hours, setHours ] = useState(0);
  const [ minutes, setMinutes ] = useState(0);
  const [seconds, setSeconds ] =  useState(0);

  useEffect(()=>{
    let myInterval = setInterval(() => {
      if (seconds >= 0) {
        setSeconds(seconds + 1);
      }
      if(seconds === 59){
        setSeconds(0);
        setMinutes(minutes + 1);
      }
      if(seconds===59 && minutes===59){
        setSeconds(0);
        setMinutes(0);
        setHours(hours + 1);
      }

    }, 1000)

    return ()=> {
      clearInterval(myInterval);
    };
  });

  return (
    <>  
     Time: {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ?  `0${seconds}` : seconds} 
    </>
  )
}

export default TimeUpCounter;