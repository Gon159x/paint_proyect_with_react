import { createContext, useContext, useState, useRef, useEffect } from 'react';

type AppContextType = {
  loadingPage: boolean;
  uiVisible: boolean;
  hideUI: () => void;
  showUI: (delay?: number) => void; // 👈 Ahora showUI acepta delay opcional
  toggleUI: () => void;
};

const AppContext = createContext<AppContextType>({
  loadingPage: true,
  uiVisible: true,
  hideUI: () => {},
  showUI: () => {},
  toggleUI: () => {},
});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loadingPage, setLoadingPage] = useState(true);
  const [uiVisible, setUiVisible] = useState(true);
  const showUiTimeoutRef = useRef<NodeJS.Timeout | null>(null); // 👈 Referencia para el timeout

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingPage(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const hideUI = () => {
    if (showUiTimeoutRef.current) {
      clearTimeout(showUiTimeoutRef.current);
      showUiTimeoutRef.current = null;
    }
    setUiVisible(false);
  };

  const showUI = (delay = 0) => {
    // if (showUiTimeoutRef.current) {
    //   clearTimeout(showUiTimeoutRef.current);
    // }
    showUiTimeoutRef.current = setTimeout(() => {
      setUiVisible(true);
      showUiTimeoutRef.current = null; // Limpio referencia una vez mostrado
    }, delay);
  };

  const toggleUI = () => {
    if (uiVisible) {
      hideUI();
    } else {
      showUI();
    }
  };

  return (
    <AppContext.Provider
      value={{ loadingPage, uiVisible, hideUI, showUI, toggleUI }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
