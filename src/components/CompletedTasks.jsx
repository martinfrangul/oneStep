import { useContext, useState, useRef } from "react";
import { TasksData } from "../context/TasksData";

const CompletedTasks = () => {
  const context = useContext(TasksData);
  const { completedTask } = context;

  const dialogRef = useRef(null);

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <dialog id="completed-tasks-modal" className="modal" ref={dialogRef}>
      <div className="modal-box bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-semibold mb-4">Completed tasks</h2>
        </div>
<div>
{completedTask.map((task, index) => (
  <div key={index}>
    <h1 >{task.text}</h1>

  </div>
))}
</div>
        <div className="modal-action flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={handleClose}
            className="btn bg-primary text-black px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CompletedTasks;
