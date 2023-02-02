import { invertMatrix, NumberTable } from '../../helpers/matrix_calc_helpers';
import { useParams, useNavigate } from 'react-router-dom';
import GeneralContext from '../../store/GeneralContext';
import ReadOnlyMatrix from '../Matrix/ReadOnlyMatrix';
import { useContext } from 'react';

const InverseSteps = () => {
  const generalContext = useContext(GeneralContext);
  const { matrixId } = useParams();
  const navigate = useNavigate();

  const matrix = generalContext.matrices.find((m) => m.id === matrixId);
  const inverse = invertMatrix(matrix!.table as NumberTable);

  return (
    <>
      <h1>Inverse steps</h1>
      <ReadOnlyMatrix matrix={inverse} defaultTextColor="black" />
    </>
  );
};

export default InverseSteps;
