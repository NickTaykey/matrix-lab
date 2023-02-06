import {
  inverseMatrixWithScaleReduction,
  NumberTable,
} from '../helpers/matrix_calc_helpers';
import { genRandomColor } from '../helpers/color_utils';
import GeneralContext from '../store/GeneralContext';
import ReadOnlyMatrix from './Matrix/ReadOnlyMatrix';
import StepPageHeader from './StepPageHeader';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import Fraction from 'fraction.js';

const InverseSteps = () => {
  const generalContext = useContext(GeneralContext);
  const { matrixId } = useParams();

  const matrix = generalContext.matrices.find((m) => m.id === matrixId);

  const inverse = matrix
    ? inverseMatrixWithScaleReduction([
        ...matrix!.table.map((r) => [...r]),
      ] as NumberTable)
    : null;

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {inverse ? (
        <>
          <StepPageHeader headerTitle="Inverse Matrix" />
          <ReadOnlyMatrix
            matrix={inverse.table.map((r) => {
              return r.map((v) => new Fraction(v).toFraction());
            })}
            defaultTextColor="black"
          />
          {inverse.steps.map((s, i) => {
            const rowColors = new Array(s.leftMatrix.length).fill(
              'transparent'
            );
            if (s.row !== null) rowColors[s.row] = genRandomColor();
            return (
              <article
                key={`${matrixId}-step-${i}`}
                style={{ marginBottom: '3rem' }}
              >
                <h3
                  style={{
                    marginTop: i === 0 ? '2rem' : 0,
                    marginBottom: '2rem',
                  }}
                >
                  {s.message}
                </h3>
                <section
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <ReadOnlyMatrix
                    matrix={s.leftMatrix.map((r) => {
                      return r.map((v) =>
                        new Fraction(v.toFixed(2)).toFraction()
                      );
                    })}
                    rowColors={rowColors}
                    defaultTextColor="black"
                  />
                  <ReadOnlyMatrix
                    matrix={s.rightMatrix.map((r) => {
                      return r.map((v) =>
                        new Fraction(v.toFixed(2)).toFraction()
                      );
                    })}
                    rowColors={rowColors}
                    defaultTextColor="black"
                  />
                </section>
              </article>
            );
          })}
        </>
      ) : (
        <div>Loading</div>
      )}
    </main>
  );
};

export default InverseSteps;
