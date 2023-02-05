import { NumberTable, transposeMatrix } from '../helpers/matrix_calc_helpers';
import { useParams, useNavigate } from 'react-router-dom';
import GeneralContext from '../store/GeneralContext';
import ReadOnlyMatrix from './Matrix/ReadOnlyMatrix';
import { useContext } from 'react';
import { genRandomColor } from '../helpers/color_utils';

const TransposedSteps = () => {
  const generalContext = useContext(GeneralContext);
  const { matrixId } = useParams();
  const navigate = useNavigate();

  const matrix = generalContext.matrices.find((m) => m.id === matrixId);

  const transpose = matrix
    ? transposeMatrix(matrix.table as NumberTable)
    : null;

  const randomColors = transpose ? transpose.map(() => genRandomColor()) : [];

  return (
    <>
      <button onClick={() => navigate('/')}>Back</button>
      <h1>Transposed Matrix</h1>
      {transpose && matrix ? (
        <main
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: '2rem',
          }}
        >
          <ReadOnlyMatrix
            matrix={matrix.table}
            rowColors={randomColors}
            defaultTextColor="black"
          />
          <ReadOnlyMatrix
            matrix={transpose}
            colColors={randomColors}
            defaultTextColor="black"
          />
        </main>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default TransposedSteps;
