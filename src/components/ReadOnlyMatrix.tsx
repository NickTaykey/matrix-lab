import { MatrixArray } from '../store/matrix_reducer_types';

export type GroupColorState = {
  hightlighted: boolean;
  color: string;
}[];

export type CellCoords = [number, number];

interface ReadOnlyMatrixProps {
  matrix: MatrixArray;
  rowColors?: Array<string[]>;
  colColors?: Array<string[]>;
  cellsColorState?: GroupColorState[];
  onCellClick?: (coords: CellCoords) => void;
}

const isColorDark = (color: string) => {
  const [r, g, b] = color
    .substring(color.indexOf('(') + 1, color.length - 1)
    .split(', ')
    .map((n) => Number(n));
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (luma < 140) return true;
  return false;
};

const ReadOnlyMatrix = ({
  matrix,
  rowColors,
  colColors,
  cellsColorState,
  onCellClick,
}: ReadOnlyMatrixProps) => (
  <table
    style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray' }}
  >
    <tbody>
      {matrix.map((row, rowIdx) => (
        <tr
          key={rowIdx}
          id={rowIdx.toString()}
          style={{
            backgroundColor: rowColors
              ? rowColors[rowIdx].at(-1)
              : 'transparent',
          }}
        >
          {row.map((cell, colIdx) => {
            const bgColor =
              cellsColorState && cellsColorState[rowIdx][colIdx].hightlighted
                ? cellsColorState[rowIdx][colIdx].color
                : colColors && colColors.length
                ? colColors[colIdx].at(-1)!
                : 'transparent';

            let textColor = 'black';

            if (bgColor?.length && bgColor !== 'transparent') {
              textColor = isColorDark(bgColor) ? 'white' : 'black';
            } else if (rowColors && rowColors[rowIdx].length) {
              textColor = isColorDark(rowColors[rowIdx].at(-1)!)
                ? 'white'
                : 'black';
            }

            return (
              <td
                key={`${rowIdx}-${colIdx}`}
                id={`${rowIdx}-${colIdx}`}
                style={{
                  padding: '1rem',
                  backgroundColor: bgColor,
                  color: textColor,
                }}
                onClick={
                  onCellClick ? () => onCellClick!([rowIdx, colIdx]) : undefined
                }
              >
                {cell}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
);

export default ReadOnlyMatrix;
