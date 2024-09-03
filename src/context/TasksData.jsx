import { useState, createContext } from "react";

const TasksData = createContext();

const TasksDataProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  return (
    <TasksData.Provider
      value={{
        tasks, setTasks
      }}
    >
      {children}
    </TasksData.Provider>
  );
};

export {TasksData, TasksDataProvider};
