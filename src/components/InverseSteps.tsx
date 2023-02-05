import {
  inverseMatrixWithScaleReduction,
  NumberTable,
} from '../helpers/matrix_calc_helpers';
import { genRandomColor } from '../helpers/color_utils';
import { useNavigate, useParams } from 'react-router-dom';
import GeneralContext from '../store/GeneralContext';
import ReadOnlyMatrix from './Matrix/ReadOnlyMatrix';
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
      {inverse ? (
        <>
          <h2>Inverse matrix:</h2>
          <ReadOnlyMatrix
            matrix={inverse.table.map((r) => {
              return r.map((v) => new Fraction(v).toFraction());
            })}
            defaultTextColor="black"
          />
          <h2>Follow these steps</h2>
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
                <h3 style={{ marginBottom: '1rem' }}>{s.message}</h3>
                <section style={{ display: 'flex' }}>
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
