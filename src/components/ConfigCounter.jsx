import { useContext, useState, useRef } from "react";
import { CounterContext } from "../context/CounterContext";

const ConfigCounter = () => {
  const context = useContext(CounterContext);
  const {
    counterLap,
    setCounterLap,
    setWorkMinutes,
    setSRkMinutes,
    setLRMinutes,
    workMinutes,
    SRMinutes,
    LRMinutes,
    setInitialCounterLap
  } = context;

  const [tempWorkMinutes, setTempWorkMinutes] = useState(workMinutes);
  const [tempSRMinutes, setTempSRMinutes] = useState(SRMinutes);
  const [tempLRMinutes, setTempLRMinutes] = useState(LRMinutes);
  const [tempCounterLap, setTempCounterLap] = useState(counterLap);

  const [errors, setErrors] = useState({});

  const dialogRef = useRef(null);

  const handleAccept = () => {
    const validationErrors = {};

    if (!tempWorkMinutes || isNaN(tempWorkMinutes) || tempWorkMinutes <= 0) {
      validationErrors.workMinutes = "Please enter a valid work time.";
    }

    if (!tempSRMinutes || isNaN(tempSRMinutes) || tempSRMinutes <= 0) {
      validationErrors.SRMinutes = "Please enter a valid short rest time.";
    }

    if (!tempLRMinutes || isNaN(tempLRMinutes) || tempLRMinutes <= 0) {
      validationErrors.LRMinutes = "Please enter a valid long rest time.";
    }

    if (!tempCounterLap || isNaN(tempCounterLap) || tempCounterLap <= 0) {
      validationErrors.counterLap = "Please enter a valid lap interval.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Si no hay errores, actualiza los valores
    setWorkMinutes(tempWorkMinutes);
    setSRkMinutes(tempSRMinutes);
    setLRMinutes(tempLRMinutes);
    setCounterLap(tempCounterLap);
    setInitialCounterLap(tempCounterLap);
    setErrors({});
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleCancel = () => {
    setTempWorkMinutes(workMinutes);
    setTempSRMinutes(SRMinutes);
    setTempLRMinutes(LRMinutes);
    setTempCounterLap(counterLap);
    setErrors({});
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleResetDefault = () => {
    setTempWorkMinutes(workMinutes);
    setTempSRMinutes(SRMinutes);
    setTempLRMinutes(LRMinutes);
    setTempCounterLap(counterLap);
    setErrors({});

  }

  const changeWorkHandler = (value) => {
    setTempWorkMinutes(value === "" ? "" : parseInt(value));
  };

  const changeSRHandler = (value) => {
    setTempSRMinutes(value === "" ? "" : parseInt(value));
  };

  const changeLRHandler = (value) => {
    setTempLRMinutes(value === "" ? "" : parseInt(value));
  };

  const changeLapHandler = (value) => {
    setTempCounterLap(value === "" ? "" : parseInt(value));
  };

  return (
    <dialog id="config-modal" className="modal" ref={dialogRef}>
      <div className="modal-box bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-semibold mb-4">Configuration</h2>
          <button
            type="button"
            onClick={handleResetDefault}
            className="flex justify-center font-semibold items-center p-3 btn-sm btn-active bg-bgW text-black rounded-md"
          >
            Default values
          </button>
        </div>


        <label htmlFor="user-work" className="block text-sm font-medium text-gray-700">Work</label>
        <input
          id="user-work"
          type="number"
          value={tempWorkMinutes}
          onChange={(e) => changeWorkHandler(e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 ${errors.workMinutes ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.workMinutes && <p className="mt-1 text-red-500 text-sm">{errors.workMinutes}</p>}

        <label htmlFor="user-SR" className="block text-sm font-medium text-gray-700 mt-4">Short rest</label>
        <input
          id="user-SR"
          type="number"
          value={tempSRMinutes}
          onChange={(e) => changeSRHandler(e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 ${errors.SRMinutes ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.SRMinutes && <p className="mt-1 text-red-500 text-sm">{errors.SRMinutes}</p>}

        <label htmlFor="user-LR" className="block text-sm font-medium text-gray-700 mt-4">Long rest</label>
        <input
          id="user-LR"
          type="number"
          value={tempLRMinutes}
          onChange={(e) => changeLRHandler(e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 ${errors.LRMinutes ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.LRMinutes && <p className="mt-1 text-red-500 text-sm">{errors.LRMinutes}</p>}

        <label htmlFor="counter-lap" className="block text-sm font-medium text-gray-700 mt-4">Long break interval</label>
        <input
          id="counter-lap"
          type="number"
          value={tempCounterLap}
          onChange={(e) => changeLapHandler(e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 ${errors.counterLap ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.counterLap && <p className="mt-1 text-red-500 text-sm">{errors.counterLap}</p>}

        <div className="modal-action flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={handleAccept}
            className="btn bg-secondary text-black px-4 py-2 rounded-md"
          >
            Accept
          </button>
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

export default ConfigCounter;
