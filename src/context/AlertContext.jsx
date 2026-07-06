import { useState, createContext } from "react";
import PropTypes from "prop-types";

const AlertContext = createContext();

const AlertContextProvider = ({ children }) => {
  const [soundToggle, setSoundToggle] = useState(false);
  const [soundConsent, setSoundConsent] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(null);
  const [selectedSound, setSelectedSound] = useState(() => {
    return localStorage.getItem("oneStep_selectedSound") || "bell";
  });

  const handleSetSelectedSound = (sound) => {
    setSelectedSound(sound);
    localStorage.setItem("oneStep_selectedSound", sound);
  };

  return (
    <AlertContext.Provider
      value={{
        soundToggle,
        setSoundToggle,
        soundConsent,
        setSoundConsent,
        showAlert,
        setShowAlert,
        alertMessage,
        setAlertMessage,
        onConfirm,
        setOnConfirm,
        selectedSound,
        setSelectedSound: handleSetSelectedSound
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

AlertContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AlertContext, AlertContextProvider };
