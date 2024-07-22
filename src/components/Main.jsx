import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';

const icons = [
  'faMugSaucer', 'faPaw', 'faCar', 'faCat', 
  'faAppleWhole', 'faPhone', 'faAnchor', 'faHeart'
];

const Main = () => {
  const numCards = 16;
  
  const generatePairs = () => {
    const shuffledIcons = [...icons, ...icons].sort(() => Math.random() - 0.5);
    return shuffledIcons.map((icon, index) => ({ id: index, icon }));
  };

  const [pairs, setPairs] = useState(generatePairs());
  const [flippedStates, setFlippedStates] = useState(Array(numCards).fill(false));
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isTimerActive) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [isTimerActive]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      if (pairs[firstIndex].icon === pairs[secondIndex].icon) {
        setMatchedPairs(prev => [...prev, pairs[firstIndex].icon]);
        setFlippedIndices([]);
      } else {
        setTimeout(() => {
          setFlippedStates(states => states.map((state, index) =>
            index === firstIndex || index === secondIndex ? false : state
          ));
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }, [flippedIndices, pairs]);

  useEffect(() => {
    if (matchedPairs.length === icons.length) {
        setIsTimerActive(false);
        setPopUp(true);
    }
  }, [matchedPairs]);

  const handleClick = (index) => {
    if (!isTimerActive) setIsTimerActive(true);
    if (flippedStates[index] || flippedIndices.length === 2) return;

    const newFlippedStates = [...flippedStates];
    newFlippedStates[index] = !newFlippedStates[index];
    setFlippedStates(newFlippedStates);

    if (flippedIndices.length === 0) {
      setFlippedIndices([index]);
    } else {
      setFlippedIndices([flippedIndices[0], index]);
    }
  };

  const reset = () => {
    setPairs(generatePairs());
    setFlippedStates(Array(numCards).fill(false));
    setFlippedIndices([]);
    setMatchedPairs([]);
    setTimer(0);
    setIsTimerActive(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div>
        <div className="main"> 
            <header>
                <h1>Time: {formatTime(timer)}</h1>
                <button onClick={reset}>Reset</button>
            </header>
            <main>
                {pairs.map((pair, index) => (
                <div
                    key={index}
                    className={`card ${flippedStates[index] ? 'flipped' : ''} ${matchedPairs.includes(pair.icon) ? 'matched' : ''}`}
                    onClick={() => handleClick(index)}
                >
                    <div className="card-front">
                    <FontAwesomeIcon icon={faCircleQuestion} />
                    </div>
                    <div className="card-back">
                    <Card icon={pair.icon} />
                    </div>
                </div>
                ))}
            </main>
        </div>
        {popUp && (
            <div className="popUp" onClick={() => setPopUp(false)}>
                <div className="popUpBox">
                    <h1>Congratulations!</h1>
                    <h2>Your time: {formatTime(timer)}</h2>
                    <button onClick={() => setPopUp(false)}>Play Again</button>
                </div>
            </div>
        )}
    </div>
  );
};

export default Main