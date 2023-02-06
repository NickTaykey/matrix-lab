import GeneralContext from '../../store/GeneralContext';
import { SiMatrix } from 'react-icons/si';
import MenuHeader from './MenuHeader';
import Matrix from '../Matrix/Matrix';
import { useContext } from 'react';

const Menu = () => {
  const generalContext = useContext(GeneralContext);

  return (
    <>
      <h1
        style={{
          textAlign: 'center',
          margin: '2rem 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SiMatrix style={{ marginRight: '.5rem' }} /> Matrix Lab
      </h1>
      <MenuHeader />
      <main className="menu-grid" style={{ marginTop: '2rem' }}>
        {generalContext.matrices.map((mat) => (
          <Matrix matrix={mat} key={mat.id} />
        ))}
      </main>
    </>
  );
};

export default Menu;
