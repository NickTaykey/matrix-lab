import type { DeterminantStep } from '../../store/matrix_reducer_types';
import DeterminantStepsView from './DeterminantStepsView';
import ReadOnlyMatrix from '../Matrix/ReadOnlyMatrix';
import * as fa from 'react-icons/fa';

interface DeterminantStepViewProps {
  determinantSteps: DeterminantStep;
  textColor: string;
}

const DeterminantStepView = ({
  determinantSteps: {
    submatrixDeterminant,
    currentCell,
    submatrix,
    cellStyle,
    coords,
  },
  textColor,
}: DeterminantStepViewProps) => {
  return (
    <section
      style={{
        margin: '1rem 0',
      }}
    >
      <section style={{ display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            ...cellStyle,
            borderRadius: '15px',
            padding: '5px',
          }}
        >
          {currentCell}
        </span>

        <fa.FaTimes style={{ margin: '0 2rem' }} />
        <span>
          (-1)
          <sup
            style={{
              ...cellStyle,
              borderRadius: '15px',
              padding: '5px',
            }}
          >
            {coords[0]} + {coords[1]}
          </sup>
        </span>
        <fa.FaTimes style={{ margin: '0 2rem' }} />
        {submatrix && (
          <section style={{ display: 'flex', alignItems: 'center' }}>
            <section
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '2rem',
              }}
            >
              <div style={{ marginRight: '1rem' }}>det(</div>
              <ReadOnlyMatrix matrix={submatrix} defaultTextColor={textColor} />
              <div style={{ marginLeft: '1rem' }}>)</div>
            </section>
          </section>
        )}
      </section>
      {submatrixDeterminant.steps && submatrixDeterminant.steps.length > 1 && (
        <details style={{ marginTop: '1rem' }}>
          <hr />
          <summary>Show determinant steps</summary>
          {submatrixDeterminant.steps.map((step, stepIdx) => (
            <article key={`determinant-${crypto.randomUUID()}`}>
              <DeterminantStepsView matrix={step.submatrix!} />
              {stepIdx === submatrixDeterminant.steps!.length - 1 ? (
                <>
                  <fa.FaEquals
                    style={{
                      margin: '1rem 0',
                    }}
                  />
                  <footer style={{ marginTop: '2rem' }}>
                    {submatrixDeterminant.result}
                  </footer>
                </>
              ) : (
                <fa.FaPlus
                  style={{
                    margin: '1rem 0',
                  }}
                />
              )}
            </article>
          ))}
          <hr />
        </details>
      )}
    </section>
  );
};

export default DeterminantStepView;
