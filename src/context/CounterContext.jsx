import { useState, createContext } from "react";

const CounterContext = createContext();

const CounterContextProvider = ({ children }) => {
  const [mode, setMode] = useState("work");
  const [counterLap, setCounterLap] = useState(4);


  


  return (
    <CounterContext.Provider
      value={{
        mode, setMode, counterLap, setCounterLap
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};

export {CounterContext, CounterContextProvider};
