import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook usePickerLogic
 *
 * @param {Params} params - Parámetros del hook
 * @returns {{ state: State, setState: React.Dispatch<React.SetStateAction<State>> }}
 */
export function usePickerLogic() {
  const selectedColorRef = useRef<string>('#1106e6');
  const [showColorPicker, setShowColorPickker] = useState<boolean>(false);
  const [colorPickerFadeOutFinished, setColorPickerFadeOutFinished] =
    useState(true);
  const [colorPickerPos, setColorPickerPos] = useState({ x: 0, y: 0 });

  // Control de el context menu ( boton derecho )
  const handleContextMenu = useCallback(
    (e: any) => {
      e.preventDefault();
      console.log('Show color picker--->', showColorPicker);
      if (!showColorPicker) {
        setColorPickerPos({ x: e.clientX, y: e.clientY });
      }

      setShowColorPickker((prevState) => !prevState);

      if (e.type === 'click') {
        console.log('Left click');
      } else if (e.type === 'contextmenu') {
        console.log('Right click');
      }
    },
    [showColorPicker]
  );

  // Control de animacion para desaparecer por completo el colorPicker
  useEffect(() => {
    let timeOutId: number;

    if (showColorPicker) {
      setColorPickerFadeOutFinished(false);
    } else {
      timeOutId = setTimeout(() => {
        setColorPickerFadeOutFinished(true);
      }, 300); // Coordinar con la variable definida de la clase fade-in-out de index.css
    }

    return () => clearInterval(timeOutId);
  }, [showColorPicker]);

  return {
    handleContextMenu,
    selectedColorRef,
    showColorPicker,
    colorPickerFadeOutFinished,
    colorPickerPos,
  };
}
