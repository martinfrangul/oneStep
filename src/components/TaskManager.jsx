import { useState, useContext } from 'react';
import { Plus } from 'lucide-react'
import { TasksData } from '../context/TasksData';

const TaskManager = ({ inline = false }) => {
  const [newTask, setNewTask] = useState("");
  const context = useContext(TasksData);
  const { tasks, setTasks } = context;

  const activeTasksCount = tasks.filter(task => !task.completed).length;

  const addTask = () => {
    if (newTask.trim() !== '' && activeTasksCount < 5) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  // ADD TASK WITH ENTER KEY
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const content = (
    <div className="flex flex-col gap-4">
      <label htmlFor="task-input" className="text-sm font-medium opacity-80">
        Add Task
      </label>
      
      <div className="flex shadow-sm rounded-2xl overflow-hidden border border-theme-ui/40 focus-within:border-theme-accent/60 transition-all duration-200">
        <input
          id="task-input"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="What are you working on?"
          className="flex-grow px-4 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none text-base sm:text-sm font-medium"
        />
        <button 
          onClick={addTask}
          disabled={activeTasksCount >= 5}
          className={`px-4 bg-[var(--theme-bg)] text-[var(--theme-text)] border-l border-theme-ui/40 transition-all duration-200 flex items-center justify-center
            ${activeTasksCount >= 5 ? 'cursor-not-allowed opacity-50' : 'hover:bg-theme-ui/40 active:scale-95'}`}
          aria-label="Add new task"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex justify-between items-center text-xs opacity-60 font-medium">
        <span>Limit 5 active tasks</span>
        <span>{activeTasksCount} of 5 active</span>
      </div>
    </div>
  );

  if (inline) {
    return <div className="w-full">{content}</div>;
  }

  return (
    <div className="w-full max-w-md p-6 bg-theme-card border border-theme-ui/30 rounded-3xl shadow-2xl transition-all duration-300">
      {content}
    </div>
  )
}

export default TaskManager;
