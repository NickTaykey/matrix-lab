import { MatrixProductObject } from '../store/matrix_reducer_types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GeneralContext from '../store/GeneralContext';
import ProductStep from './ProductStepView';
import { useContext } from 'react';

const ProductModal = () => {
  const generalContext = useContext(GeneralContext);
  const { matrixId } = useParams();
  const navigate = useNavigate();

  const matrix = generalContext.matrices.find((m) => {
    return m.id === matrixId;
  }) as MatrixProductObject | undefined;

  return (
    <>
      <button onClick={() => navigate('/')}>Back</button>
      {matrix ? (
        <>
          <h2 style={{ textAlign: 'center' }}>
            How to calculate product step by step
          </h2>
          <main
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {matrix.productSteps.map((step, stepIdx) => (
              <ProductStep key={`product-step-${stepIdx}`} {...step} />
            ))}
          </main>
        </>
      ) : (
        <h1>404 No matrix with ID {matrixId} was found!</h1>
      )}
    </>
  );
};

export default ProductModal;
