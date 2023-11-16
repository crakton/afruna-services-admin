'use client'

import { FC, ReactNode, createContext, useContext, useState } from "react";

interface ModalProviderProps {
    children: ReactNode;
}

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);
 
const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const contextValue = {
      isOpen,
      openModal,
      closeModal,
    };
    return ( 
        <>
          <ModalContext.Provider value={contextValue}>
            {children}
          </ModalContext.Provider>
        </>
    );
}
 
export default ModalProvider;

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
