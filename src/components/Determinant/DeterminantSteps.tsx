import { NumberTable } from '../../helpers/matrix_calc_helpers';
import DeterminantStepsView from './DeterminantStepsView';
import GeneralContext from '../../store/GeneralContext';
import StepPageHeader from '../StepPageHeader';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';

const DeterminantSteps = () => {
  const generalContext = useContext(GeneralContext);
  const { matrixId } = useParams();

  const matrix = generalContext.matrices.find((m) => m.id === matrixId);

  return (
    <>
      <StepPageHeader headerTitle="Determinant with Laplace Expansion" />
      {matrix ? (
        <main style={{ fontSize: '.75rem' }}>
          <DeterminantStepsView matrix={matrix.table as NumberTable} topLevel />
        </main>
      ) : (
        <h1>404 No matrix with ID {matrixId} was found!</h1>
      )}
    </>
  );
};

export default DeterminantSteps;
