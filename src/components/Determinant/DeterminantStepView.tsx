import type { DeterminantStep } from '../../store/matrix_reducer_types';
import DeterminantStepsView from './DeterminantStepsView';
import ReadOnlyMatrix from '../Matrix/ReadOnlyMatrix';
import { BsTriangleFill } from 'react-icons/bs';
import * as fa from 'react-icons/fa';
import { useState } from 'react';

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
  const computeTimesIconMargin = () => {
    return `${window.innerWidth > 1024 ? 2 : 1}rem`;
  };
  const [isStepDropDownOpen, setStepDropDownState] = useState(false);
  return (
    <section
      style={{
        margin: '1rem 0',
      }}
    >
      <section
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            ...cellStyle,
            borderRadius: '15px',
            padding: '5px',
          }}
        >
          {currentCell}
        </span>
        <fa.FaTimes style={{ margin: `0 ${computeTimesIconMargin()}` }} />
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
        <fa.FaTimes style={{ margin: `0 ${computeTimesIconMargin()}` }} />
        {submatrix && (
          <section style={{ display: 'flex', alignItems: 'center' }}>
            <section
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div style={{ marginRight: '1rem' }}>det(</div>
              <ReadOnlyMatrix matrix={submatrix} defaultTextColor={textColor} />
              <div style={{ marginLeft: '1rem' }}>)</div>
            </section>
          </section>
        )}
      </section>
      {submatrixDeterminant &&
        submatrixDeterminant.steps &&
        submatrixDeterminant.steps.length > 1 && (
          <details style={{ marginTop: '1rem' }}>
            <hr style={{ margin: '1rem 0' }} />
            <summary
              onClick={() => setStepDropDownState((v) => !v)}
              style={{ backgroundColor: 'blueviolet', color: 'white' }}
              className="button"
            >
              <BsTriangleFill
                style={{
                  transition: 'transform .25s ease-in-out',
                  transform: `rotate(${isStepDropDownOpen ? 0.5 : 0.25}turn)`,
                  marginRight: '1rem',
                }}
              />
              Show determinant steps
            </summary>
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
            <hr style={{ margin: '1rem 0' }} />
          </details>
        )}
    </section>
  );
};

export default DeterminantStepView;
