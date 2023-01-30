import { MatrixProductObject } from '../store/matrix_reducer_types';
import ProductStep from './ProductStepView';

interface ProductModalProps {
  closeModal(): void;
  matrix: MatrixProductObject;
}

const ProductModal = (props: ProductModalProps) => {
  return (
    <>
      <button onClick={props.closeModal}>Close</button>
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
        {props.matrix.matrixProductSteps.map((step, stepIdx) => (
          <ProductStep key={`product-step-${stepIdx}`} {...step} />
        ))}
      </main>
    </>
  );
};

export default ProductModal;
