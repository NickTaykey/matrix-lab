import { genRandomColor } from '../store/GeneralContextProvider';
import { MatrixArray } from '../store/matrix_reducer_types';
import ReadOnlyMatrix, { GroupColorState } from './ReadOnlyMatrix';
import { useState } from 'react';

interface ReadOnlyMatrixProps {
  matrix: MatrixArray;
}

const CellHighlightMatrix = (props: ReadOnlyMatrixProps) => {
  const [cellColors, setCellColors] = useState<GroupColorState[]>(
    new Array(props.matrix.length)
      .fill(new Array(props.matrix[0].length).fill(null))
      .map((r) => {
        return r.map(() => ({
          color: genRandomColor(),
          hightlighted: false,
        }));
      })
  );

  const handleCellHighlightClick = (
    e: React.MouseEvent<HTMLTableCellElement>
  ) => {
    const [rowIdx, colIdx] = e.currentTarget.id
      .split('-')
      .map((v) => Number(v));

    setCellColors((current) => {
      return current.map((r, i) => {
        if (i !== rowIdx) return r;
        return r.map((c, i) => {
          if (i !== colIdx) return c;
          const t = Object.assign({}, c);
          t.hightlighted = !c.hightlighted;
          return t;
        });
      });
    });
  };

  return (
    <ReadOnlyMatrix
      matrix={props.matrix}
      onCellClick={handleCellHighlightClick}
      cellsColorState={cellColors}
    />
  );
};

export default CellHighlightMatrix;

/* 
<table
  style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray' }}
>
  <tbody>
    {props.matrix.map((row, rowIdx) => (
      <tr id={rowIdx.toString()} key={rowIdx}>
        {row.map((cell, cellIdx) => (
          <td
            key={`${rowIdx}-${cellIdx}`}
            id={`${rowIdx}-${cellIdx}`}
            style={{
              padding: '1rem',
              backgroundColor: cellColors[cellIdx].hightlighted
                ? cellColors[cellIdx].color
                : 'transparent',
            }}
            // onClick={handleColHighlightClick}
          >
            {cell}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table> */
