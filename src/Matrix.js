import { useCallback, useState } from 'react';

const Matrix = () => {
  const [nRows, setNRows] = useState(3);
  const [nCols, setNCols] = useState(3);
  const [matrix, setMatrix] = useState(
    new Array(nRows).fill(new Array(nCols).fill(0))
  );

  const updateMatrixSize = useCallback((e) => {}, []);

  const updateCellValue = useCallback((e) => {}, []);

  return (
    <article>
      <header>
        <fieldset>
          <label htmlFor="rows-input">Rows</label>
          <input
            type="number"
            name="nRows"
            id="rows-input"
            onChange={updateMatrixSize}
            value={nRows}
            min="2"
            max="10"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="cols-input">Columns</label>
          <input
            type="number"
            name="nCols"
            id="cols-input"
            onChange={updateMatrixSize}
            value={nCols}
            min="2"
            max="10"
          />
        </fieldset>
      </header>
      <table>
        <tbody>
          {matrix.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, cellIdx) => (
                <td key={`${rowIdx}-${cellIdx}`}>
                  <input
                    id={`${rowIdx}-${cellIdx}`}
                    onChange={updateCellValue}
                    value={cell}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default Matrix;
