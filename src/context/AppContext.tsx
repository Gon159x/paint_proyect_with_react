import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext<{ loadingPage: boolean }>({
  loadingPage: true,
});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingPage(false);
    }, 2000); // ⏱️ Espera 2 segundos

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AppContext.Provider value={{ loadingPage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
