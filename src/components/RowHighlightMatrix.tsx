import ReadOnlyMatrix, { GroupColorState } from './ReadOnlyMatrix';
import { genRandomColor } from '../store/GeneralContextProvider';
import { MatrixArray } from '../store/matrix_reducer_types';
import { useState } from 'react';

interface RowHighLightMatrixProps {
  matrix: MatrixArray;
}

const RowHighLightMatrix = (props: RowHighLightMatrixProps) => {
  const [rowColors, setRowColors] = useState<GroupColorState>(
    new Array(props.matrix.length).fill(null).map(() => ({
      color: genRandomColor(),
      hightlighted: false,
    }))
  );

  const handleRowHighlightClick = (
    e: React.MouseEvent<HTMLTableRowElement>
  ) => {
    const rowIdx = Number(e.currentTarget.id);
    setRowColors((current) => {
      return current.map((r, i) => {
        if (i !== rowIdx) return r;
        const t = Object.assign({}, r);
        t.hightlighted = !r.hightlighted;
        return t;
      });
    });
  };

  return (
    <ReadOnlyMatrix
      matrix={props.matrix}
      rowsColorState={rowColors}
      onRowClick={handleRowHighlightClick}
    />
  );
};

/* 
<table
      style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray' }}
    >
      <tbody>
        {props.matrix.map((row, rowIdx) => (
          <tr
            key={rowIdx}
            onClick={handleRowHighlightClick}
            id={rowIdx.toString()}
            style={{
              backgroundColor: rowColors[rowIdx].hightlighted
                ? rowColors[rowIdx].color
                : 'transparent',
            }}
          >
            {row.map((cell, cellIdx) => (
              <td key={`${rowIdx}-${cellIdx}`} id={`${rowIdx}-${cellIdx}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>


*/

export default RowHighLightMatrix;
