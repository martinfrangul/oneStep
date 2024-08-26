import { useEffect, useState } from "react";
import "../styles/Counter.css";

function Counter() {
  /////////////// STATE ///////////////

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [playPause, setPlayPause] = useState(false);
  const [mode, setMode] = useState("work");
  const [started, setStarted] = useState(false);
  const [counterLap, setCounterLap] = useState(4);
  const [bgColor, setBgColor] = useState("background-W");

  const work = () => {
    setMode("work");
    setMinutes(25);
    setBgColor("background-W");
  };

  const shortBreak = () => {
    setMode("shortBreak");
    setMinutes(5);
    setBgColor("background-SB");
  };

  const longBreak = () => {
    setMode("longBreak");
    setMinutes(15);
    setBgColor("background-LB");
    setCounterLap(4);
  };

  ////////////// HANDLERS //////////////

  const onStartHandler = () => {
    setPlayPause(!playPause);
  };

  const onResetHandler = () => {
    if (mode === "work") {
      work();
    }

    if (mode === "shortBreak") {
      shortBreak();
    }

    if (mode === "longBreak") {
      longBreak();
    }
    setSeconds(0);
    setPlayPause(false);
    setStarted(false);
  };

  const onSkipHandler = () => {
    setSeconds(0);
    setPlayPause(false);
    setStarted(false);
    if (mode !== "work") {
      work();
      setPlayPause(false);
    } else if (mode === "work" && (counterLap - 1) > 0) {
      shortBreak();
      setCounterLap((prev) => prev - 1);
      setPlayPause(false);
    } else {
      longBreak();
    }
  };

  //////////// COUNTER /////////////////

  useEffect(() => {
    let intervalId;

    if (playPause) {
      setStarted(true);
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (mode !== "work") {
            work();
            setPlayPause(false);
          } else if (mode === "work" && (counterLap - 1) > 0) {
            shortBreak();
            setCounterLap((prev) => prev - 1);
            setPlayPause(false);
          } else {
            longBreak();
            setPlayPause(false);
          }
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };

    // eslint-disable-next-line
  }, [seconds, playPause, minutes, started, counterLap]);

  return (
    <div className="flex w-full justify-center xl:justify-start">
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
