import { useContext, useRef } from "react";
import { TasksData } from "../context/TasksData";
import PropTypes from "prop-types";

const ConfirmationModal = ({ completedTasksDialogRef }) => {
  const context = useContext(TasksData);
  const { setCompletedTasks } = context;

  const dialogRef = useRef(null);

  const handleCancel = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const onCleanCompletedTasks = () => {
    setCompletedTasks([]);

    if (dialogRef.current) {
      dialogRef.current.close();
    }

    if (completedTasksDialogRef.current) {
      completedTasksDialogRef.current.close();
    }
  };

  return (
    <dialog id="confirmation-modal" className="modal backdrop:backdrop-blur-md backdrop:bg-black/25" ref={dialogRef}>
      <div className="modal-box bg-[#FDFCFB] bg-opacity-95 text-stone-800 border border-stone-200/80 shadow-2xl p-6 rounded-3xl max-w-sm mx-auto">
        <h2 className="text-lg font-semibold tracking-tight mb-2">
          Clear tasks history?
        </h2>
        <p className="text-sm text-stone-500 mb-6">
          This action will permanently delete your list of completed tasks and cannot be undone.
        </p>
        
        <div className="modal-action flex justify-end gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-xs font-semibold rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-all duration-200"
          >
            Cancel
          </button>
          
          <button
            onClick={onCleanCompletedTasks}
            className="px-4 py-2 text-xs font-semibold rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md shadow-red-500/10 transition-all duration-200"
          >
            Yes, Clear
          </button>
        </div>
      </div>
    </dialog>
  );
};

ConfirmationModal.propTypes = {
  completedTasksDialogRef: PropTypes.object.isRequired,
};

export default ConfirmationModal;
