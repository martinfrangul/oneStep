import useLocalStorageState from '../hooks/useLocalStorageState';
import PropTypes from "prop-types";
import { createContext } from 'react';

const TasksData = createContext();

const TasksDataProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorageState('tasks', []);
  const [completedTasks, setCompletedTasks] = useLocalStorageState('completedTasks', []);

  return (
    <TasksData.Provider value={{ tasks, setTasks, completedTasks, setCompletedTasks }}>
      {children}
    </TasksData.Provider>
  );
};

TasksDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { TasksData, TasksDataProvider };
