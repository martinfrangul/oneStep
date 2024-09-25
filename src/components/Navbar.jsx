import logo from "../assets/images/logoOneStep.png";
import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

const Navbar = () => {
  
  const context = useContext(CounterContext);
  const { mode, setMode, setCounterLap, initialCounterLap } = context;
  

  const selecWModeHandler = () => {
    setMode("work");
    setCounterLap(initialCounterLap);
  };

  const selectSRModeHandler = () => {
    setMode("shortBreak");
    setCounterLap(initialCounterLap);
  };

  const selectLRModeHandler = () => {
    setMode("longBreak");
    setCounterLap(initialCounterLap);
  };

  return (
    <div className="border-b-2 border-solid border-gray-700 shadow-lg shadow-gray-500 w-full h-fit bg-black bg-opacity-20 flex flex-row justify-evenly items-center">
      
      <div className="flex flex-col justify-center w-1/2 items-center font-semibold text-lg m-4 gap-3">
        <button
          className={`w-full md:w-2/5 min-w-fit text-center shadow-lg border-[0.5px] border-solid border-black px-2 rounded-lg ${
            mode === "work" ? "bg-bgW" : ""
          }`}
        >
          <div className="px-2" onClick={selecWModeHandler}>
            Time to work!
          </div>
        </button>
        <button
          className={`w-full md:w-2/5 min-w-fit text-center shadow-lg border-[0.5px] border-solid border-black px-2 rounded-lg ${
            mode === "shortBreak" ? "bg-bgSR" : ""
          }`}
        >
          <div className="px-2" onClick={selectSRModeHandler}>
            Short rest
          </div>
        </button>
        <button
          className={`w-full md:w-2/5 min-w-fit text-center shadow-lg border-[0.5px] border-solid border-black px-2 rounded-lg ${
            mode === "longBreak" ? "bg-bgLR text-[#FDFDAC]" : ""
          }`}
        >
          <div className="px-2" onClick={selectLRModeHandler}>
            Long rest!
          </div>
        </button>
      </div>
      <div className="flex justify-center w-1/2 m-4">
        <img
          className="w-32 lg:w-32 flex"
          src={logo}
          alt="Logo"
        />
      </div>
    </div>
  );
};

export default Navbar;
