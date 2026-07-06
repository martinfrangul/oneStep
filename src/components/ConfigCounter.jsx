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

    if (!workMinutes || isNaN(workMinutes) || workMinutes <= 0) {
      validationErrors.workMinutes = "Please enter a valid work time.";
    }

    if (!SRMinutes || isNaN(SRMinutes) || SRMinutes <= 0) {
      validationErrors.SRMinutes = "Please enter a valid short rest time.";
    }

    if (!LRMinutes || isNaN(LRMinutes) || LRMinutes <= 0) {
      validationErrors.LRMinutes = "Please enter a valid long rest time.";
    }

    if (!counterLap || isNaN(counterLap) || counterLap <= 0) {
      validationErrors.counterLap = "Please enter a valid lap interval.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
    <dialog id="config-modal" className="modal backdrop:backdrop-blur-md backdrop:bg-black/25" ref={dialogRef}>
      <div className="modal-box bg-[#FDFCFB] bg-opacity-95 text-stone-800 border border-stone-200/80 shadow-2xl p-6 rounded-3xl max-w-sm mx-auto">
        <div className="flex flex-row items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">Configuration</h2>
          <button
            type="button"
            onClick={handleResetDefault}
            className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-semibold rounded-full transition-all duration-200"
          >
            Reset Defaults
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="user-work" className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
              Work Minutes
            </label>
            <input
              id="user-work"
              type="number"
              value={workMinutes}
              onChange={(e) => changeWorkHandler(e.target.value)}
              className={`block w-full px-4 py-2.5 bg-stone-100/70 text-stone-800 border rounded-2xl focus:outline-none focus:border-stone-400 transition-all duration-200 text-sm font-medium ${
                errors.workMinutes ? "border-red-500" : "border-stone-200"
              }`}
            />
            {errors.workMinutes && <p className="mt-1 text-red-500 text-xs">{errors.workMinutes}</p>}
          </div>

          <div>
            <label htmlFor="user-SR" className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
              Short Rest Minutes
            </label>
            <input
              id="user-SR"
              type="number"
              value={SRMinutes}
              onChange={(e) => changeSRHandler(e.target.value)}
              className={`block w-full px-4 py-2.5 bg-stone-100/70 text-stone-800 border rounded-2xl focus:outline-none focus:border-stone-400 transition-all duration-200 text-sm font-medium ${
                errors.SRMinutes ? "border-red-500" : "border-stone-200"
              }`}
            />
            {errors.SRMinutes && <p className="mt-1 text-red-500 text-xs">{errors.SRMinutes}</p>}
          </div>

          <div>
            <label htmlFor="user-LR" className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
              Long Rest Minutes
            </label>
            <input
              id="user-LR"
              type="number"
              value={LRMinutes}
              onChange={(e) => changeLRHandler(e.target.value)}
              className={`block w-full px-4 py-2.5 bg-stone-100/70 text-stone-800 border rounded-2xl focus:outline-none focus:border-stone-400 transition-all duration-200 text-sm font-medium ${
                errors.LRMinutes ? "border-red-500" : "border-stone-200"
              }`}
            />
            {errors.LRMinutes && <p className="mt-1 text-red-500 text-xs">{errors.LRMinutes}</p>}
          </div>

          <div>
            <label htmlFor="counter-lap" className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
              Long Rest Interval (Laps)
            </label>
            <input
              id="counter-lap"
              type="number"
              value={initialCounterLap}
              onChange={(e) => changeLapHandler(e.target.value)}
              className={`block w-full px-4 py-2.5 bg-stone-100/70 text-stone-800 border rounded-2xl focus:outline-none focus:border-stone-400 transition-all duration-200 text-sm font-medium ${
                errors.counterLap ? "border-red-500" : "border-stone-200"
              }`}
            />
            {errors.counterLap && <p className="mt-1 text-red-500 text-xs">{errors.counterLap}</p>}
          </div>
        </div>

        <div className="modal-action flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-xs font-semibold rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-all duration-200"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={handleAccept}
            className="px-5 py-2 text-xs font-semibold rounded-full bg-stone-800 hover:bg-stone-900 text-white transition-all duration-200 shadow-md shadow-stone-800/10"
          >
            Save Changes
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfigCounter;
