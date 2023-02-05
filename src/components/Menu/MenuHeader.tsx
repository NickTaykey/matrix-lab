import GeneralContext from '../../store/GeneralContext';
import MatrixSelectionMenu from './MatrixSelectionMenu';
import ErrorAlert from '../../components/ErrorAlert';
import { useContext } from 'react';

const MenuHeader = () => {
  const generalContext = useContext(GeneralContext);

  return (
    <header className="menu-header">
      <MatrixSelectionMenu />
      {generalContext.errorMessage && (
        <ErrorAlert message={generalContext.errorMessage} />
      )}
    </header>
  );
};

export default MenuHeader;
