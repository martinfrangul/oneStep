import { TrashIcon, CheckIcon } from "lucide-react";
import { TasksData } from "../context/TasksData";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import "../styles/TaskPanel.css"

const TaskPanel = () => {
  const context = useContext(TasksData);

  const { tasks, setTasks, setCompletedTasks } = context;

  const [fadingOut, setFadingOut] = useState(null);

  const completeTask = (id) => {
    const newArchivedTask = tasks.find((task) => task.id === id);
    setCompletedTasks((prevTasks) => [
      ...prevTasks,
      { ...newArchivedTask, completed: true },
    ]);
    setFadingOut(id);
  };

  const handleDelete = (id) => {
    setFadingOut(id);
  };

  const onAnimationComplete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setFadingOut(null); // Reinicia el estado de eliminación
  };

  return (
    <div className="min-w-[15rem] lg:w-2/4">
      <ul className="lg:flex lg:flex-col lg:justify-center lg:items-start space-y-5">
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 1 }}
            animate={{ opacity: fadingOut === task.id ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            onAnimationComplete={() =>
              fadingOut === task.id && onAnimationComplete(task.id)
            }
            className="w-full flex items-center p-4 bg-gray-700 text-btnControl rounded-lg shadow-md transition-transform duration-300 lg:hover:-translate-x-2"
          >
            <div
              className="flex-grow text-lg transition-colors duration-300 break-words-with-hypen overflow-hidden px-2"
            >
              {task.text}
            </div>
            <button
              onClick={() => completeTask(task.id)}
              className="mr-2 p-2 bg-btnControl rounded-full text-textLogo lg:hover:bg-gray-600 lg:hover:text-btnControl transition-colors duration-300"
            >
              <CheckIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleDelete(task.id)}
              className="p-2 bg-bgLR rounded-full hover:bg-gray-600 text-textLogo lg:hover:bg-gray-600 lg:hover:text-btnControl transition-colors duration-300"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPanel;
