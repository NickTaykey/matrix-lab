import {
  decimalToFraction,
  invertMatrix,
  NumberTable,
} from '../../helpers/matrix_calc_helpers';
import { useParams, useNavigate } from 'react-router-dom';
import GeneralContext from '../../store/GeneralContext';
import ReadOnlyMatrix from '../Matrix/ReadOnlyMatrix';
import { useContext } from 'react';

const InverseSteps = () => {
  const generalContext = useContext(GeneralContext);
  const { matrixId } = useParams();
  const navigate = useNavigate();

  const matrix = generalContext.matrices.find((m) => m.id === matrixId);

  const inverse = matrix
    ? invertMatrix([...matrix!.table.map((r) => [...r])] as NumberTable)
    : null;

  const fractionedInverse = inverse
    ? inverse.map((r) => {
        return r.map((n) => {
          const f = decimalToFraction(n);
          return `${f.numerator} / ${f.denominator}`;
        });
      })
    : null;

  return (
    <>
      <h1>Inverse steps</h1>
      {fractionedInverse ? (
        <ReadOnlyMatrix matrix={fractionedInverse} defaultTextColor="black" />
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default InverseSteps;
