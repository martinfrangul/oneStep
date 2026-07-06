import { useContext, useRef } from "react";
import { TasksData } from "../context/TasksData";
import ConfirmationModal from "../components/ConfirmationModal";

const CompletedTasks = () => {
  const { completedTasks } = useContext(TasksData);

  const dialogRef = useRef(null);

  const handleClose = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog
      id="completed-tasks-modal"
      className="modal backdrop:backdrop-blur-md backdrop:bg-black/25"
      ref={dialogRef}
    >
      <div className="modal-box bg-[#FDFCFB]/98 text-stone-800 border border-stone-200/80 shadow-2xl p-6 rounded-3xl max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-4 tracking-tight">
          Completed Tasks
        </h2>

        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto my-4 pr-1">
          {completedTasks.length !== 0 ? (
            completedTasks.slice(-8).map((task, index) => (
              <div
                className="py-2.5 px-1 border-b border-stone-100 text-sm font-medium text-stone-600"
                key={index}
              >
                {task.text}
              </div>
            ))
          ) : (
            <div className="italic text-center py-6 text-sm text-stone-400">
              No completed tasks yet
            </div>
          )}
        </div>

        <div className="modal-action flex justify-between gap-4 mt-6">
          <button
            className="px-4 py-2 rounded-full border border-red-500/20 text-red-500 hover:bg-red-500/10 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            onClick={() =>
              document.getElementById("confirmation-modal").showModal()
            }
            disabled={completedTasks.length === 0}
          >
            Clear History
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2 text-xs font-semibold rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-all duration-200"
          >
            Close
          </button>
        </div>

        <ConfirmationModal completedTasksDialogRef={dialogRef} />
      </div>
    </dialog>
  );
};

export default CompletedTasks;
