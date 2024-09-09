import logo from "../assets/logoOneStep.png";
import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

const Navbar = () => {
  const context = useContext(CounterContext);
  const { mode, setMode, setCounterLap } = context;

  const selecWModeHandler = () => {
    setMode("work");
    setCounterLap(4);
  };

  const selectSRModeHandler = () => {
    setMode("shortBreak");
    setCounterLap(4);
  };

  const selectLRModeHandler = () => {
    setMode("longBreak");
    setCounterLap(4);
  };

  return (
    <div className="border-b-2 border-solid border-gray-700 shadow-lg shadow-gray-500 w-full h-fit bg-black bg-opacity-20 flex flex-row justify-evenly items-center">
      <div className="flex justify-center w-1/2 m-4">
        <img
          className="w-32 lg:w-44 rounded-xl shadow-md flex"
          src={logo}
          alt="Logo"
        />
      </div>
      <div className="flex flex-col justify-center w-1/2 items-start lg:items-center font-semibold text-lg m-4 gap-3">
        <button
          className={`w-full lg:w-1/2 text-center shadow-lg border-[0.5px] border-solid border-black px-2 rounded-lg ${
            mode === "work" ? "bg-bgW" : ""
          }`}
        >
          <div className="px-2" onClick={selecWModeHandler}>
            Time to work!
          </div>
        </button>
        <button
          className={`w-full lg:w-1/2 text-center shadow-lg border-[0.5px] border-solid border-black px-2 rounded-lg ${
            mode === "shortBreak" ? "bg-bgSR" : ""
          }`}
        >
          <div className="px-2" onClick={selectSRModeHandler}>
            Short rest
          </div>
        </button>
        <button
          className={`w-full lg:w-1/2 text-center shadow-lg border-[0.5px] border-solid border-black px-2 rounded-lg ${
            mode === "longBreak" ? "bg-bgLR" : ""
          }`}
        >
          <div className="px-2" onClick={selectLRModeHandler}>
            Long rest!
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
