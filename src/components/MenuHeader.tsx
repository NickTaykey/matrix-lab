import matrixProduct, { NumberMatrix } from '../helpers/matrix_calc_helpers';
import {
  MatrixArray,
  MatrixObject,
  MatrixProductSteps,
} from '../store/matrix_reducer_types';
import MatrixSelectionMenu from './MatrixSelectionMenu';
import GeneralContext from '../store/GeneralContext';
import ErrorAlert from '../components/ErrorAlert';
import { useContext } from 'react';

const MenuHeader = () => {
  const generalContext = useContext(GeneralContext);

  const multiplySelectedMatrix = () => {
    let foundNotValidMatrix = false;

    const selectedMatricesObj = generalContext.selectedColorsArray.map((c) => {
      return generalContext.matrices.find(
        (m) => m.color === c
      )! as MatrixObject;
    });

    const selectedMatrices = selectedMatricesObj.map((m, i) => {
      return m.matrix.map((r) => {
        return r.map((n) => {
          const t = Number(n);
          if (isNaN(t)) {
            generalContext.setErrorMessage(`Invalid value ${t} in matrix ${i}`);
            foundNotValidMatrix = true;
          }
          return t;
        });
      });
    });

    let resultMat: NumberMatrix = [];
    const productSteps: MatrixProductSteps = [];

    for (
      let i = 0;
      i < selectedMatrices.length - 1 && !foundNotValidMatrix;
      ++i
    ) {
      const nextMatrix = (
        resultMat.length === 0 ? selectedMatrices[i + 1] : resultMat
      ) as NumberMatrix;

      if (selectedMatrices[i][0].length !== nextMatrix.length) {
        generalContext.setErrorMessage(
          `Error: ${
            i === 0
              ? 'The first matrix cannot be multiplied with the second!'
              : `Matrix ${i} cannot be multiplied with the others!`
          }`
        );
        foundNotValidMatrix = true;
      }

      const result = matrixProduct(selectedMatrices[i], nextMatrix);

      productSteps.push(
        i > 0
          ? {
              steps: [resultMat, selectedMatrices[i + 1], result.productMat],
              decomposedResult: result.productString,
            }
          : {
              steps: [selectedMatrices[i], nextMatrix, result.productMat],
              decomposedResult: result.productString,
            }
      );

      resultMat = result.productMat;
    }

    if (!foundNotValidMatrix && resultMat.length) {
      generalContext.createMatrix(resultMat, productSteps);
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
