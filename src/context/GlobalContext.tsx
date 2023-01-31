import { createContext, RefObject, useContext, useRef } from 'react';

interface ContextProps {
  skipNavigationRef: RefObject<HTMLElement>;
  skipNavigationOnClick: () => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

const GlobalContext = createContext<ContextProps | undefined>(undefined);

const GlobalProvider: React.FC<ProviderProps> = ({ children }) => {
  const skipNavigationRef = useRef<HTMLElement>(null);

  function skipNavigationOnClick() {
    if (skipNavigationRef.current) {
      skipNavigationRef.current.focus();
    }
  }

  const value = { skipNavigationRef, skipNavigationOnClick };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalContextHook must be used within a GlobalProvider.'
    );
  }

  return context;
};

export default useGlobalContext;
export { GlobalProvider };
