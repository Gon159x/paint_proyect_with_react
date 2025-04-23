import { memo } from 'react';

type Props = {
  // add props here
  color: string;
  onClick: (row: number, col: number) => void;
  onMouseEntered: (row: number, col: number) => void;
  row: number;
  col: number;
};

/**
 * Ceil component
 *
 * Al ser un componente sencillo no le genero un folder particular
 *
 * @component
 * @param {Props} props - Component props
 * @returns {JSX.Element}
 */
export const Ceil = memo(function Ceil({
  color,
  onClick,
  onMouseEntered,
  row,
  col,
}: Props) {
  // console.log('Re renderizacion-->');

  return (
    <div
      onClick={() => onClick(row, col)}
      style={{ backgroundColor: `${color}` }}
      onPointerEnter={() => onMouseEntered(row, col)}
      // onMouseEnter={() => onClick(row, col, 'black')}
      className={`ceil`}
    ></div>
  );
});
