import { JSX } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useColorPicker } from './useColorPicker';

type Props = {
  // add props here
  setColor: (color: string) => string;
  selectedColor: string;
  visible: boolean;
  position: { x: number; y: number };
  clickAutoAdjust?: boolean;
  hideUIOnMount?: boolean;
};

/**
 * ColorPicker component
 *
 * Utilice un colorpicker para simplicar esta ui ademas de demostrar conocimiento en aplicacion de librerias externas
 *
 * @component
 * @param {Props} props - Component props
 * @returns {JSX.Element}
 */
export function ColorPicker({
  setColor,
  selectedColor,
  visible,
  position,
  clickAutoAdjust = false,
  hideUIOnMount = false,
}: Props): JSX.Element {
  // Hook con la logica interna del colorpicker
  const { state, colorPickerRef, handleColorChange, handleClicked } =
    useColorPicker({
      position,
      clickAutoAdjust,
      hideUIOnMount,
      visible,
      setColor,
    });

  // Renderizo el componente de forma invisible para poder sacarle los "bounds" a la hora de hacer los calculos de los offset
  if (state.componentState === 'starting')
    return (
      <div
        onPointerDown={handleClicked}
        ref={colorPickerRef}
        style={{
          position: 'absolute',
          left: state.position.x,
          top: state.position.y,
          zIndex: '999',
          visibility: 'hidden',
        }}
      >
        <HexColorPicker color={selectedColor} onChange={handleColorChange} />
      </div>
    );

  return (
    <div
      onPointerDown={handleClicked}
      ref={colorPickerRef}
      style={{
        position: 'absolute',
        left: state.position.x,
        top: state.position.y,
        zIndex: '999',
      }}
      className={`${visible ? 'animate-fade-in' : 'animate-fade-out'}`}
    >
      <HexColorPicker color={selectedColor} onChange={handleColorChange} />
    </div>
  );
}
