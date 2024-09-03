import { useState, useContext } from 'react';
import { PlusIcon } from 'lucide-react'
import { TasksData } from '../context/TasksData';

const TaskManager = () => {
  const [newTask, setNewTask] = useState("");

  const context = useContext(TasksData)

  const { tasks, setTasks } = context;

  const addTask = () => {
    if (newTask.trim() !== '' && tasks.filter(task => !task.completed).length < 5) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  // ADD TASK WITH ENTER KEY
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask(); // Llamar a la función addTask si se presiona Enter
    }
  };

  return (
    <div className="max-w-[20rem] p-6 bg-secondary rounded-lg shadow-lg transform transition-all duration-300">
      <h1 className="text-3xl font-bold text-textLogo mb-6 text-center">Tasks</h1>
      <div className="flex mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="New task"
          className="flex-grow p-3 rounded-l-lg bg-gray-700 text-btnControl font-semibold focus:outline-none"
        />
        <button 
          onClick={addTask}
          disabled={tasks.filter(task => !task.completed).length >= 5}
          className={`p-3 rounded-r-lg bg-btnControl text-gray-100 transition-colors duration-300 
            ${tasks.filter(task => !task.completed).length >= 5 ? 'cursor-not-allowed opacity-50' : 'hover:bg-yellow-200'}`}
        >
          <PlusIcon className="h-5 w-5 text-textLogo" />
        </button>
      </div>
      <p className="mt-6 text-sm text-center  text-textLogo">
        Active tasks: {tasks.filter(task => !task.completed).length}/5
      </p>
    </div>
  )
}

export default TaskManager;
