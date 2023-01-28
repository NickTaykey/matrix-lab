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

const ReadOnlyMatrix = (props: ReadOnlyMatrixProps) => (
  <table
    style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray' }}
  >
    <tbody>
      {props.matrix.map((row, rowIdx) => (
        <tr
          key={rowIdx}
          id={rowIdx.toString()}
          style={{
            backgroundColor: props.rowColors
              ? props.rowColors[rowIdx].join(' ')
              : 'transparent',
          }}
        >
          {row.map((cell, colIdx) => (
            <td
              key={`${rowIdx}-${colIdx}`}
              id={`${rowIdx}-${colIdx}`}
              style={{
                padding: '1rem',
                backgroundColor:
                  props.cellsColorState &&
                  props.cellsColorState[rowIdx][colIdx].hightlighted
                    ? props.cellsColorState[rowIdx][colIdx].color
                    : props.colColors
                    ? props.colColors[colIdx].join(' ')
                    : 'transparent',
              }}
              onClick={
                props.onCellClick
                  ? () => props.onCellClick!([rowIdx, colIdx])
                  : undefined
              }
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default ReadOnlyMatrix;
