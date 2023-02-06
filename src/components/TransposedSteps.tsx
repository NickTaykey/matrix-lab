import { NumberTable, transposeMatrix } from '../helpers/matrix_calc_helpers';
import { genRandomColor } from '../helpers/color_utils';
import ReadOnlyMatrix from './Matrix/ReadOnlyMatrix';
import GeneralContext from '../store/GeneralContext';
import StepPageHeader from './StepPageHeader';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';

const TransposedSteps = () => {
  const generalContext = useContext(GeneralContext);
  const { matrixId } = useParams();

  const matrix = generalContext.matrices.find((m) => m.id === matrixId);

  const transpose = matrix
    ? transposeMatrix(matrix.table as NumberTable)
    : null;

  const randomColors = transpose ? transpose.map(() => genRandomColor()) : [];

  return (
    <>
      <StepPageHeader headerTitle="Trasponse Matrix" />
      {transpose && matrix ? (
        <main
          style={{
            width: '90%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '2rem',
          }}
        >
          <article style={{ marginBottom: '2rem' }}>
            <ReadOnlyMatrix
              matrix={matrix.table}
              rowColors={randomColors}
              defaultTextColor="black"
            />
          </article>
          <article style={{ marginBottom: '2rem' }}>
            <ReadOnlyMatrix
              matrix={transpose}
              colColors={randomColors}
              defaultTextColor="black"
            />
          </article>
        </main>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default TransposedSteps;
