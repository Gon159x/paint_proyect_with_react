import { useEffect, useReducer, useRef, useState } from 'react';
import { useLastMouseButton } from '../../context/MouseContext';
import { useAppContext } from '../../context/AppContext';

type Params = {
  // definir parámetros del hook
  position: { x: number; y: number };
  clickAutoAdjust?: boolean;
  hideUIOnMount?: boolean;
  setColor: (color: string) => string;
  visible: boolean;
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
export function useColorPicker({
  position,
  clickAutoAdjust,
  hideUIOnMount = false,
  visible,
  setColor,
}: Params) {
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (visible && firstRender) {
      setFirstRender(false);
    }
  }, [visible, firstRender]);

  // Prevenir que el colorPicker seleccione colores con el click izquierdo
  const getLastClick = useLastMouseButton();

  const handleColorChange = (color: string) => {
    const lastClick = getLastClick();
    // console.log('Last click--->', lastClick);
    if (lastClick === 0) {
      setColor(color);
    }
  };

  const handleClicked = (e: React.PointerEvent) => {
    if (e.button !== 0) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  type Action =
    | { type: 'measured'; payload: { x: number; y: number } }
    | { type: 'ready' }
    | { type: 'reset' };

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
        return { ...state, componentState: 'starting' };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    componentState: clickAutoAdjust ? 'starting' : 'ready',
    position: { x: position.x, y: position.y },
  });

  // Desaparecer el UI cuando el componente esta activo, quizas hacer "conocer" el componente a el
  // contexto global hace el componente menos puro, pero me gusta mas que la idea de manejar si el
  // componente es visible o no desde el componente padre con logica externa al componente, me parece
  // un poco mejor encapsulado de esta forma adentro del mismo componente
  const { hideUI, showUI } = useAppContext();

  useEffect(() => {
    if (!visible) {
      dispatch({ type: 'reset' });
      if (hideUIOnMount) {
        showUI(2000);
      }
    } else {
      if (hideUIOnMount) hideUI();
    }
  }, [visible]);

  useEffect(() => {
    if (!clickAutoAdjust || !colorPickerRef.current) return;

    // console.log(
    //   'The div size--->',
    //   colorPickerRef.current?.getBoundingClientRect()
    // );
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

  return {
    state,
    colorPickerRef,
    firstRender,
    handleColorChange,
    handleClicked,
  };
}
