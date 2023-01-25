import matrixArrayReducer, {
  MatrixObjectType,
  MatrixActionTypes,
  MatrixArray,
} from './menu_helpers';
import matrixProduct, { NumberMatrix } from './matrix_helpers';
import MatrixSelectionMenu from './MatrixSelectionMenu';
import { useEffect, useReducer, useState } from 'react';
import ErrorAlert from './ErrorAlert';
import Matrix from './Matrix';

const Menu = () => {
  const [matrixArray, dispatchMatrixArray] = useReducer(matrixArrayReducer, []);
  const [selectedColorArray, setSelectedColorArray] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSelectionModeOn, toggleSelectionMode] = useState(false);

  useEffect(() => {
    dispatchMatrixArray({
      type: MatrixActionTypes.ADD_MATRIX,
      payload: {
        matrix: [
          [1, 2],
          [3, 4],
        ],
      },
    });
    dispatchMatrixArray({
      type: MatrixActionTypes.ADD_MATRIX,
      payload: {
        matrix: [
          [5, 2],
          [3, 7],
        ],
      },
    });
    dispatchMatrixArray({
      type: MatrixActionTypes.ADD_MATRIX,
      payload: {
        matrix: [
          [9, 10],
          [3, 11],
        ],
      },
    });
  }, []);

  const createMatrix = () => {
    dispatchMatrixArray({ type: MatrixActionTypes.ADD_MATRIX, payload: {} });
  };

  const multiplySelectedMatrix = () => {
    let foundNotValidMatrix = false;

    const selected = selectedColorArray
      .map((c) => matrixArray.find((m) => m.color === c)! as MatrixObjectType)
      .map((m, i) => {
        return m.matrix.map((r) => {
          return r.map((n) => {
            const t = Number(n);
            if (isNaN(t)) {
              setErrorMessage(`Invalid value ${t} in matrix ${i}`);
              foundNotValidMatrix = true;
            }
            return t;
          });
        });
      });

    let res: MatrixArray = [];

    for (let i = 0; i < selected.length - 1 && !foundNotValidMatrix; ++i) {
      const nextMatrix = (
        res.length === 0 ? selected[i + 1] : res
      ) as NumberMatrix;

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
      dispatchMatrixArray({
        type: MatrixActionTypes.ADD_MATRIX,
        payload: { matrix: res },
      });
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
            selectedColorArray={selectedColorArray}
            setSelectedColorArray={setSelectedColorArray}
            dispatchMatrixArray={dispatchMatrixArray}
            isSelectionModeOn={isSelectionModeOn}
            matrix={mat}
            key={mat.id}
          />
        ))}
        <button onClick={createMatrix}>New Matrix</button>
      </main>
    </>
  );
};

export default Menu;
