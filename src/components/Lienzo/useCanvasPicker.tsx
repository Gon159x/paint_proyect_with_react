import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook usePickerLogic
 *
 * @param {Params} params - Parámetros del hook
 * @returns {{ state: State, setState: React.Dispatch<React.SetStateAction<State>> }}
 */
export function useCanvasPicker() {
  const selectedColorRef = useRef<string>('#1106e6');
  const [showColorPicker, setShowColorPickker] = useState<boolean>(false);

  const [colorPickerPos, setColorPickerPos] = useState({ x: 0, y: 0 });

  // Control de el context menu ( boton derecho )
  const handleContextMenu = useCallback(
    (e: any) => {
      e.preventDefault();
      // console.log('Show color picker--->', showColorPicker);
      if (!showColorPicker) {
        setColorPickerPos({ x: e.clientX, y: e.clientY });
      }

      setShowColorPickker((prevState) => !prevState);

      // if (e.type === 'click') {
      //   console.log('Left click');
      // } else if (e.type === 'contextmenu') {
      //   console.log('Right click');
      // }
    },
    [showColorPicker]
  );

  // Control de animacion para desaparecer por completo el colorPicker
  // useEffect(() => {
  //   let timeOutId: NodeJS.Timeout | null = null;

  //   if (showColorPicker) {
  //     setColorPickerFadeOutFinished(false);
  //   } else {
  //     timeOutId = setTimeout(() => {
  //       setColorPickerFadeOutFinished(true);
  //     }, 300); // Coordinar con la variable definida de la clase fade-in-out de index.css
  //   }

  //   return () => {
  //     if (timeOutId) clearInterval(timeOutId);
  //   };
  // }, [showColorPicker]);

  return {
    handleContextMenu,
    selectedColorRef,
    showColorPicker,
    // colorPickerFadeOutFinished, Eliminado ya que hice el portal y se maneja por separado, ya no necesito sacar el elemento del DOM
    colorPickerPos,
  };
}
