import "./App.css";
import Navbar from "./components/Navbar";
import Counter from "./components/Counter";
import TaskManager from "./components/TaskManager";
import { TasksDataProvider } from "./context/TasksData";
import TaskPanel from "./components/TaskPanel";
import { CounterContextProvider } from "./context/CounterContext";
import ConfigCounter from "./components/ConfigCounter";

const App = () => {
  return (
    <TasksDataProvider>
      <CounterContextProvider>
        <ConfigCounter />
        <div className="flex flex-col justify-start items-center w-full min-h-screen bg-backgroundSM xl:bg-backgroundLG bg-cover bg-repeat-y bg-center">
          <Navbar />
          <div className="flex flex-col lg:flex-row w-full h-full justify-between">
            <div className="flex flex-col lg:w-6/12 h-full justify-start items-center gap-3">
              <Counter />
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Configuration
              </button>
              <TaskManager />
            </div>
            <div className="flex justify-center lg:items-start w-10/12 md:w-6/12 pt-5 lg:pt-14 lg:m-0 m-auto">
              <TaskPanel />
            </div>
          </div>
        </div>
      </CounterContextProvider>
    </TasksDataProvider>
  );
};

export default App;
