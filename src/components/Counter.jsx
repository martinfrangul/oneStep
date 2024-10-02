import { useContext, useEffect, useState } from "react";
import "../styles/Counter.css";
import { CounterContext } from "../context/CounterContext";
import Alert from "./Alert";

function Counter() {
  const { mode, setMode, counterLap, setCounterLap, modes, initialCounterLap, } =
    useContext(CounterContext);

  /////////////// STATE ///////////////
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(modes[mode].minutes);
  const [playPause, setPlayPause] = useState(false);
  const [started, setStarted] = useState(false);
  const [bgColor, setBgColor] = useState(modes[mode].bgColor);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    setSeconds(0);
    setMinutes(modes[mode].minutes);
    setBgColor(modes[mode].bgColor);
    setPlayPause(false);
    setStarted(false);
  }, [mode, modes]);


  const setModeHandler = (newMode) => {
    setMode(newMode);
  };

  ////////////// HANDLERS //////////////

  const onStartHandler = () => {
    if (!started) setStarted(true);
    setPlayPause(!playPause);
  };

  const onResetHandler = () => {
    setModeHandler("work");
    setSeconds(0);
    setMinutes(modes["work"].minutes);
    setPlayPause(false);
    setStarted(false);
    setCounterLap(initialCounterLap);
  };

  const onSkipHandler = () => {
    setSeconds(0);
    setPlayPause(false);
    setStarted(false);

    if (mode === "work") {
      if (counterLap > 1) {
        setAlertMessage('Good job! Have a short rest!')
        setCounterLap((prev) => prev - 1);
        setModeHandler("shortBreak");
      } else {
        setAlertMessage("Great work! Let's have a long rest now!")

        setModeHandler("longBreak");
        setCounterLap(initialCounterLap);
      }
    } else if (mode === "shortBreak" || mode === "longBreak") {
      setAlertMessage('Time to get back to work!')
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
          onSkipHandler();
          setShowAlert(true)
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [playPause, seconds, minutes, started, mode]);

  return (
    <div className="flex w-full justify-center">
       <Alert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={alertMessage}
      />

      <div
        className={`flex flex-col justify-center w-11/12 items-center m-auto mt-6 p-6 rounded-2xl z-10 ${bgColor} shadow-lg`}
      >
        <div className="py-3">
          <h2 className="text-5xl">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </h2>
        </div>
        <div className="flex justify-center w-11/12">
          <button
            className="button-52 w-[88px] md:w-[138px]"
            onClick={onStartHandler}
          >
            {playPause ? "PAUSE" : "PLAY"}
          </button>
          <button
            className="button-52 w-[88px] md:w-[138px]"
            onClick={onResetHandler}
          >
            RESET
          </button>
          <button
            className="button-52 w-[88px] md:w-[138px]"
            onClick={onSkipHandler}
          >
            SKIP
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;
