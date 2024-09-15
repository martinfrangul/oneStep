import { useContext, useRef } from "react";
import { TasksData } from "../context/TasksData";
import ConfirmationModal from "../components/ConfirmationModal";

const CompletedTasks = () => {
  const context = useContext(TasksData);
  const { completedTasks } = context;

  const dialogRef = useRef(null);

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <dialog id="completed-tasks-modal" className="modal" ref={dialogRef}>
      <div className="modal-box bg-primary p-0 rounded-2xl shadow-lg max-w-sm mx-auto border-[8px] border-primary border-solid overflow-y-auto overflow-hidden">
        <div className="flex flex-row justify-between ">
          <h2 className="text-lg text-center w-full font-semibold p-6">
            Latest completed tasks
          </h2>
        </div>
        <div className="p-6 gap-3 bg-white">
          {completedTasks.length !== 0 ? (
            completedTasks.slice(-8).map((task, index) => (
              <div
                className="flex flex-row items-center gap-2 font-semibold text-xl"
                key={index}
              >
                <h1>{task.text}</h1>
              </div>
            ))
          ) : (
            <h1 className="italic text-center p-6 bg-white">No completed tasks yet</h1>
          )}
        </div>
        <div className="modal-action mt-1 flex justify-end gap-4 p-6 bg-white">
          <button
            className="btn border-2 border-bgLR bg-transparent text-red-500 hover:bg-opacity-50"
            onClick={() =>
              document.getElementById("confirmation-modal").showModal()
            }
            disabled={completedTasks.length === 0}
          >
            Delete all
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="btn text-black px-4 py-2 rounded-md border-1 border-black"
          >
            Close
          </button>

          <ConfirmationModal completedTasksDialogRef={dialogRef} />
        </div>
      </div>
    </dialog>
  );
};

export default CompletedTasks;
