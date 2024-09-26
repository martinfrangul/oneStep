import { useState, createContext, useEffect } from "react";
import PropTypes from "prop-types";

const TasksData = createContext();

const TasksDataProvider = ({ children }) => {


  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompletedTasks = localStorage.getItem('completedTasks');
    return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);


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
