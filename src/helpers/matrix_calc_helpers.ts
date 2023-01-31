import { Determinant, DeterminantStep } from '../store/matrix_reducer_types';

export type NumberTable = Array<number[]>;

function matrixProduct(m1: NumberTable, m2: NumberTable) {
  let x = m1.length;
  let z = m1[0].length;
  let y = m2[0].length;

  if (m2.length !== z) {
    // XxZ & ZxY => XxY
    throw new Error(
      'Number of columns in the first matrix should be the same as the number of rows in the second.'
    );
  }

  let productRow: Array<number> = Array.apply(null, new Array<number>(y)).map(
    Number.prototype.valueOf,
    0
  );

  let productMat: NumberTable = new Array(x);
  let productString: Array<string[]> = [];

  for (let p = 0; p < x; p++) {
    productMat[p] = productRow.slice();
    productString[p] = new Array(productRow.slice().length).fill('');
  }

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      for (let k = 0; k < z; k++) {
        productMat[i][j] += m1[i][k] * m2[k][j];
        productString[i][j] = productString[i][j].concat(
          m1[i][k] + ' * ' + m2[k][j] + (k !== z - 1 ? ' + ' : '')
        );
      }
    }
  }

  return { productMat, productString };
}

function getMatrixDeterminant(matrix: number[][]): Determinant {
  const steps: DeterminantStep[] = [];
  const n = matrix.length;

  if (n === 1) {
    /* console.log({
      result: matrix[0][0],
      steps: null,
    }); */
    return {
      result: matrix[0][0],
      steps: null,
    };
  }

  let result = 0;
  for (let i = 0; i < n; i++) {
    const submatrix: NumberTable = [];

    for (let j = 1; j < n; j++) {
      const row = [];
      for (let k = 0; k < n; k++) {
        if (k === i) continue;
        row.push(matrix[j][k]);
      }
      submatrix.push(row);
    }

    const subdet = getMatrixDeterminant(submatrix);

    steps.push({
      submatrixDeterminantSteps: subdet.steps,
      currentCell: matrix[0][i],
      coords: [1, i + 1],
      submatrix,
    });

    result += matrix[0][i] * subdet.result * (i % 2 === 0 ? 1 : -1);
  }
  // console.log({ result, steps });
  return { result, steps };
}

export { matrixProduct, getMatrixDeterminant };
