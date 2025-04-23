import { useState, useEffect, useCallback, RefObject, useRef } from 'react';

type Params = {
  // definir parámetros del hook
  selectedColorRef: RefObject<string>; // TODO ver que tipo es realmente
};

/**
 * Custom hook useCeilLogic
 *
 * @param {Params} params - Parámetros del hook
 * @returns {{ state: State, setState: React.Dispatch<React.SetStateAction<State>> }}
 */
export function useCanvasLogic({ selectedColorRef }: Params) {
  //Estados de celdas
  const [globalCeilsColors, setGlobalCeilsColors] = useState<string[][]>(
    Array.from({ length: 0 }).map((_) => {
      return Array.from({ length: 100 }, () => 'white');
    })
  );

  const mouseDown = useRef(false);

  const setMouseDown = useCallback((value: boolean) => {
    mouseDown.current = value;
  }, []);

  const handleClicker = useCallback(() => {
    console.log('Clicked');
  }, []);

  // Cada vez que se re-renderiza el componente recalculo la cantidad de filas
  // TODO extraer la logica de calculos para ponerla en la carpeta utils y que el codigo sea mas claro
  const calculateTotalCeils = useCallback(() => {
    const extraVerticalCeils = 3;
    const vw = window.innerWidth / 100;
    const verticalCeilsTotalAux =
      Math.ceil(window.innerHeight / vw) + extraVerticalCeils;

    const globalRowSize = globalCeilsColors.length;
    const rowDiference = verticalCeilsTotalAux - globalRowSize;
    const totalRows = globalRowSize + rowDiference; // Porque rowDiference es negativo entonces sumo
    const newGlobalColors =
      rowDiference > 0
        ? [
            ...globalCeilsColors,
            ...Array.from({ length: rowDiference }).map((_) => {
              return Array.from({ length: 100 }, () => 'white');
            }),
          ]
        : globalCeilsColors.slice(0, totalRows);

    setGlobalCeilsColors(newGlobalColors);
  }, []);

  // Logica para recalcular el lienzo cuando se redimenciona la pantalla
  // TODO -> tengo que mantener los que ya estan coloreados, no borrar todos -> guardar en localstorage en caso de "achicar y agrandar"
  useEffect(() => {
    calculateTotalCeils();
    window.addEventListener('resize', calculateTotalCeils);
    return () => window.removeEventListener('resize', calculateTotalCeils);
  }, []);

  // Funcion memoizada para optimizar el re-renderizado de los componentes y que funciona para cambiar el color de las celdas
  const handleCeilClicked = useCallback((row: number, col: number) => {
    // console.log('Hola', row, col, color);
    setGlobalCeilsColors((prevState) => {
      const prevStateCopy = [...prevState];
      const prevStateRowCopy = [...prevStateCopy[row]];
      prevStateRowCopy[col] = selectedColorRef.current;
      prevStateCopy[row] = prevStateRowCopy;
      return prevStateCopy;
    });
  }, []);

  // Funcion memoizada para optimizar el re-renderizado de los componentes y que funciona para cambiar el color de las celdas
  const handleCeilEntered = useCallback(
    (row: number, col: number) => {
      // console.log('Hola', row, col, color);
      if (mouseDown.current) {
        setGlobalCeilsColors((prevState) => {
          const prevStateCopy = [...prevState];
          const prevStateRowCopy = [...prevStateCopy[row]];
          prevStateRowCopy[col] = selectedColorRef.current;
          prevStateCopy[row] = prevStateRowCopy;
          return prevStateCopy;
        });
      }
    },
    [mouseDown]
  );

  return {
    handleClicker,
    globalCeilsColors,
    setMouseDown,
    handleCeilClicked,
    handleCeilEntered,
  };
}
