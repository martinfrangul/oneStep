import { useContext, useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { BellRing, X } from 'lucide-react';
import ReactHowler from 'react-howler';
import { AlertContext } from '../context/AlertContext';

import soundBell from '../assets/sounds/bell.mp3';
import soundChimes from '../assets/sounds/chimes.mp3';
import soundBeep from '../assets/sounds/beep.mp3';
import soundEscalate from '../assets/sounds/escalate.mp3';
import soundConstant from '../assets/sounds/constant.mp3';

const SOUNDS = {
  bell: soundBell,
  chimes: soundChimes,
  beep: soundBeep,
  escalate: soundEscalate,
  constant: soundConstant,
};

const Alert = () => {
  const { showAlert, setShowAlert, alertMessage, soundToggle, onConfirm, setOnConfirm, selectedSound } = useContext(AlertContext);
  const [playingSound, setPlayingSound] = useState(false);

  const handleClose = () => {
    setShowAlert(false);
    if (onConfirm) {
      onConfirm();
      setOnConfirm(null);
    }
  };

  useEffect(() => {
    if (showAlert && soundToggle) {
      setPlayingSound(true);
      // Auto silence after 3 seconds
      const timer = setTimeout(() => {
        setPlayingSound(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setPlayingSound(false);
    }
  }, [showAlert, soundToggle]);

  const currentSoundFile = SOUNDS[selectedSound] || soundBell;

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
        {/* Backdrop overlay with blur */}
        <div 
          className="fixed inset-0 bg-black/25 backdrop-blur-md transition-opacity" 
          onClick={handleClose} 
        />

        {/* Modal card */}
        <div className="bg-[#FDFCFB] bg-opacity-95 text-stone-800 border border-stone-200/80 rounded-3xl overflow-hidden shadow-2xl transform transition-all sm:max-w-md sm:w-full z-10 p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-700 transition-all duration-200"
            aria-label="Close alert"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col items-center text-center mt-2">
            {/* Alarm Icon */}
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-stone-100 text-stone-700 mb-4 animate-bounce">
              <BellRing className="h-7 w-7" />
            </div>

            <h3 className="text-xl font-semibold tracking-tight mb-2">
              {"Time's up!"}
            </h3>
            
            <p className="text-sm text-stone-500 leading-relaxed max-w-xs mb-6">
              {alertMessage}
            </p>

            <button
              type="button"
              className="w-full sm:w-auto px-6 py-2.5 bg-stone-800 hover:bg-stone-900 text-white rounded-full text-sm font-semibold transition-all duration-200 shadow-md shadow-stone-800/10"
              onClick={handleClose}
            >
              Okay, got it
            </button>
          </div>
        </div>
      </div>

      <ReactHowler
        src={currentSoundFile}
        playing={playingSound} 
        loop={false} 
        volume={1.0}
      />
    </Transition>
  );
};

export default Alert;
