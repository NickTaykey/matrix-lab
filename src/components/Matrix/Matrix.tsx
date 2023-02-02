import {
  MatrixObject,
  MatrixProductObject,
  MatrixTypes,
} from '../../store/matrix_reducer_types';
import GeneralContext from '../../store/GeneralContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import React from 'react';

interface MatrixProps {
  matrix: MatrixObject | MatrixProductObject;
}

const Matrix = (props: MatrixProps) => {
  const generalContext = useContext(GeneralContext);

  const updateMatrixSize = (e: React.FormEvent<HTMLInputElement>) => {
    generalContext.updateMatrixSize(props.matrix.id, {
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
    generalContext.updateMatrixValue(
      props.matrix.id,
      rowIdx,
      colIdx,
      e.currentTarget.value
    );
  };

  return (
    <article
      className="matrix"
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        padding: '2rem',
        margin: '0 2rem 2rem 2rem',
        border: `5px solid ${props.matrix.color}`,
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'center' }}>
        {generalContext.isSelectionModeOn && (
          <fieldset>
            <input
              type="checkbox"
              checked={generalContext.selectedColorsArray.includes(
                props.matrix.color
              )}
              onChange={() => {
                generalContext.setSelectedColorsArray((arr) => {
                  if (arr.includes(props.matrix.color)) {
                    return arr.filter((c) => c !== props.matrix.color);
                  }
                  return [...arr, props.matrix.color];
                });
              }}
            />
          </fieldset>
        )}
        <fieldset>
          <label htmlFor={`matrix-${props.matrix.id}-rows-input`}>Rows</label>
          <input
            type="number"
            name="nRows"
            id={`matrix-${props.matrix.id}-rows-input`}
            onChange={updateMatrixSize}
            value={props.matrix.nRows}
            min="2"
            max="10"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="cols-input">Columns</label>
          <input
            type="number"
            name="nCols"
            id={`matrix-${props.matrix.id}-cols-input`}
            onChange={updateMatrixSize}
            value={props.matrix.nCols}
            min="2"
            max="10"
          />
        </fieldset>
        <button onClick={() => generalContext.deleteMatrix(props.matrix.id)}>
          Delete
        </button>
        {props.matrix.type === MatrixTypes.PRODUCT && (
          <Link to={`/product-steps/${props.matrix.id}`}>Product Steps</Link>
        )}
      </header>
      <table style={{ margin: '1rem 0' }}>
        <tbody>
          {props.matrix.table.map((row, rowIdx) => (
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
      {props.matrix.determinant !== null && (
        <footer style={{ display: 'flex', flexDirection: 'column' }}>
          <div>Determinant: {props.matrix.determinant.result}</div>
          <Link
            to={`/determinant-steps/${props.matrix.id}`}
            style={{ margin: '1rem 0' }}
          >
            Determinant Steps
          </Link>
          {props.matrix.determinant.result !== 0 && (
            <Link to={`/inverse-steps/${props.matrix.id}`}>
              Inverse Matrix Steps
            </Link>
          )}
        </footer>
      )}
    </article>
  );
};

export default Matrix;
