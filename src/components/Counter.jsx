import { useContext, useEffect, useState } from "react";
import "../styles/Counter.css";
import { CounterContext } from "../context/CounterContext";
import Alert from "./Alert";
import VisualTimer from "./VisualTimer";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";

function Counter() {
  const {
    mode,
    setMode,
    counterLap,
    setCounterLap,
    modes,
    initialCounterLap,
  } = useContext(CounterContext);

  /////////////// STATE ///////////////
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(modes[mode].minutes);
  const [playPause, setPlayPause] = useState(false);
  const [started, setStarted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setSeconds(0);
    setMinutes(modes[mode].minutes);
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
        setAlertMessage("Good job! Have a short rest!");
        setCounterLap((prev) => prev - 1);
        setModeHandler("shortBreak");
      } else {
        setAlertMessage("Great work! Let's have a long rest now!");
        setModeHandler("longBreak");
        setCounterLap(initialCounterLap);
      }
    } else if (mode === "shortBreak" || mode === "longBreak") {
      setAlertMessage("Time to get back to work!");
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
          setShowAlert(true);
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
    // eslint-disable-next-line
  }, [playPause, seconds, minutes, started, mode]);

  // Calculate completed laps in the current set
  const completedLapsCount = initialCounterLap - counterLap;

  return (
    <div className="flex flex-col items-center w-full max-w-md px-6 py-8 rounded-3xl bg-theme-card border border-theme-ui/30 shadow-2xl transition-all duration-300">
      <Alert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={alertMessage}
      />

      {/* Mode selectors inside the card for concentration */}
      <div className="flex justify-center gap-1 p-1 bg-theme-ui/40 rounded-full w-fit mb-6 text-sm">
        <button
          onClick={() => {
            setMode("work");
            setCounterLap(initialCounterLap);
          }}
          className={`px-4 py-1.5 rounded-full transition-all duration-300 font-medium ${
            mode === "work"
              ? "bg-[var(--theme-bg)] text-[var(--theme-text)] shadow-md"
              : "opacity-60 hover:opacity-100"
          }`}
        >
          Work
        </button>
        <button
          onClick={() => {
            setMode("shortBreak");
            setCounterLap(initialCounterLap);
          }}
          className={`px-4 py-1.5 rounded-full transition-all duration-300 font-medium ${
            mode === "shortBreak"
              ? "bg-[var(--theme-bg)] text-[var(--theme-text)] shadow-md"
              : "opacity-60 hover:opacity-100"
          }`}
        >
          Short Rest
        </button>
        <button
          onClick={() => {
            setMode("longBreak");
            setCounterLap(initialCounterLap);
          }}
          className={`px-4 py-1.5 rounded-full transition-all duration-300 font-medium ${
            mode === "longBreak"
              ? "bg-[var(--theme-bg)] text-[var(--theme-text)] shadow-md"
              : "opacity-60 hover:opacity-100"
          }`}
        >
          Long Rest
        </button>
      </div>

      {/* Burning candle or incense */}
      <VisualTimer
        mode={mode}
        minutes={minutes}
        seconds={seconds}
        totalMinutes={modes[mode].minutes}
        playPause={playPause}
      />

      {/* Digital clock display */}
      <div className="text-6xl font-light tracking-wide font-sans mt-2 mb-6">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>

      {/* Timer Controls */}
      <div className="flex items-center justify-center gap-6 w-full">
        <button
          onClick={onResetHandler}
          className="p-3.5 rounded-full bg-theme-ui/50 hover:bg-theme-ui text-[var(--theme-text)] transition-all duration-200"
          title="Reset timer"
        >
          <RotateCcw className="h-5 w-5" />
        </button>

        <button
          onClick={onStartHandler}
          className="p-5 rounded-full bg-[var(--theme-bg)] text-[var(--theme-text)] border border-theme-ui/60 hover:bg-theme-ui/40 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
          title={playPause ? "Pause" : "Start"}
        >
          {playPause ? (
            <Pause className="h-7 w-7 fill-current" />
          ) : (
            <Play className="h-7 w-7 fill-current translate-x-0.5" />
          )}
        </button>

        <button
          onClick={onSkipHandler}
          className="p-3.5 rounded-full bg-theme-ui/50 hover:bg-theme-ui text-[var(--theme-text)] transition-all duration-200"
          title="Skip mode"
        >
          <SkipForward className="h-5 w-5" />
        </button>
      </div>

      {/* Laps indicator dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: initialCounterLap }).map((_, i) => (
          <div
            key={i}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              i < completedLapsCount
                ? "bg-[var(--theme-text)]"
                : "border-2 border-[var(--theme-text)] bg-transparent"
            }`}
            title={`Lap ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Counter;
