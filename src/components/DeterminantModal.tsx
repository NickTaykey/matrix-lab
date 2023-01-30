import { MatrixProductObject } from '../store/matrix_reducer_types';
import DeterminantStepView from './DeterminantStepView';
import * as fa from 'react-icons/fa';

interface DeterminantModalProps {
  closeModal(): void;
  matrix: MatrixProductObject;
}

const DeterminantModal = (props: DeterminantModalProps) => {
  return (
    <>
      <button onClick={props.closeModal}>Close</button>
      <section style={{ textAlign: 'center' }}>
        <h2 style={{ textAlign: 'center' }}>
          How to calculate determinant with Laplace expasion
        </h2>
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {props.matrix.determinant!.steps!.map((step, stepIdx) => (
            <article
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              key={`determinat-step-${stepIdx}`}
            >
              <DeterminantStepView {...step} />
              <fa.FaEquals
                style={{
                  margin: '1rem 0',
                }}
              />
            </article>
          ))}
        </main>
        <footer style={{ marginTop: '1rem' }}>
          {props.matrix.determinant!.result}
        </footer>
      </section>
    </>
  );
};

export default DeterminantModal;
