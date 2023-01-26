import GeneralContext from './store/GeneralContext';
import { useEffect, useContext } from 'react';
import MenuHeader from './MenuHeader';
import Matrix from './Matrix';

const Menu = () => {
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    generalContext.createMatrix([
      [1, 2],
      [3, 4],
    ]);
    generalContext.createMatrix([
      [5, 2],
      [3, 7],
    ]);
    generalContext.createMatrix([
      [9, 10],
      [3, 11],
    ]);
  }, []);

  const createMatrix = () => {
    generalContext.createMatrix();
  };

  return (
    <>
      <h1>Matrix calculator</h1>
      <MenuHeader />
      <main
        style={{
          border: generalContext.isSelectionModeOn ? '4px solid blue' : 'none',
          padding: '0 2rem 2rem 2rem',
        }}
      >
        {generalContext.matrices.map((mat) => (
          <Matrix matrix={mat} key={mat.id} />
        ))}
        <button onClick={createMatrix}>New Matrix</button>
      </main>
    </>
  );
};

export default Menu;
