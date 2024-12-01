import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';


const LoadingScreen = ({ onLoaded }) => {
  const [count, setCount] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setLoadingDone(true);
            setTimeout(() => {
              onLoaded();
            }, 500); 
          }, 1000);
          return prevCount;

        }
      });
    }, 20);
    
    return () => clearInterval(interval);
  }, [onLoaded]);
  

  return (
    <div id="loading-screen" className={loadingDone ? 'hidden' : ''}>
      <div id="loading-mask" style={{ width: `${count}%` }}></div>
      <div id="loading-text">
        <span className="loading-number">'{count}</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
