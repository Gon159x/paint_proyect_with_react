import { useEffect, useReducer, useRef } from 'react';

type Params = {
  // definir parámetros del hook
  position: { x: number; y: number };
  clickAutoAdjust?: boolean;
};

type State = {
  // definir estructura del estado
  componentState: 'starting' | 'measured' | 'ready';
  position: { x: number; y: number };
};

/**
 * Custom hook useColorPicker
 *
 * @param {Params} params - Parámetros del hook
 * @returns {{ state: State, setState: React.Dispatch<React.SetStateAction<State>> }}
 */
export function useColorPicker({ position, clickAutoAdjust }: Params) {
  const colorPickerRef = useRef<HTMLDivElement>(null);

  type Action =
    | { type: 'measured'; payload: { x: number; y: number } }
    | { type: 'ready' }
    | { type: 'reset'; payload: { x: number; y: number } };

  // Creo una minitienda para manejar la dependencia de estados, es una tienda porque intenta ser encapsulada y que una accion y estado me devuelva otro estado -> teoria de redux
  // Tuve que hacer un reducer porque hay dependencia de estados -> primero hay que medir y luego mostrar el componente, de otra forma "parpadea" en la posicion inicial y luego se va a la nueva posicion cuando
  // quiero hacer el adjustClicked
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'measured':
        return {
          ...state,
          position: action.payload,
          componentState: 'measured',
        };
      case 'ready':
        return { ...state, componentState: 'ready' };
      case 'reset':
        return { componentState: 'starting', position: action.payload };
    }

    return state;
  }

  const [state, dispatch] = useReducer(reducer, {
    componentState: clickAutoAdjust ? 'starting' : 'ready',
    position: { x: position.x, y: position.y },
  });

  useEffect(() => {
    if (!clickAutoAdjust || !colorPickerRef.current) return;

    console.log(
      'The div size--->',
      colorPickerRef.current?.getBoundingClientRect()
    );
    const offSetX = colorPickerRef.current?.getBoundingClientRect().width ?? 0;
    const offSetY = colorPickerRef.current?.getBoundingClientRect().height ?? 0;
    const portViewWidth = window.innerWidth;
    const portViewHeight = window.innerHeight;
    const left = position.x < portViewWidth / 2;
    const top = position.y < portViewHeight / 2;
    const newPosition = {
      x: left ? position.x : position.x - offSetX,
      y: top ? position.y : position.y - offSetY,
    };
    dispatch({
      type: 'measured',
      payload: { x: newPosition.x, y: newPosition.y },
    });
  }, [position, clickAutoAdjust]);

  return { state, colorPickerRef };
}
