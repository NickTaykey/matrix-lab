import matrixArrayReducer from './menu_helpers';
import { useReducer } from 'react';
import Matrix from './Matrix';

const Menu = () => {
  const [matrixArray, dispatchMatrixArray] = useReducer(matrixArrayReducer, []);

  const createMatrix = () => {
    dispatchMatrixArray({ type: 'ADD_MATRIX' });
  };

  return (
    <>
      <h1>Matrix calculator</h1>
      <main>
        {matrixArray.map((mat) => (
          <Matrix
            dispatchMatrixArray={dispatchMatrixArray}
            key={mat.id}
            {...mat}
          />
        ))}
      </main>
      <button onClick={createMatrix}>Add Matrix</button>
    </>
  );
};

export default Menu;
