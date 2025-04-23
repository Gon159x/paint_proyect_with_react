import { createContext, JSX, useContext, useEffect, useRef } from 'react';

type Props = {
  // add props here
  children: JSX.Element;
};

// Creo un contexto porque es util obtener globalmente en distintos
// componentes cual fue el ultimo boton clickeado del mouse y el proyecto
// no va a ser lo suficientemente grande como para utilizar redux o algo similar
const mouseContext = createContext<() => number>(() => 0);

export const MouseContextProvider = ({ children }: Props) => {
  const lastButtonRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      lastButtonRef.current = e.button;
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <mouseContext.Provider value={() => lastButtonRef.current}>
      {children}
    </mouseContext.Provider>
  );
};

export const useLastMouseButton = () => {
  return useContext(mouseContext);
};
