import GeneralContext from '../../store/GeneralContext';
import MenuHeader from './MenuHeader';
import { useContext } from 'react';
import Matrix from '../Matrix/Matrix';

const Menu = () => {
  const generalContext = useContext(GeneralContext);

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
