import { useContext, useEffect, useState } from "react";
import "../styles/Counter.css";
import { CounterContext } from "../context/CounterContext";

function Counter() {
  /////////////// STATE ///////////////

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [playPause, setPlayPause] = useState(false);
  const [started, setStarted] = useState(false);
  const [bgColor, setBgColor] = useState("background-W");

  const context = useContext(CounterContext);
  const { mode, setMode, counterLap, setCounterLap } = context;

  // Object to define modes and their properties
  const modes = {
    work: { minutes: 25, bgColor: "background-W" },
    shortBreak: { minutes: 5, bgColor: "background-SB" },
    longBreak: { minutes: 15, bgColor: "background-LB" },
  };

  useEffect(() => {
    // Update mode when component mounts or mode changes
    setModeHandler(mode);
  }, [mode]);

  // Function to handle mode changes
  const setModeHandler = (newMode) => {
    setMode(newMode);
    setMinutes(modes[newMode].minutes);
    setBgColor(modes[newMode].bgColor);
    if (newMode === "longBreak") {
      setCounterLap(4);
    }
  };

  ////////////// HANDLERS //////////////

  const onStartHandler = () => {
    if (!started) {
      setStarted(true);
    }
    setPlayPause(!playPause);
  };

  const onResetHandler = () => {
    setModeHandler("work");
    setSeconds(0);
    setPlayPause(false);
    setStarted(false);
    setCounterLap(4);
  };

  const onSkipHandler = () => {
    setSeconds(0);
    setPlayPause(false);
    setStarted(false);

    if (mode === "work") {
      if (counterLap > 1) {
        setCounterLap((prev) => prev - 1);
        setModeHandler("shortBreak");
      } else {
        setModeHandler("longBreak");
      }
    } else if (mode === "shortBreak" || mode === "longBreak") {
      setModeHandler("work");
    }
  };

  //////////// COUNTER /////////////////

  useEffect(() => {
    let intervalId;

    if (playPause && started) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          if (mode === "work") {
            if (counterLap > 1) {
              setCounterLap((prev) => prev - 1);
              setModeHandler("shortBreak");
            } else {
              setModeHandler("longBreak");
            }
          } else {
            setModeHandler("work");
          }
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [playPause, seconds, minutes, started, counterLap, mode]);

  return (
    <div className="flex w-full justify-center">
      <div
        className={`flex flex-col justify-center w-fit items-center m-auto mx-3 mt-6 p-5 rounded-2xl z-10 ${bgColor} shadow-lg`}
      >
        <h2 className="text-5xl">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h2>
        <div className="btnCont">
          <button className="button-52" onClick={onStartHandler}>
            {playPause ? "PAUSE" : "PLAY"}
          </button>
          <button className="button-52" onClick={onResetHandler}>
            RESET
          </button>
          <button className="button-52" onClick={onSkipHandler}>
            SKIP
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;
