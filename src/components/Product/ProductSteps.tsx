import { MatrixProductObject } from '../../store/matrix_reducer_types';
import GeneralContext from '../../store/GeneralContext';
import ProductStepView from './ProductStepView';
import StepPageHeader from '../StepPageHeader';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';

const ProductSteps = () => {
  const generalContext = useContext(GeneralContext);
  const { matrixId } = useParams();

  const matrix = generalContext.matrices.find((m) => {
    return m.id === matrixId;
  }) as MatrixProductObject | undefined;

  return (
    <>
      <StepPageHeader headerTitle="Product steps" />
      {matrix ? (
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {matrix.productSteps.map((step, stepIdx) => (
            <ProductStepView key={`product-step-${stepIdx}`} {...step} />
          ))}
        </main>
      ) : (
        <h1>404 No matrix with ID {matrixId} was found!</h1>
      )}
    </>
  );
};

export default ProductSteps;
