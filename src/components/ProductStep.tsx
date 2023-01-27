import type { ProductStep } from '../store/matrix_reducer_types';
import CellHighlightMatrix from './CellHighlightMatrix';
import CollHighlightMatrix from './CollHighlightMatrix';
import RowHighLightMatrix from './RowHighlightMatrix';
import * as fa from 'react-icons/fa';

const ProductStepView = (props: ProductStep) => (
  <article
    style={{
      display: 'flex',
      marginBottom: '2rem',
      alignItems: 'center',
    }}
  >
    {props.steps.map((mat, idx, arr) => (
      <section
        style={{ display: 'flex', alignItems: 'center' }}
        key={`mat-${idx}`}
      >
        {idx === arr.length - 1 ? (
          <>
            <fa.FaEquals style={{ margin: '0 2rem' }} />
            <CellHighlightMatrix matrix={mat} />
          </>
        ) : idx % 2 === 0 ? (
          <>
            <RowHighLightMatrix matrix={mat} />
            <fa.FaTimes style={{ margin: '0 2rem' }} />
          </>
        ) : (
          <CollHighlightMatrix matrix={mat} />
        )}
      </section>
    ))}
    <fa.FaEquals style={{ margin: '0 2rem' }} />
    <CellHighlightMatrix matrix={props.decomposedResult} />
  </article>
);

export default ProductStepView;
