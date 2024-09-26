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
    <dialog id="confirmation-modal" className="modal" ref={dialogRef}>
      <div className="modal-box bg-btnControl p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <div className="flex flex-col justify-start">
          <div className="w-full">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to clean your tasks history
            </h2>
          </div>
          <div className="w-full">
            <h3 className="text-md mb-4">This action cannot be undone.</h3>
          </div>
        </div>
        <div className="modal-action flex justify-end gap-4 mt-6">
        <div>
          <button
            onClick={onCleanCompletedTasks}
            className="btn text-bgSM outline"
          >
            Clean list
          </button>
        </div>
          <button
            type="button"
            onClick={handleCancel}
            className="btn bg-primary text-black px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

ConfirmationModal.propTypes = {
  completedTasksDialogRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }).isRequired, // Asegurarse que sea un objeto con una referencia actual
};

export default ConfirmationModal;
