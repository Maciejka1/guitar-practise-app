import React, { useState, useEffect, useRef } from 'react';
import './index.css';

function Main() {
  const [intervalDuration, setIntervalDuration] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [number1, setNumber1] = useState(null);
  const [number2, setNumber2] = useState(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const audioRef = useRef(new Audio('/pop.mp3'));

useEffect(() => {
  if (isRunning) {
    const rollNumbers = () => {
      let num1, num2;
      do {
        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
      } while (num1 === num2);

      setNumber1(num1);
      setNumber2(num2);

      if (isSoundEnabled) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    };

    rollNumbers(); // first run
    const timer = setInterval(rollNumbers, intervalDuration * 1000);
    return () => clearInterval(timer);
  }
}, [isRunning, intervalDuration, isSoundEnabled]);


  const handleStart = () => {
    if (intervalDuration >= 1) {
      setIsRunning(true);
    }
  };

  const handleStop = () => setIsRunning(false);

  const toggleSound = () => setIsSoundEnabled(prev => !prev);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div>
        <label>
          Interval (seconds):
          <input
            type="number"
            value={intervalDuration}
            onChange={(e) => setIntervalDuration(Number(e.target.value))}
            min="1"
            step="1"
            style={{ marginBottom: '10px', marginLeft: '10px' }}
          />
        </label>
        <div>
          <button className="button start-button" onClick={handleStart} disabled={isRunning}>
            Start
          </button>
          <button className="button stop-button" onClick={handleStop} disabled={!isRunning} style={{ marginLeft: '10px' }}>
            Stop
          </button>
          <button className="button sound-button" onClick={toggleSound} style={{ marginLeft: '10px' }}>
            {isSoundEnabled ? 'Disable Sound' : 'Enable Sound'}
          </button>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Current positions:</h2>
        <div style={{ fontSize: '48px' }}>
          {number1 !== null && number2 !== null ? `${number1}, ${number2}` : '—'}
        </div>
      </div>
    </div>
  );
}

export default Main;
