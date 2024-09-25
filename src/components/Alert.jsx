import { useContext, useState } from 'react';
import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import ReactHowler from 'react-howler';
import { CounterContext } from '../context/CounterContext';

const Alert = ({ showAlert, setShowAlert, message, }) => {

const context = useContext(CounterContext)

const { soundToggle } = context;

  return (
    <Transition
      as={"div"}
      show={showAlert}
      enter="transition ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-0 z-50">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={() => setShowAlert(false)} />

        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <XMarkIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">¡Alerta!</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => setShowAlert(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      <ReactHowler
        src="/src/assets/sounds/alert.mp3"
        playing={showAlert && soundToggle} 
        loop={false} 
        volume={1.0}
      />
    </Transition>
  );
};

export default Alert;
