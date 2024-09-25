import { useState, createContext } from "react";
import PropTypes from "prop-types";

const CounterContext = createContext();

const CounterContextProvider = ({ children }) => {
  const [mode, setMode] = useState("work");
  const [counterLap, setCounterLap] = useState(4);
  const [initialCounterLap, setInitialCounterLap] = useState(4);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [SRMinutes, setSRkMinutes] = useState(5);
  const [LRMinutes, setLRMinutes] = useState(15);
  const [soundToggle, setSoundToggle] = useState(true);

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
        setSRkMinutes,
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
