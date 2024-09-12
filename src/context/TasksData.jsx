import { useState, createContext } from "react";
import PropTypes from "prop-types";

const TasksData = createContext();

const TasksDataProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  return (
    <TasksData.Provider
      value={{
        tasks, setTasks, archivedTasks, setArchivedTasks
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
