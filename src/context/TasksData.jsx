import { useState, createContext } from "react";
import PropTypes from "prop-types";

const TasksData = createContext();

const TasksDataProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  return (
    <TasksData.Provider
      value={{
        tasks, setTasks, completedTask, setCompletedTask
      }}
    >
      {children}
    </TasksData.Provider>
  );
};

TasksDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {TasksData, TasksDataProvider};
