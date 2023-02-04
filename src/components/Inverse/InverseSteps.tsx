import {
  inverseMatrixWithScaleReduction,
  NumberTable,
} from '../../helpers/matrix_calc_helpers';
import { useNavigate, useParams } from 'react-router-dom';
import GeneralContext from '../../store/GeneralContext';
import ReadOnlyMatrix from '../Matrix/ReadOnlyMatrix';
import { useContext } from 'react';
import Fraction from 'fraction.js';

const InverseSteps = () => {
  const generalContext = useContext(GeneralContext);
  const { matrixId } = useParams();
  const navigate = useNavigate();

  const matrix = generalContext.matrices.find((m) => m.id === matrixId);

  const inverse = matrix
    ? inverseMatrixWithScaleReduction([
        ...matrix!.table.map((r) => [...r]),
      ] as NumberTable)
    : null;

  return (
    <main
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <button onClick={() => navigate('/')}>Back</button>
      <h1>Inverse steps</h1>
      {inverse ? (
        inverse.steps.map((s, i) => (
          <article
            key={`${matrixId}-step-${i}`}
            style={{ display: 'flex', marginBottom: '1rem' }}
          >
            <ReadOnlyMatrix
              matrix={s.leftMatrix.map((r) => {
                return r.map((v) => new Fraction(v.toFixed(2)).toFraction());
              })}
              defaultTextColor="black"
            />
            <ReadOnlyMatrix
              matrix={s.rightMatrix.map((r) => {
                return r.map((v) => new Fraction(v.toFixed(2)).toFraction());
              })}
              defaultTextColor="black"
            />
          </article>
        ))
      ) : (
        <div>Loading</div>
      )}
    </main>
  );
};

export default InverseSteps;
