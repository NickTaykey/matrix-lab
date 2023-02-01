import type { DeterminantStep } from '../store/matrix_reducer_types';
import DeterminantStepsView from './DeterminantStepsView';
import ReadOnlyMatrix from './ReadOnlyMatrix';
import * as fa from 'react-icons/fa';

interface DeterminantStepViewProps {
  determinantSteps: DeterminantStep;
  textColor: string;
}

const DeterminantStepView = ({
  determinantSteps,
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
            ...determinantSteps.cellStyle,
            borderRadius: '15px',
            padding: '5px',
          }}
        >
          {determinantSteps.currentCell}
        </span>

        <fa.FaTimes style={{ margin: '0 2rem' }} />
        <span>
          (-1)
          <sup
            style={{
              ...determinantSteps.cellStyle,
              borderRadius: '15px',
              padding: '5px',
            }}
          >
            {determinantSteps.coords[0]} + {determinantSteps.coords[1]}
          </sup>
        </span>
        <fa.FaTimes style={{ margin: '0 2rem' }} />
        {determinantSteps.submatrix && (
          <section style={{ display: 'flex', alignItems: 'center' }}>
            <section
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '2rem',
              }}
            >
              <div style={{ marginRight: '1rem' }}>det(</div>
              <ReadOnlyMatrix
                matrix={determinantSteps.submatrix}
                defaultTextColor={textColor}
              />
              <div style={{ marginLeft: '1rem' }}>)</div>
            </section>
          </section>
        )}
      </section>
      {determinantSteps.submatrixDeterminantSteps &&
        determinantSteps.submatrixDeterminantSteps.length > 1 && (
          <details style={{ marginTop: '1rem' }}>
            <summary>Show determinant steps</summary>
            {determinantSteps.submatrixDeterminantSteps.map((s) => (
              <DeterminantStepsView
                key={`determinant-${crypto.randomUUID()}`}
                matrix={s.submatrix!}
              />
            ))}
          </details>
        )}
    </section>
  );
};

export default DeterminantStepView;
