import { JSX } from 'react';
import { Ceil } from '../Ceil';
import { createPortal } from 'react-dom';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { usePicker } from './usePicker';
import { useCanvas } from './useCanvas';
import { FloatingButton } from '../FloatingButton';

type Props = {
  // add props here
};

/**
 * Lienzo component
 *
 * @component
 * @param {Props} props - Component props
 * @returns {JSX.Element}
 */

// TODO crear boton de limpiar
// TODO cambiar cursor

export function Lienzo({}: Props): JSX.Element {
  // Hago custom hooks para cumplir de cierta forma con el patron hook/presentacional para division de responsabilidades

  // Hook con logica relacionada a color picker adentro del lienzo
  const {
    handleContextMenu,
    selectedColorRef,
    showColorPicker,
    colorPickerFadeOutFinished,
    colorPickerPos,
  } = usePicker();

  // Hook con logica relacionada con el canvas completo, su manejo y la creacion de las celdas, etc. Volvi al componente "ceil" lo mas puro e independiente posible para evitar re-renderizados por cuestiones
  // de eficiencia por eso mantengo parte de su logica aca como lo son sus handlers o el color al que se modificara
  const {
    handleClicker,
    globalCeilsColors,
    handleCeilClicked,
    setMouseDown,
    handleCeilEntered,
    resetCeilsColors,
  } = useCanvas({
    selectedColorRef,
  });

  return (
    <div
      onClick={handleClicker}
      onContextMenu={handleContextMenu}
      className="z-0 h-[100vh] overflow-hidden w-[100vw]"
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      // onMouseLeave={(e) => console.log('Mouse leave--->', e)}
      // Esto lo pongo porque a veces como que arrastra todo el div de forma erratica
      onDrag={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {globalCeilsColors.map((row, rowIndex) => {
        return (
          <div key={rowIndex + 1} className="flex">
            {row.map((color: string, colIndex: number) => {
              return (
                <Ceil
                  color={color} // TODO: Ver de sacarlo de alguna forma o renombrarlo a "initial color" o algo por el estilo -> ver la logica por detras y encontrar un nombre mas apropiado
                  onClick={handleCeilClicked}
                  row={rowIndex}
                  col={colIndex}
                  key={colIndex + 1 + (rowIndex + 1) * 100}
                  onMouseEntered={handleCeilEntered}
                />
              );
            })}
          </div>
        );
      })}
      {/* el portal es porque quiero separar el nodo del DOM de el div padre para asociarlo con el de body y renderizarlo por "fuera" del div general de este componente para liberar al DOM de calculos 
      de layout por cada frame de animacion y los calculos  de cuando se renderiza el componente del color picker */}
      {((!showColorPicker && !colorPickerFadeOutFinished) || showColorPicker) &&
        createPortal(
          <ColorPicker
            position={colorPickerPos}
            setColor={(color: string) => (selectedColorRef.current = color)}
            selectedColor={selectedColorRef.current}
            visible={showColorPicker}
            clickAutoAdjust={true}
          />,
          document.body
        )}

      <FloatingButton onClick={() => resetCeilsColors()} position="bottom-left">
        Limpiar
      </FloatingButton>
    </div>
  );
}
