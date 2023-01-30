import type { DeterminantStep } from '../store/matrix_reducer_types';
import * as fa from 'react-icons/fa';
import ReadOnlyMatrix from './ReadOnlyMatrix';

const DeterminantStepView = (props: DeterminantStep) => {
  /* const getSubMatricesDeterminantSteps = () => {
        let sbm = props.submatrixDeterminantSteps;
        const sbmsDeterminantsSteps = []
        while (sbm) {
            sbmsDeterminantsSteps.push(sbm);
        }
    } */

  return (
    <>
      <section style={{ display: 'flex', alignItems: 'center' }}>
        {props.currentCell}
        <fa.FaTimes style={{ margin: '0 2rem' }} />
        <span>
          (-1)
          <sup>
            {props.coords[0]} + {props.coords[1]}
          </sup>
        </span>
        <fa.FaTimes style={{ margin: '0 2rem' }} />
        {props.submatrix && (
          <section style={{ display: 'flex', alignItems: 'center' }}>
            <section
              style={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '2rem',
              }}
            >
              <div style={{ marginRight: '1rem' }}>det(</div>
              <ReadOnlyMatrix matrix={props.submatrix} />
              <div style={{ marginLeft: '1rem' }}>)</div>
            </section>
            <button>Determinant Step By Step</button>
          </section>
        )}
      </section>
    </>
  );
};

/* <table
        style={{
            display: 'inline-block',
            borderLeft: '1px solid gray',
            borderRight: '1px solid gray',
        }}
    >
        {props.submatrix.map((row) => (
            <tr>
                {row.map((cell) => (
                <td
                style={{
                padding: '1rem',
                }}
            >
                {cell}
            </td>
            ))}
        </tr>
        ))}
        </table> */

export default DeterminantStepView;
