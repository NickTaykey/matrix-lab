import {
  GenericMatrixReducerAction,
  MatrixActionTypes,
  MatrixObjectType,
} from './menu_helpers';
import React from 'react';
import ReactModal from 'react-modal';
import { useState } from 'react';
import { useEffect } from 'react';

interface MatrixProps {
  dispatchMatrixArray(action: GenericMatrixReducerAction): void;
  setSelectedColorArray(cb: (colors: string[]) => string[]): void;
  selectedColorArray: string[];
  isSelectionModeOn: boolean;
  matrix: MatrixObjectType;
}

const Matrix = (props: MatrixProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateMatrixSize = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === 'nCols') {
      props.dispatchMatrixArray({
        type: MatrixActionTypes.UPDATE_MATRIX_SIZE,
        payload: {
          id: props.matrix.id,
          newNCols: Number(e.currentTarget.value),
        },
      });
    }
    if (e.currentTarget.name === 'nRows') {
      props.dispatchMatrixArray({
        type: MatrixActionTypes.UPDATE_MATRIX_SIZE,
        payload: {
          id: props.matrix.id,
          newNRows: Number(e.currentTarget.value),
        },
      });
    }
  };

  const updateCellValue = (e: React.FormEvent<HTMLInputElement>) => {
    let [rowIdx, colIdx] = e.currentTarget
      .getAttribute('id')!
      .split('-')
      .map((v) => Number(v));
    props.dispatchMatrixArray({
      type: MatrixActionTypes.UPDATE_MATRIX_VALUE,
      payload: {
        id: props.matrix.id,
        newValue: e.currentTarget.value,
        colIdx,
        rowIdx,
      },
    });
  };

  useEffect(() => {
    ReactModal.setAppElement('body');
  }, []);

  return (
    <>
      <ReactModal
        isOpen={isModalOpen}
        contentLabel="Matrix product explanation modal"
      >
        <button onClick={() => setIsModalOpen((v) => !v)}>Close</button>
      </ReactModal>
      <article
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          padding: '2rem',
          margin: '0 2rem 2rem 2rem',
          border: `5px solid ${props.matrix.color}`,
        }}
      >
        {props.isSelectionModeOn && (
          <input
            type="checkbox"
            checked={props.selectedColorArray.includes(props.matrix.color)}
            onChange={() => {
              props.setSelectedColorArray((arr) => {
                if (arr.includes(props.matrix.color)) {
                  return arr.filter((c) => c !== props.matrix.color);
                }
                return [...arr, props.matrix.color];
              });
            }}
          />
        )}
        <header style={{ display: 'flex', justifyContent: 'center' }}>
          <fieldset>
            <label htmlFor="rows-input">Rows</label>
            <input
              type="number"
              name="nRows"
              id="rows-input"
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
              id="cols-input"
              onChange={updateMatrixSize}
              value={props.matrix.nCols}
              min="2"
              max="10"
            />
          </fieldset>
          <button onClick={() => setIsModalOpen((v) => !v)}>
            Show Product Steps
          </button>
        </header>
        <table>
          <tbody>
            {props.matrix.matrix.map((row, rowIdx) => (
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
    </>
  );
};

export default Matrix;
