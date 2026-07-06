import { useState, createContext } from "react";
import PropTypes from "prop-types";

const AlertContext = createContext();

const AlertContextProvider = ({ children }) => {
  const [soundToggle, setSoundToggle] = useState(false);
  const [soundConsent, setSoundConsent] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(null);

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
        setOnConfirm
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
