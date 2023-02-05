import {
  MatrixProductSteps,
  MatrixObject,
} from '../../store/matrix_reducer_types';
import GeneralContext, { NumberTable } from '../../store/GeneralContext';
import { matrixProduct } from '../../helpers/matrix_calc_helpers';
import { fieldsetStyle } from '../styles';
import { FaTimes } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { useContext } from 'react';

const MatrixSelectionMenu = () => {
  const generalContext = useContext(GeneralContext);

  const multiplySelectedMatrix = () => {
    let foundNotValidMatrix = false;

    const selectedMatricesObj = generalContext.selectedColorsArray.map((c) => {
      return generalContext.matrices.find(
        (m) => m.color === c
      )! as MatrixObject;
    });

    const selectedMatrices = selectedMatricesObj.map((m, i) => {
      return m.table.map((r) => {
        return r.map((n) => {
          const t = Number(n);
          if ((typeof n === 'string' && !n.length) || isNaN(t)) {
            generalContext.setErrorMessage(
              `Invalid value "${
                typeof n === 'string' && n.length ? n : ''
              }" in matrix ${i}`
            );
            foundNotValidMatrix = true;
          }
          return t;
        });
      });
    });

    let resultMat: NumberTable = [];
    const productSteps: MatrixProductSteps = [];

    for (
      let i = 0;
      i < selectedMatrices.length - 1 && !foundNotValidMatrix;
      ++i
    ) {
      const nextMatrix = (
        resultMat.length === 0 ? selectedMatrices[i + 1] : resultMat
      ) as NumberTable;

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

  const createMatrix = () => {
    generalContext.createMatrix();
  };

  return (
    <>
      <fieldset
        style={{
          ...fieldsetStyle,
          flexDirection: 'column',
        }}
      >
        <section>
          <input
            onClick={() =>
              generalContext.toggleSelectionMode((current) => !current)
            }
            id="matrix-seletion-toggler"
            type="checkbox"
            style={{ margin: '.5rem' }}
          />
          <label
            htmlFor="matrix-seletion-toggler"
            style={{ fontSize: '1.5rem' }}
          >
            Select matrix for product
          </label>
        </section>
        <section>
          <button
            onClick={multiplySelectedMatrix}
            style={{ margin: '2rem auto' }}
            className="button"
          >
            <FaTimes style={{ marginRight: '.5rem' }} />
            Multiply!
          </button>
          <section
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2rem',
            }}
          >
            {generalContext.selectedColorsArray.map((color) => (
              <span
                key={color}
                style={{
                  backgroundColor: color,
                  display: 'inline-block',
                  borderRadius: '100%',
                  width: '25px',
                  height: '25px',
                  marginRight: '5px',
                }}
              />
            ))}
          </section>
        </section>
        <button className="button" onClick={createMatrix}>
          <GoPlus style={{ marginRight: '.5rem' }} />
          New Matrix
        </button>
      </fieldset>
    </>
  );
};

export default MatrixSelectionMenu;
