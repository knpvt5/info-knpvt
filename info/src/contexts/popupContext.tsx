import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface PopupContextType {
  popupMsg: string;
  setPopupMsg: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with default values
export const PopupContext = createContext<PopupContextType>({
  popupMsg: "",
  setPopupMsg: () => {},
});

// Create a provider component
export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [popupMsg, setPopupMsg] = useState("");

  return (
    <PopupContext.Provider value={{ popupMsg, setPopupMsg }}>
      {children}
    </PopupContext.Provider>
  );
};


// Custom hook for easy access
// export const usePopup = () => useContext(PopupContext);