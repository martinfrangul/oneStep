import "./App.css";
import Navbar from "./components/Navbar";
import Counter from "./components/Counter";
import TaskManager from "./components/TaskManager";
import { TasksDataProvider } from "./context/TasksData";
import TaskPanel from "./components/TaskPanel";
import { CounterContextProvider } from "./context/CounterContext";
import ConfigCounter from "./components/ConfigCounter";
import CompletedTasks from "./components/CompletedTasks";
import { AlertContextProvider } from "./context/AlertContext";

const App = () => {
  return (
    <TasksDataProvider>
      <AlertContextProvider>
        <CounterContextProvider>
          <ConfigCounter />
          <CompletedTasks />

          <div className="flex flex-col min-h-screen w-full transition-all duration-300">
            <Navbar />
            
            <main className="flex-grow flex flex-col items-center justify-start py-8 px-4 md:px-12 max-w-5xl mx-auto w-full gap-8">
              {/* Grid Layout for Timer and Tasks */}
              <div className="w-full flex flex-col lg:flex-row gap-8 items-start justify-center mt-4">
                
                {/* Timer & Task Creator Section */}
                <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
                  <Counter />
                  <TaskManager />
                </div>

                {/* Tasks List Panel */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                  <div className="p-6 rounded-3xl bg-theme-card border border-theme-ui/30 shadow-2xl transition-all duration-300">
                    <h2 className="text-xl font-semibold mb-4 tracking-tight">
                      Focus Checklist
                    </h2>
                    <TaskPanel />
                  </div>
                </div>

              </div>
            </main>
          </div>
        </CounterContextProvider>
      </AlertContextProvider>
    </TasksDataProvider>
  );
};

export default App;
