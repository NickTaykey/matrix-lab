import {
  Table,
  MatrixObject,
  MatrixProductObject,
  MatrixTypes,
} from '../store/matrix_reducer_types';
import { useState, useEffect, useContext } from 'react';
import GeneralContext from '../store/GeneralContext';
import ProductModal from './ProductModal';
import ReactModal from 'react-modal';
import React from 'react';

interface MatrixProps {
  matrix: MatrixObject | MatrixProductObject;
}

const Matrix = (props: MatrixProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    ReactModal.setAppElement('body');
  }, []);

  return (
    <>
      <ReactModal
        isOpen={isModalOpen}
        contentLabel="Matrix product explanation modal"
        style={{
          content: { width: '100vw', height: '100vh', top: '0', left: '0' },
        }}
      >
        <ProductModal
          closeModal={() => setIsModalOpen(false)}
          matrix={props.matrix as MatrixProductObject}
        />
      </ReactModal>
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
              name={`matrix-${props.matrix.id}-rows-input`}
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
              name={`matrix-${props.matrix.id}-cols-input`}
              id={`matrix-${props.matrix.id}-cols-input`}
              onChange={updateMatrixSize}
              value={props.matrix.nCols}
              min="2"
              max="10"
            />
          </fieldset>
          {props.matrix.type === MatrixTypes.PRODUCT && (
            <button onClick={() => setIsModalOpen((v) => !v)}>
              Show Product Steps
            </button>
          )}
        </header>
        <table>
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
        {}
        <footer>
          {props.matrix.determinant && (
            <span>Determinant: {props.matrix.determinant}</span>
          )}
        </footer>
      </article>
    </>
  );
};

export default Matrix;
