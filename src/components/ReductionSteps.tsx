import { NumberTable, scaleReduction } from '../helpers/matrix_calc_helpers';
import { genRandomColor } from '../helpers/color_utils';
import GeneralContext from '../store/GeneralContext';
import ReadOnlyMatrix from './Matrix/ReadOnlyMatrix';
import StepPageHeader from './StepPageHeader';
import { useParams } from 'react-router-dom';
import Fraction from 'fraction.js';
import { useContext } from 'react';

const ReductionSteps = () => {
  const generalContext = useContext(GeneralContext);
  const { matrixId } = useParams();

  const matrix = generalContext.matrices.find((m) => m.id === matrixId);

  const rrefSteps = matrix ? scaleReduction(matrix.table as NumberTable) : null;

  return (
    <>
      <StepPageHeader headerTitle="Reduced Matrix (rref)" />
      {rrefSteps ? (
        rrefSteps.steps.map((s) => {
          let rowColors = new Array(s.matrix[0].length).fill('transparent');
          if (s.rows.length) {
            rowColors = rowColors.map((_, i) => {
              return s.rows.includes(i) ? genRandomColor() : 'transparent';
            });
          }
          return (
            <article
              key={`${crypto.randomUUID()}-rref-step`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '2rem',
              }}
            >
              <h3 style={{ marginBottom: '2rem' }}>{s.message}</h3>
              <ReadOnlyMatrix
                matrix={s.matrix.map((r) => {
                  return r.map((v) => new Fraction(v).toFraction());
                })}
                rowColors={rowColors}
                defaultTextColor="black"
              />
            </article>
          );
        })
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default ReductionSteps;
