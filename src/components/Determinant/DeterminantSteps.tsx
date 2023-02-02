import { NumberTable } from '../../helpers/matrix_calc_helpers';
import { useNavigate, useParams } from 'react-router-dom';
import DeterminantStepsView from './DeterminantStepsView';
import GeneralContext from '../../store/GeneralContext';
import { useContext } from 'react';

const DeterminantSteps = () => {
  const generalContext = useContext(GeneralContext);
  const { matrixId } = useParams();
  const navigate = useNavigate();

  const matrix = generalContext.matrices.find((m) => m.id === matrixId);

  return (
    <>
      <button onClick={() => navigate('/')}>Back</button>
      <h2 style={{ textAlign: 'center' }}>
        How to calculate determinant with Laplace expasion
      </h2>
      {matrix ? (
        <DeterminantStepsView matrix={matrix.table as NumberTable} topLevel />
      ) : (
        <h1>404 No matrix with ID {matrixId} was found!</h1>
      )}
    </>
  );
};

export default DeterminantSteps;
