import { Table } from '../../store/matrix_reducer_types';
import { isColorDark } from '../../helpers/color_utils';

export type GroupColorState = {
  clickTimeStamp: number;
  color: string;
}[];

export type CellCoords = [number, number];

type HighlightedCells = {
  colIdx: number;
  backgroundColor: string;
  color: string;
}[];

interface ReadOnlyMatrixProps {
  matrix: Table;
  highlightedCells?: HighlightedCells;
  rowColors?: string[];
  colColors?: string[];
  cellsColorState?: GroupColorState[];
  onCellClick?: (coords: CellCoords) => void;
  defaultTextColor: string;
}

const ReadOnlyMatrix = ({
  matrix,
  defaultTextColor,
  rowColors,
  colColors,
  cellsColorState,
  highlightedCells,
  onCellClick,
}: ReadOnlyMatrixProps) => {
  let determinantStepIdx = 0;
  return (
    <table
      className="matrix"
      style={{
        borderLeft: `1px solid ${defaultTextColor}`,
        borderRight: `1px solid ${defaultTextColor}`,
      }}
    >
      <tbody>
        {matrix.map((row, rowIdx) => (
          <tr
            key={rowIdx}
            id={rowIdx.toString()}
            style={{
              backgroundColor: rowColors ? rowColors[rowIdx] : 'transparent',
            }}
          >
            {row.map((cell, colIdx) => {
              let bgColor =
                cellsColorState &&
                cellsColorState[rowIdx][colIdx].clickTimeStamp
                  ? cellsColorState[rowIdx][colIdx].color
                  : colColors && colColors.length
                  ? colColors[colIdx]
                  : 'transparent';

              let textColor = defaultTextColor ? defaultTextColor : 'black';

              if (bgColor?.length && bgColor !== 'transparent') {
                textColor = isColorDark(bgColor) ? 'white' : 'black';
              } else if (rowColors && rowColors[rowIdx].length) {
                textColor = isColorDark(rowColors[rowIdx]) ? 'white' : 'black';
              }

              const tabCell = (
                <td
                  key={`${rowIdx}-${colIdx}`}
                  id={`${rowIdx}-${colIdx}`}
                  style={{
                    width: '80px',
                    padding: '1rem',
                    backgroundColor:
                      highlightedCells &&
                      !rowIdx &&
                      highlightedCells[determinantStepIdx].colIdx === colIdx
                        ? highlightedCells[determinantStepIdx].backgroundColor
                        : bgColor,
                    color:
                      highlightedCells &&
                      !rowIdx &&
                      highlightedCells[determinantStepIdx].colIdx === colIdx
                        ? highlightedCells[determinantStepIdx].color
                        : textColor,
                  }}
                  onClick={
                    onCellClick
                      ? () => onCellClick!([rowIdx, colIdx])
                      : undefined
                  }
                >
                  {cell}
                </td>
              );

              determinantStepIdx++;

              return tabCell;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReadOnlyMatrix;
