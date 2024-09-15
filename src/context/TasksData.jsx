import { useState, createContext } from "react";
import PropTypes from "prop-types";

const TasksData = createContext();

const TasksDataProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  return (
    <TasksData.Provider
      value={{
        tasks, setTasks, completedTasks, setCompletedTasks
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
