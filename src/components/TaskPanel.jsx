import { Trash, Check } from "lucide-react";
import { TasksData } from "../context/TasksData";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/TaskPanel.css"

const TaskPanel = () => {
  const context = useContext(TasksData);
  const { tasks, setTasks, setCompletedTasks } = context;
  const [fadingOut, setFadingOut] = useState(null);

  const activeTasks = tasks.filter(task => !task.completed);

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
    setFadingOut(null);
  };

  return (
    <div className="w-full">
      {activeTasks.length === 0 ? (
        <div className="py-8 text-center text-sm opacity-50 font-medium">
          No active tasks. Add a task above to start focusing!
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          <AnimatePresence>
            {activeTasks.map((task) => (
              <motion.li
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: fadingOut === task.id ? 0 : 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onAnimationComplete={() =>
                  fadingOut === task.id && onAnimationComplete(task.id)
                }
                className="w-full flex items-center justify-between p-4 bg-theme-ui/15 border border-theme-ui/30 rounded-2xl shadow-sm hover:translate-x-1 transition-all duration-200"
              >
                <div
                  className="flex-grow text-sm font-medium break-words overflow-hidden pr-4 leading-relaxed"
                >
                  {task.text}
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => completeTask(task.id)}
                    className="p-2 rounded-full bg-theme-accent/10 hover:bg-theme-accent text-theme-accent hover:text-[var(--theme-bg)] transition-all duration-200"
                    title="Complete task"
                    aria-label="Complete task"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="p-2 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all duration-200"
                    title="Delete task"
                    aria-label="Delete task"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default TaskPanel;
