import "./App.css";
import Navbar from "./components/Navbar";
import Counter from "./components/Counter";
import TaskManager from "./components/TaskManager";
import { TasksDataProvider } from "./context/TasksData";
import TaskPanel from "./components/TaskPanel";

const App = () => {
  return (
    <TasksDataProvider>
      <div className="flex flex-col justify-start items-center w-full min-h-screen h-full bg-backgroundSM xl:bg-backgroundLG bg-cover bg-repeat-y bg-center">
        <Navbar />
        <div className="flex flex-col lg:flex-row w-full h-full justify-between">
          <div className="flex flex-col lg:w-6/12 h-full justify-center items-center gap-8">
            <Counter />
            <TaskManager />
          </div>
          <div className="flex justify-center w-10/12 md:w-6/12 h-full m-auto">
            <TaskPanel />
          </div>
        </div>
      </div>
    </TasksDataProvider>
  );
};

export default App;
