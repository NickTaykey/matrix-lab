import {
  MatrixObject,
  MatrixProductObject,
  MatrixTypes,
} from '../store/matrix_reducer_types';
import { useState, useEffect, useContext } from 'react';
import GeneralContext from '../store/GeneralContext';
import DeterminantModal from './DeterminantModal';
import ProductModal from './ProductModal';
import ReactModal from 'react-modal';
import React from 'react';

interface MatrixProps {
  matrix: MatrixObject | MatrixProductObject;
}

enum ModalNames {
  PRODUCT_STEPS_MODAL,
  DETERMINANT_STEPS_MODAL,
}

const Matrix = (props: MatrixProps) => {
  const [modalState, setModalState] = useState<{
    modalName: ModalNames | null;
    isOpen: boolean;
  }>({ modalName: null, isOpen: false });
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
        isOpen={modalState.isOpen}
        contentLabel="Matrix product explanation modal"
        style={{
          content: { width: '100vw', height: '100vh', top: '0', left: '0' },
        }}
      >
        {modalState.modalName === ModalNames.PRODUCT_STEPS_MODAL && (
          <ProductModal
            closeModal={() =>
              setModalState((c) => ({
                modalName: c.modalName ? null : ModalNames.PRODUCT_STEPS_MODAL,
                isOpen: !c.isOpen,
              }))
            }
            matrix={props.matrix as MatrixProductObject}
          />
        )}
        {modalState.modalName === ModalNames.DETERMINANT_STEPS_MODAL && (
          <DeterminantModal
            closeModal={() =>
              setModalState((c) => ({
                modalName: c.modalName
                  ? null
                  : ModalNames.DETERMINANT_STEPS_MODAL,
                isOpen: !c.isOpen,
              }))
            }
            matrix={props.matrix as MatrixProductObject}
          />
        )}
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
          {props.matrix.type === MatrixTypes.PRODUCT && (
            <button
              onClick={() => {
                setModalState({
                  isOpen: true,
                  modalName: ModalNames.PRODUCT_STEPS_MODAL,
                });
              }}
            >
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
        {props.matrix.determinant && (
          <footer>
            <div>Determinant: {props.matrix.determinant.result}</div>
            <button
              onClick={() => {
                setModalState({
                  isOpen: true,
                  modalName: ModalNames.DETERMINANT_STEPS_MODAL,
                });
              }}
            >
              Determinant Step by Step
            </button>
          </footer>
        )}
      </article>
    </>
  );
};

export default Matrix;
