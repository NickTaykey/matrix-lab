import { useNavigate, useParams } from 'react-router-dom';
import DeterminantStepView from './DeterminantStepView';
import GeneralContext from '../store/GeneralContext';
import * as fa from 'react-icons/fa';
import { useContext } from 'react';

const DeterminantSteps = () => {
  const generalContext = useContext(GeneralContext);
  const { matrixId } = useParams();
  const navigate = useNavigate();

  const matrix = generalContext.matrices.find((m) => m.id === matrixId);

  return (
    <>
      <button onClick={() => navigate('/')}>Back</button>
      {matrix ? (
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
            {matrix.determinant!.steps!.map((step, stepIdx) => (
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
            {matrix.determinant!.result}
          </footer>
        </section>
      ) : (
        <h1>404 No matrix with ID {matrixId} was found!</h1>
      )}
    </>
  );
};

export default DeterminantSteps;
