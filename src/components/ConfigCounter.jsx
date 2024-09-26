import { useContext, useState, useRef } from "react";
import { CounterContext } from "../context/CounterContext";

const ConfigCounter = () => {
  const context = useContext(CounterContext);
  const {
    counterLap,
    setCounterLap,
    setWorkMinutes,
    setSRMinutes,
    setLRMinutes,
    workMinutes,
    SRMinutes,
    LRMinutes,
    setInitialCounterLap,
    initialCounterLap
  } = context;

  const [errors, setErrors] = useState({});
  const dialogRef = useRef(null);

  const handleAccept = () => {
    const validationErrors = {};

    // Validación de los minutos de trabajo
    if (!workMinutes || isNaN(workMinutes) || workMinutes <= 0) {
      validationErrors.workMinutes = "Please enter a valid work time.";
    }

    // Validación de los minutos de descanso corto
    if (!SRMinutes || isNaN(SRMinutes) || SRMinutes <= 0) {
      validationErrors.SRMinutes = "Please enter a valid short rest time.";
    }

    // Validación de los minutos de descanso largo
    if (!LRMinutes || isNaN(LRMinutes) || LRMinutes <= 0) {
      validationErrors.LRMinutes = "Please enter a valid long rest time.";
    }

    // Validación del intervalo de vueltas
    if (!counterLap || isNaN(counterLap) || counterLap <= 0) {
      validationErrors.counterLap = "Please enter a valid lap interval.";
    }

    // Si hay errores, los establece
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Aquí se actualizan los valores directamente
    setWorkMinutes(workMinutes);
    setSRMinutes(SRMinutes);
    setLRMinutes(LRMinutes);
    setCounterLap(counterLap);
    setInitialCounterLap(counterLap);
    setErrors({});

    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleCancel = () => {
    setErrors({});
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const defaultWorkMinutes = 25;
  const defaultSRMinutes = 5;
  const defaultLRMinutes = 15;
  const defaultCounterLap = 4;

  const handleResetDefault = () => {
    setWorkMinutes(defaultWorkMinutes);
    setSRMinutes(defaultSRMinutes);
    setLRMinutes(defaultLRMinutes);
    setCounterLap(defaultCounterLap);
    setInitialCounterLap(defaultCounterLap);
    setErrors({});
  };

  const changeWorkHandler = (value) => {
    setWorkMinutes(value === "" ? "" : parseInt(value));
  };

  const changeSRHandler = (value) => {
    setSRMinutes(value === "" ? "" : parseInt(value));
  };

  const changeLRHandler = (value) => {
    setLRMinutes(value === "" ? "" : parseInt(value));
  };

  const changeLapHandler = (value) => {
    setCounterLap(value === "" ? "" : parseInt(value));
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
          value={workMinutes}
          onChange={(e) => changeWorkHandler(e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 ${errors.workMinutes ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.workMinutes && <p className="mt-1 text-red-500 text-sm">{errors.workMinutes}</p>}

        <label htmlFor="user-SR" className="block text-sm font-medium text-gray-700 mt-4">Short rest</label>
        <input
          id="user-SR"
          type="number"
          value={SRMinutes}
          onChange={(e) => changeSRHandler(e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 ${errors.SRMinutes ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.SRMinutes && <p className="mt-1 text-red-500 text-sm">{errors.SRMinutes}</p>}

        <label htmlFor="user-LR" className="block text-sm font-medium text-gray-700 mt-4">Long rest</label>
        <input
          id="user-LR"
          type="number"
          value={LRMinutes}
          onChange={(e) => changeLRHandler(e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 ${errors.LRMinutes ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.LRMinutes && <p className="mt-1 text-red-500 text-sm">{errors.LRMinutes}</p>}

        <label htmlFor="counter-lap" className="block text-sm font-medium text-gray-700 mt-4">Long break interval</label>
        <input
          id="counter-lap"
          type="number"
          value={initialCounterLap}
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
