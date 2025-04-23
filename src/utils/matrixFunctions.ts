// Las funciones importadas no son re-renderizadas por los componentes

export type MatrixIndexs = {
  col: number;
  row: number;
};
/**
 *  Esta funcion hace una interpolacion entre dos puntos para encontra la "linea" que los une
 * @param {MatrixIndexs} from - Punto de inicio, fila y columna
 * @param {MatrixIndexs} to - Punto de inicio, fila y columna
 * @return {MatrixIndexs[]} - lista de celdas intermedias para generar la linea
 */
export const intermediateCalculations = (
  from: MatrixIndexs,
  to: MatrixIndexs
) => {
  const deltaX = to.col - from.col;
  const deltaY = to.row - from.row;

  const changes = Math.max(Math.abs(deltaX), Math.abs(deltaY));
  //   console.log('Changes--->', changes);
  //   console.log('DeltaX--->', deltaX);
  //   console.log('DeltaY--->', deltaY);
  const changeX = deltaX / changes;
  const changeY = deltaY / changes;
  //   console.log('ChangeY--->', changeY);
  //   console.log('ChangeX--->', changeX);

  const changeCeils: MatrixIndexs[] = [];
  for (let i = 1; i <= changes; i++) {
    let newCol = from.col + Math.floor(i * changeX);

    // console.log('i *change--->', i * changeX);
    // console.log('FromCol--->', from.col);
    // console.log('floor--->', Math.floor(i * changeX));
    // console.log('NewCol--->', newCol);
    let newRow = from.row + Math.floor(i * changeY); // Con floor la curva de interpolacion es hacia abajo si es ceil es hacia arriba, quizas podria
    // randomnizarla para generar un efecto de distincion o cambiar la funcion dependiendo de "y" inicial mayor o menor que el actual para simular una curva mas aproximada

    changeCeils.push({ row: newRow, col: newCol });
  }
  return changeCeils;
};
