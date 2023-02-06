import {
  MatrixObject,
  MatrixProductObject,
  MatrixTypes,
} from '../../store/matrix_reducer_types';
import { isNumberTable } from '../../store/GeneralContextProvider';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import GeneralContext from '../../store/GeneralContext';
import { FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import { fieldsetStyle, inputStyle } from '../styles';
import { AiOutlineNumber } from 'react-icons/ai';
import { TbAntennaBars5 } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import React from 'react';

interface MatrixProps {
  matrix: MatrixObject | MatrixProductObject;
}

const computeCellWidth = (nCells: number) => {
  return (window.innerWidth - 150) / nCells;
};

const Matrix = (props: MatrixProps) => {
  const { table, determinant, id, color, nRows, nCols, type } = props.matrix;
  const generalContext = useContext(GeneralContext);
  const [computedCellWidth, setComputedCellWidth] = useState<number>(
    computeCellWidth(table[0].length)
  );

  const updateMatrixSize = (e: React.FormEvent<HTMLInputElement>) => {
    generalContext.updateMatrixSize(id, {
      newNRows:
        e.currentTarget.name === 'nRows' ? Number(e.currentTarget.value) : null,
      newNCols:
        e.currentTarget.name === 'nCols' ? Number(e.currentTarget.value) : null,
    });
    if (e.currentTarget.name === 'nCols') {
      setComputedCellWidth(computeCellWidth(Number(e.currentTarget.value)));
    }
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
      className="matrix-card"
      style={{
        border: `5px solid ${color}`,
      }}
    >
      <header>
        {generalContext.isSelectionModeOn && (
          <fieldset
            style={{
              ...fieldsetStyle,
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem',
              background: 'linear-gradient(to right, #ffb347, #ffcc33)',
            }}
          >
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
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <section
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <button
              className="button"
              onClick={() => generalContext.deleteMatrix(id)}
              style={{
                marginRight: type === MatrixTypes.PRODUCT ? '1rem' : 0,
              }}
            >
              <FaRegTrashAlt />
            </button>
          </section>
          <section style={{ display: 'flex', justifyContent: 'center' }}>
            <fieldset style={fieldsetStyle}>
              <label
                htmlFor={`matrix-${id}-rows-input`}
                style={{ marginRight: '.5rem' }}
              >
                Rows
              </label>
              <input
                type="number"
                style={inputStyle}
                name="nRows"
                id={`matrix-${id}-rows-input`}
                onChange={updateMatrixSize}
                value={nRows}
                min="2"
                max="10"
              />
            </fieldset>
            <fieldset style={fieldsetStyle}>
              <label
                id={`matrix-${id}-cols-input`}
                style={{ marginRight: '.5rem' }}
              >
                Cols
              </label>
              <input
                type="number"
                style={inputStyle}
                name="nCols"
                id={`matrix-${id}-cols-input`}
                onChange={updateMatrixSize}
                value={nCols}
                min="2"
                max="10"
              />
            </fieldset>
          </section>
        </section>
      </header>
      <table style={{ margin: '1rem 0' }}>
        <tbody>
          {table.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, cellIdx) => (
                <td key={`${rowIdx}-${cellIdx}`}>
                  <input
                    style={{
                      ...inputStyle,
                      width:
                        window.innerWidth <= 1024
                          ? `${computedCellWidth}px`
                          : 'auto',
                      maxWidth:
                        window.innerWidth <= 1024
                          ? `${computedCellWidth}px`
                          : 'auto',
                    }}
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
        <footer style={{ display: 'flex', flexDirection: 'column' }}>
          {determinant !== null && table.length === table[0].length && (
            <>
              <h3 style={{ margin: '.5rem 0', textAlign: 'center' }}>
                Determinant: {determinant.result}
              </h3>
              <Link
                className="button"
                to={`/determinant-steps/${id}`}
                style={{ marginTop: '1rem' }}
              >
                <AiOutlineNumber style={{ marginRight: '.5rem' }} />
                Determinant Steps
              </Link>
              {determinant.result !== 0 && (
                <Link
                  className="button"
                  style={{ marginTop: '1rem' }}
                  to={`/inverse-steps/${id}`}
                >
                  <strong style={{ marginRight: '.5rem' }}>(-1)</strong>
                  Inverse Matrix Steps
                </Link>
              )}
            </>
          )}
          <Link
            className="button"
            to={`/rref/${id}`}
            style={{ marginTop: '1rem' }}
          >
            <TbAntennaBars5
              style={{ transform: 'rotate(0.75turn)', marginRight: '.5rem' }}
            />
            RREF Steps
          </Link>
          <Link
            className="button"
            to={`/transpose/${id}`}
            style={{ marginTop: '1rem' }}
          >
            <MdOutlineSpaceDashboard style={{ marginRight: '.5rem' }} />
            Transpose Matrix
          </Link>
          {type === MatrixTypes.PRODUCT && (
            <Link
              style={{ marginTop: '1rem', backgroundColor: 'coral' }}
              to={`/product-steps/${id}`}
              className="button"
            >
              <FaTimes
                style={{
                  marginRight: '.5rem',
                }}
              />{' '}
              Product Steps
            </Link>
          )}
        </footer>
      )}
    </article>
  );
};

export default Matrix;
