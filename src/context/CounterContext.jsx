import { useState, createContext } from "react";
import PropTypes from "prop-types";
import useLocalStorageState from "../hooks/useLocalStorageState";

const CounterContext = createContext();

const CounterContextProvider = ({ children }) => {
  const [mode, setMode] = useLocalStorageState("mode", "work");
  const [counterLap, setCounterLap] = useLocalStorageState("counterLap", 4);
  const [initialCounterLap, setInitialCounterLap] = useLocalStorageState("initialCounterLap", 4);
  const [workMinutes, setWorkMinutes] = useLocalStorageState("workMinutes", 25);
  const [SRMinutes, setSRMinutes] = useLocalStorageState("SRMinutes", 5);
  const [LRMinutes, setLRMinutes] = useLocalStorageState("LRMinutes", 15);
  const [soundToggle, setSoundToggle] = useState(false);

  const modes = {
    work: { minutes: workMinutes, bgColor: "background-W" },
    shortBreak: { minutes: SRMinutes, bgColor: "background-SB" },
    longBreak: { minutes: LRMinutes, bgColor: "background-LB" },
  };

  return (
    <CounterContext.Provider
      value={{
        mode,
        setMode,
        counterLap,
        setCounterLap,
        modes,
        setWorkMinutes,
        setSRMinutes,
        setLRMinutes,
        workMinutes,
        SRMinutes,
        LRMinutes,
        initialCounterLap,
        setInitialCounterLap,
        soundToggle,
        setSoundToggle,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};

CounterContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CounterContext, CounterContextProvider };
