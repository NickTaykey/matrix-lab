import ReadOnlyMatrix, { GroupColorState } from './ReadOnlyMatrix';
import { genRandomColor } from '../store/GeneralContextProvider';
import { MatrixArray } from '../store/matrix_reducer_types';
import { useState } from 'react';

interface CollHighlightMatrixProps {
  matrix: MatrixArray;
}

const CollHighlightMatrix = (props: CollHighlightMatrixProps) => {
  const [colColors, setColColors] = useState<GroupColorState>(
    new Array(props.matrix[0].length).fill(null).map(() => ({
      color: genRandomColor(),
      hightlighted: false,
    }))
  );

  const handleColHighlightClick = (
    e: React.MouseEvent<HTMLTableCellElement>
  ) => {
    const colIdx = Number(e.currentTarget.id.split('-')[1]);
    setColColors((current) => {
      return current.map((c, i) => {
        if (i !== colIdx) return c;
        const t = Object.assign({}, c);
        t.hightlighted = !c.hightlighted;
        return t;
      });
    });
  };

  return (
    <ReadOnlyMatrix
      matrix={props.matrix}
      onColClick={handleColHighlightClick}
      colsColorState={colColors}
    />
  );
};

/* 
<table style={{ borderLeft: '1px solid gray', borderRight: '1px solid gray' }}>
    <tbody>
    {props.matrix.map((row, rowIdx) => (
        <tr key={rowIdx} id={rowIdx.toString()}>
        {row.map((cell, cellIdx) => (
            <td
            key={`${rowIdx}-${cellIdx}`}
            id={`${rowIdx}-${cellIdx}`}
            style={{
                padding: '1rem',
                backgroundColor: colColors[cellIdx].hightlighted
                ? colColors[cellIdx].color
                : 'transparent',
            }}
            onClick={handleColHighlightClick}
            >
            {cell}
            </td>
        ))}
        </tr>
    ))}
    </tbody>
</table> */

export default CollHighlightMatrix;
