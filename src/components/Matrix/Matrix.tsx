import {
  MatrixObject,
  MatrixProductObject,
  MatrixTypes,
} from '../../store/matrix_reducer_types';
import GeneralContext from '../../store/GeneralContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import React from 'react';
import { isNumberTable } from '../../store/GeneralContextProvider';

interface MatrixProps {
  matrix: MatrixObject | MatrixProductObject;
}

const Matrix = (props: MatrixProps) => {
  const generalContext = useContext(GeneralContext);
  const { table, determinant, id, color, nRows, nCols, type } = props.matrix;

  const updateMatrixSize = (e: React.FormEvent<HTMLInputElement>) => {
    generalContext.updateMatrixSize(id, {
      newNRows:
        e.currentTarget.name === 'nRows' ? Number(e.currentTarget.value) : null,
      newNCols:
        e.currentTarget.name === 'nCols' ? Number(e.currentTarget.value) : null,
    });
  };

  const updateCellValue = (e: React.FormEvent<HTMLInputElement>) => {
    let [rowIdx, colIdx] = e.currentTarget
      .getAttribute('id')!
      .split('-')
      .map((v) => Number(v));
    generalContext.updateMatrixValue(id, rowIdx, colIdx, e.currentTarget.value);
  };

  return (
    <article
      className="matrix"
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        padding: '2rem',
        margin: '0 2rem 2rem 2rem',
        border: `5px solid ${color}`,
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'center' }}>
        {generalContext.isSelectionModeOn && (
          <fieldset>
            <input
              type="checkbox"
              checked={generalContext.selectedColorsArray.includes(color)}
              onChange={() => {
                generalContext.setSelectedColorsArray((arr) => {
                  if (arr.includes(color)) {
                    return arr.filter((c) => c !== color);
                  }
                  return [...arr, color];
                });
              }}
            />
          </fieldset>
        )}
        <fieldset>
          <label htmlFor={`matrix-${id}-rows-input`}>Rows</label>
          <input
            type="number"
            name="nRows"
            id={`matrix-${id}-rows-input`}
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
            id={`matrix-${id}-cols-input`}
            onChange={updateMatrixSize}
            value={nCols}
            min="2"
            max="10"
          />
        </fieldset>
        <button onClick={() => generalContext.deleteMatrix(id)}>Delete</button>
        {type === MatrixTypes.PRODUCT && (
          <Link to={`/product-steps/${id}`}>Product Steps</Link>
        )}
      </header>
      <table style={{ margin: '1rem 0' }}>
        <tbody>
          {table.map((row, rowIdx) => (
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
      {isNumberTable(table) && (
        <>
          {determinant !== null && table.length === table[0].length && (
            <footer style={{ display: 'flex', flexDirection: 'column' }}>
              <div>Determinant: {determinant.result}</div>
              <Link
                to={`/determinant-steps/${id}`}
                style={{ margin: '1rem 0' }}
              >
                Determinant Steps
              </Link>
              {determinant.result !== 0 && (
                <Link to={`/inverse-steps/${id}`}>Inverse Matrix Steps</Link>
              )}
            </footer>
          )}
          <Link to={`/rref/${id}`} style={{ marginTop: '1rem' }}>
            rref matrix
          </Link>
        </>
      )}
    </article>
  );
};

export default Matrix;
