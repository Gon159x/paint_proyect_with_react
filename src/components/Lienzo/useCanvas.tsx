import { useState, useEffect, useCallback, RefObject, useRef } from 'react';
import {
  intermediateCalculations,
  MatrixIndexs,
} from '../../utils/matrixFunctions';
import { useLastMouseButton } from '../../context/MouseContext';
import { debounce } from '../../utils/debounce';
import { useAppContext } from '../../context/AppContext';

type Params = {
  // definir parámetros del hook
  selectedColorRef: RefObject<string>; // TODO ver que tipo es realmente
  showColorPicker: boolean;
};

/**
 * Custom hook useCeilLogic
 *
 * @param {Params} params - Parámetros del hook
 * @returns {{ state: State, setState: React.Dispatch<React.SetStateAction<State>> }}
 */
export function useCanvas({ selectedColorRef, showColorPicker }: Params) {
  //Estados de celdas
  const [globalCeilsColors, setGlobalCeilsColors] = useState<string[][]>(
    Array.from({ length: 0 }).map((_) => {
      return Array.from({ length: 100 }, () => 'white');
    })
  );

  // Cuando dibujo quiero que se esconda el ui, pero creo que ejecutar hideUi cada vez que
  // dibujo un poco no es positivo, asi que lo pondre cuando se escucha el evento del click
  const { hideUI, showUI } = useAppContext();

  // Creo una referencia porque no quiero provocar el re-renderizado de las celdas por modificar
  // su callback
  const showColorPickerRef = useRef(showColorPicker);

  // Sync siempre que cambie showColorPicker
  useEffect(() => {
    showColorPickerRef.current = showColorPicker;
  }, [showColorPicker]);

  const resetCeilsColors = useCallback(() => {
    setGlobalCeilsColors((prevState) =>
      prevState.map((row) => row.map(() => 'white'))
    );
  }, []);

  const mouseDown = useRef(false);

  const lastButtonClicked = useLastMouseButton();

  const setMouseDown = useCallback((value: boolean) => {
    mouseDown.current = value;
  }, []);

  const handlePointerDown = useCallback((e: any) => {
    // if (showColorPicker) {
    //   e.stopPropagation();
    //   e.preventDefault();
    // }
    // Problema de coordinacion con el dismount que genera un show del colorPicker

    if (!showColorPickerRef.current && e.button !== 2) {
      hideUI();
    }
  }, []);

  const handlePointerUp = useCallback((e: any) => {
    // if (showColorPicker) {
    //   e.stopPropagation();
    //   e.preventDefault();
    // }

    if (!showColorPickerRef.current && e.button !== 2) {
      showUI(2000);
    }
  }, []);

  // Cada vez que se re-renderiza el componente recalculo la cantidad de filas
  // TODO extraer la logica de calculos para ponerla en la carpeta utils y que el codigo sea mas claro
  const prevViewPortHeight = useRef<number>(window.innerHeight);

  const calculateTotalCeilsRef = useRef<() => void>(() => {});

  // Bueno, esto esta parcialmente resuelto, aun en ciertas secuencias de redimencionamiento
  // se pierden colores del localstorage, pero esto tiene que ver con la forma en la
  // que se almacena el localstorage de forma asincronica con tantos datos
  // igual creo que si lo pienso un poco mas podria resolver este tema
  const debouncedResize = useRef(
    debounce(() => {
      calculateTotalCeilsRef.current();
    }, 100)
  ).current;

  const calculateTotalCeils = useCallback(() => {
    const extraVerticalCeils = 3;
    const vw = window.innerWidth / 100;
    const verticalCeilsTotalAux =
      Math.ceil(window.innerHeight / vw) + extraVerticalCeils;

    const prevHeight = prevViewPortHeight.current;
    const windowGrowing = window.innerHeight > prevHeight;
    prevViewPortHeight.current = window.innerHeight;

    let newGlobalColors: string[][] = [...globalCeilsColors];

    // console.log('New global colors--->', newGlobalColors);
    // console.log('globalCeils colors--->', newGlobalColors);

    if (windowGrowing) {
      // console.log('Window is growing--->', windowGrowing);
      const saved = localStorage.getItem('globalCeilsColors');
      // console.log('Saved--->', saved);
      if (saved) {
        // Hay un bug tanto cuando se achica-agranda -> ignora cambios, como cuando se achica-achica-agranda  -> borra los cambios viejos de localstorage
        console.log(
          'Si ya se que hay un bug aca pero ya no me da la cabeza para resolverlo por hoy jaj'
        );
        newGlobalColors = JSON.parse(saved);
      } else {
        newGlobalColors = globalCeilsColors;
      }
    } else {
      // console.log('Window shrinking--->');
      localStorage.setItem(
        'globalCeilsColors',
        JSON.stringify(globalCeilsColors)
      );
      newGlobalColors = globalCeilsColors;
    }

    const globalRowSize = newGlobalColors.length;
    const rowDiference = verticalCeilsTotalAux - globalRowSize;

    if (rowDiference > 0) {
      newGlobalColors = [
        ...newGlobalColors,
        ...Array.from({ length: rowDiference }).map((_) => {
          return Array.from({ length: 100 }, () => 'white');
        }),
      ];
    } else if (rowDiference < 0) {
      const totalRows = globalRowSize + rowDiference; // Porque rowDiference es negativo entonces sumo
      newGlobalColors = newGlobalColors.slice(0, totalRows);
    }

    setGlobalCeilsColors(newGlobalColors);
  }, [globalCeilsColors]);

  useEffect(() => {
    calculateTotalCeilsRef.current = calculateTotalCeils;
  }, [calculateTotalCeils]);

  // Logica para recalcular el lienzo cuando se redimenciona la pantalla
  useEffect(() => {
    calculateTotalCeils();
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  // Funcion memoizada para optimizar el re-renderizado de los componentes y que funciona para cambiar el color de las celdas
  const handleCeilClicked = useCallback((row: number, col: number) => {
    // console.log('Hola', row, col, color);
    const lastClick = lastButtonClicked();
    if (lastClick === 2 || showColorPickerRef.current) return;

    setGlobalCeilsColors((prevState) => {
      const prevStateCopy = [...prevState];
      const prevStateRowCopy = [...prevStateCopy[row]];
      prevStateRowCopy[col] = selectedColorRef.current;
      prevStateCopy[row] = prevStateRowCopy;
      return prevStateCopy;
    });
  }, []);

  // seccion para optimizar el re-renderizado de los componentes y que funciona para cambiar el color de las celdas durante el arrastrado del mouse clickeado

  const lastCeilPainted = useRef<MatrixIndexs | null>(null);

  const handleCeilEntered = useCallback((row: number, col: number) => {
    // console.log('Hola', row, col, color);
    const lastClick = lastButtonClicked();
    if (!mouseDown.current || lastClick === 2 || showColorPickerRef.current) {
      lastCeilPainted.current = null;
      return;
    }

    if (mouseDown.current) {
      if (lastCeilPainted.current === null) {
        setGlobalCeilsColors((prevState) => {
          const prevStateCopy = [...prevState];
          const prevStateRowCopy = [...prevStateCopy[row]];
          prevStateRowCopy[col] = selectedColorRef.current;
          prevStateCopy[row] = prevStateRowCopy;
          lastCeilPainted.current = { row, col };
          return prevStateCopy;
        });
      } else {
        const newCeils = intermediateCalculations(lastCeilPainted.current, {
          row,
          col,
        });
        setGlobalCeilsColors((prevState) => {
          const prevStateCopy = [...prevState];
          newCeils.forEach((ceil) => {
            const prevStateRowCopy = [...prevStateCopy[ceil.row]];
            prevStateRowCopy[ceil.col] = selectedColorRef.current;
            prevStateCopy[ceil.row] = prevStateRowCopy;
          });
          lastCeilPainted.current = { row, col };
          return prevStateCopy;
        });
      }
    }
  }, []);

  return {
    handlePointerDown,
    handlePointerUp,
    globalCeilsColors,
    setMouseDown,
    handleCeilClicked,
    handleCeilEntered,
    resetCeilsColors,
  };
}
