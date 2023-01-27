import { MatrixArray } from '../store/matrix_reducer_types';

export type GroupColorState = {
  hightlighted: boolean;
  color: string;
}[];

interface ReadOnlyMatrixProps {
  matrix: MatrixArray;
  onColClick?: (e: React.MouseEvent<HTMLTableCellElement>) => void;
  colsColorState?: GroupColorState;
  onRowClick?: (e: React.MouseEvent<HTMLTableRowElement>) => void;
  rowsColorState?: GroupColorState;
  onCellClick?: (e: React.MouseEvent<HTMLTableCellElement>) => void;
  cellsColorState?: GroupColorState[];
}

const ReadOnlyMatrix = (props: ReadOnlyMatrixProps) => (
  <table
    style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray' }}
  >
    <tbody>
      {props.matrix.map((row, rowIdx) => (
        <tr
          key={rowIdx}
          onClick={props.onRowClick ? props.onRowClick : undefined}
          id={rowIdx.toString()}
          style={{
            backgroundColor:
              props.rowsColorState && props.rowsColorState[rowIdx].hightlighted
                ? props.rowsColorState[rowIdx].color
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
                  props.colsColorState &&
                  props.colsColorState[colIdx].hightlighted
                    ? props.colsColorState[colIdx].color
                    : props.cellsColorState &&
                      props.cellsColorState[rowIdx][colIdx].hightlighted
                    ? props.cellsColorState[rowIdx][colIdx].color
                    : 'transparent',
              }}
              onClick={
                props.onColClick
                  ? props.onColClick
                  : props.onCellClick
                  ? props.onCellClick
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
