import MatrixSelectionMenu from './MatrixSelectionMenu';
import { matrixProduct } from './matrix_helpers';
import matrixArrayReducer from './menu_helpers';
import { useEffect, useReducer, useState } from 'react';
import Matrix from './Matrix';
import ErrorAlert from './ErrorAlert';

const Menu = () => {
  const [matrixArray, dispatchMatrixArray] = useReducer(matrixArrayReducer, []);
  const [isSelectionModeOn, toggleSelectionMode] = useState(false);
  const [selectedColorArray, setSelectedColorArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    dispatchMatrixArray({
      type: 'ADD_MATRIX',
      payload: {
        matrix: [
          [1, 2],
          [3, 4],
        ],
      },
    });
    dispatchMatrixArray({
      type: 'ADD_MATRIX',
      payload: {
        matrix: [
          [5, 2],
          [3, 7],
        ],
      },
    });
    dispatchMatrixArray({
      type: 'ADD_MATRIX',
      payload: {
        matrix: [
          [9, 10],
          [3, 11],
        ],
      },
    });
  }, []);

  const createMatrix = () => {
    dispatchMatrixArray({ type: 'ADD_MATRIX' });
  };

  const multiplySelectedMatrix = () => {
    let foundNotValidMatrix = false;

    const selected = selectedColorArray
      .map((c) => matrixArray.find((m) => m.color === c))
      .map((m, i) => {
        return m.matrix.map((r) =>
          r.map((n) => {
            const t = Number(n);
            if (isNaN(t)) {
              setErrorMessage(`Invalid value ${t} in matrix ${i}`);
              foundNotValidMatrix = true;
            }
            return t;
          })
        );
      });

    let res = [];

    for (let i = 0; i < selected.length - 1 && !foundNotValidMatrix; ++i) {
      const nextMatrix = res.length === 0 ? selected[i + 1] : res;
      if (selected[i][0].length !== nextMatrix.length) {
        setErrorMessage(
          `Error: ${
            i === 0
              ? 'The first matrix cannot be multiplied with the second!'
              : `Matrix ${i} cannot be multiplied with the others!`
          }`
        );
        foundNotValidMatrix = true;
      }
      res = matrixProduct(selected[i], nextMatrix);
    }

    if (!foundNotValidMatrix && res.length) {
      dispatchMatrixArray({ type: 'ADD_MATRIX', payload: { matrix: res } });
    }
  };

  return (
    <>
      <h1>Matrix calculator</h1>
      <header>
        <MatrixSelectionMenu
          toggleSelectionMode={toggleSelectionMode}
          selectedColorArray={selectedColorArray}
        />
        <button
          onClick={multiplySelectedMatrix}
          style={{ margin: '2rem auto' }}
        >
          Multiply!
        </button>
        {errorMessage && <ErrorAlert message={errorMessage} />}
      </header>
      <main
        style={{
          border: isSelectionModeOn ? '4px solid blue' : 'none',
          padding: '0 2rem 2rem 2rem',
        }}
      >
        {matrixArray.map((mat) => (
          <Matrix
            setSelectedColorArray={setSelectedColorArray}
            dispatchMatrixArray={dispatchMatrixArray}
            isSelectionModeOn={isSelectionModeOn}
            key={mat.id}
            {...mat}
          />
        ))}
        <button onClick={createMatrix}>New Matrix</button>
      </main>
    </>
  );
};

export default Menu;
