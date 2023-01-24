import matrixArrayReducer from './menu_helpers';
import { useReducer, useState } from 'react';
import Matrix from './Matrix';
import MatrixSelectionMenu from './MatrixSelectionMenu';

const Menu = () => {
  const [matrixArray, dispatchMatrixArray] = useReducer(matrixArrayReducer, []);
  const [isSelectionModeOn, toggleSelectionMode] = useState(false);

  const createMatrix = () => {
    dispatchMatrixArray({ type: 'ADD_MATRIX' });
  };

  return (
    <>
      <h1>Matrix calculator</h1>
      <MatrixSelectionMenu
        toggleSelectionMode={toggleSelectionMode}
        matrixArray={matrixArray}
      />
      <main
        style={{
          border: isSelectionModeOn ? '4px solid blue' : 'none',
          padding: '2rem',
          margin: '4rem',
        }}
      >
        {matrixArray.map((mat) => (
          <Matrix
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
