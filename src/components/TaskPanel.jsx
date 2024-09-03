import { TrashIcon, CheckIcon } from "lucide-react";
import { TasksData } from "../context/TasksData";
import { useContext, useState } from "react";
import { motion } from "framer-motion";

const TaskPanel = () => {
  const context = useContext(TasksData);

  const { tasks, setTasks } = context;

  const [deleting, setDeleting] = useState(null);

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setDeleting(id);
  };

  const onAnimationComplete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setDeleting(null); // Reinicia el estado de eliminación
  };

  return (
    <div className="min-w-[15rem] py-6 lg:w-2/4">
      <ul className="space-y-4">
        {tasks.map((task) => (
          <motion.li
          key={task.id}
          initial={{ opacity: 1 }}
          animate={{ opacity: deleting === task.id ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          onAnimationComplete={() => deleting === task.id && onAnimationComplete(task.id)}
          className="flex items-center p-4 bg-gray-700 text-btnControl rounded-lg shadow-md transition-transform duration-300 lg:hover:-translate-x-2"
        >
          <span
            className={`flex-grow text-lg transition-colors duration-300 
              ${
                task.completed
                  ? "line-through text-btnControl font-semibold opacity-85"
                  : "text-btnControl font-semibold"
              }`}
          >
            {task.text}
          </span>
          <button
            onClick={() => toggleTask(task.id)}
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
