import matrixProduct, { NumberMatrix } from './helpers/matrix_calc_helpers';
import MatrixSelectionMenu from './MatrixSelectionMenu';
import GeneralContext from './store/GeneralContext';
import { MatrixObject } from './matrix_reducer_types';
import ErrorAlert from './components/ErrorAlert';
import { useContext } from 'react';

const MenuHeader = () => {
  const generalContext = useContext(GeneralContext);

  const multiplySelectedMatrix = () => {
    let foundNotValidMatrix = false;

    const selected = generalContext.selectedColorsArray
      .map((c) => {
        return generalContext.matrices.find(
          (m) => m.color === c
        )! as MatrixObject;
      })
      .map((m, i) => {
        return m.matrix.map((r) => {
          return r.map((n) => {
            const t = Number(n);
            if (isNaN(t)) {
              generalContext.setErrorMessage(
                `Invalid value ${t} in matrix ${i}`
              );
              foundNotValidMatrix = true;
            }
            return t;
          });
        });
      });

    let res: NumberMatrix = [];

    for (let i = 0; i < selected.length - 1 && !foundNotValidMatrix; ++i) {
      const nextMatrix = (
        res.length === 0 ? selected[i + 1] : res
      ) as NumberMatrix;

      if (selected[i][0].length !== nextMatrix.length) {
        generalContext.setErrorMessage(
          `Error: ${
            i === 0
              ? 'The first matrix cannot be multiplied with the second!'
              : `Matrix ${i} cannot be multiplied with the others!`
          }`
        );
        foundNotValidMatrix = true;
      }

      res = matrixProduct(selected[i], nextMatrix);
    }

    if (!foundNotValidMatrix && res.length) {
      generalContext.createMatrix(res);
    }
  };

  return (
    <header>
      <MatrixSelectionMenu />
      <button onClick={multiplySelectedMatrix} style={{ margin: '2rem auto' }}>
        Multiply!
      </button>
      {generalContext.errorMessage && (
        <ErrorAlert message={generalContext.errorMessage} />
      )}
    </header>
  );
};

export default MenuHeader;
