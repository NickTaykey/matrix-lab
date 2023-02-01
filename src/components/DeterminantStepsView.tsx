import {
  getDeterminantAndSteps,
  NumberTable,
} from '../helpers/matrix_calc_helpers';
import { genRandomColor, isColorDark } from '../helpers/color_utils';
import DeterminantStepView from './DeterminantStepView';
import ReadOnlyMatrix from './ReadOnlyMatrix';
import * as fa from 'react-icons/fa';

interface DeterminantStepsViewProps {
  matrix: NumberTable;
  topLevel?: boolean;
}

const DeterminantStepsView = (props: DeterminantStepsViewProps) => {
  const { result, steps } = getDeterminantAndSteps(props.matrix);
  let backgroundColor = 'white';
  let textColor = 'black';

  if (!props.topLevel) {
    backgroundColor = genRandomColor(1);
    textColor = isColorDark(backgroundColor) ? 'white' : 'black';
  }

  return (
    <>
      {!props.topLevel && <hr />}
      <section
        style={{
          backgroundColor,
          padding: '1rem 0',
          color: textColor,
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
              defaultTextColor={
                isColorDark(backgroundColor) ? 'white' : 'black'
              }
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
          {steps!.map((step, stepIdx) => (
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
                textColor={textColor}
              />
              <fa.FaEquals
                style={{
                  margin: '1rem 0',
                }}
              />
            </article>
          ))}
        </main>
        <footer style={{ marginTop: '2rem' }}>{result}</footer>
      </section>
    </>
  );
};

export default DeterminantStepsView;
