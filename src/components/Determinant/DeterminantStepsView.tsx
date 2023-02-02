import {
  getDeterminantAndSteps,
  NumberTable,
} from '../../helpers/matrix_calc_helpers';
import DeterminantStepView from './DeterminantStepView';
import ReadOnlyMatrix from '../Matrix/ReadOnlyMatrix';
import * as fa from 'react-icons/fa';

interface DeterminantStepsViewProps {
  matrix: NumberTable;
  topLevel?: boolean;
}

const DeterminantStepsView = (props: DeterminantStepsViewProps) => {
  const { result, steps } = getDeterminantAndSteps(props.matrix);

  return (
    <>
      <section
        style={{
          padding: '1rem 0',
          textAlign: 'center',
        }}
      >
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <article style={{ marginBottom: '2rem' }}>
            <ReadOnlyMatrix
              matrix={props.matrix}
              defaultTextColor="black"
              highlightedCells={
                steps
                  ? steps.map((s) => ({
                      colIdx: s.coords[1] - 1,
                      backgroundColor: s.cellStyle.backgroundColor,
                      color: s.cellStyle.color,
                    }))
                  : undefined
              }
            />
          </article>
          {steps &&
            steps.map((step, stepIdx) => (
              <article
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                key={`determinat-step-${stepIdx}`}
              >
                <DeterminantStepView
                  determinantSteps={step}
                  textColor="black"
                />
                {props.topLevel && (
                  <>
                    {stepIdx === steps.length - 1 ? (
                      <fa.FaEquals
                        style={{
                          margin: '1rem 0',
                        }}
                      />
                    ) : (
                      <fa.FaPlus
                        style={{
                          margin: '1rem 0',
                        }}
                      />
                    )}
                  </>
                )}
              </article>
            ))}
        </main>
        {props.topLevel && (
          <footer style={{ marginTop: '2rem' }}>{result}</footer>
        )}
      </section>
    </>
  );
};

export default DeterminantStepsView;
