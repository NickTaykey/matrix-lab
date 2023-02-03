import { Determinant, DeterminantStep } from '../store/matrix_reducer_types';
import { genRandomColor, isColorDark } from './color_utils';

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

function getDeterminantAndSteps(matrix: NumberTable): Determinant {
  const steps: DeterminantStep[] = [];
  const n = matrix.length;

  if (n === 1) {
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

    const subdet = getDeterminantAndSteps(submatrix);

    const backgroundColor = genRandomColor();

    steps.push({
      submatrixDeterminant: submatrix.length > 2 ? subdet : null,
      currentCell: matrix[0][i],
      coords: [1, i + 1],
      cellStyle: {
        color: isColorDark(backgroundColor) ? 'white' : 'black',
        backgroundColor,
      },
      submatrix,
    });

    result += matrix[0][i] * subdet.result * (i % 2 === 0 ? 1 : -1);
  }

  return { result, steps };
}

function invertMatrix(matrix: NumberTable): NumberTable {
  const n = matrix.length;
  const identity: NumberTable = [];
  for (let i = 0; i < n; i++) {
    identity.push([]);
    for (let j = 0; j < n; j++) {
      identity[i][j] = i === j ? 1 : 0;
    }
  }
  for (let i = 0; i < n; i++) {
    let pivot = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(matrix[j][i]) > Math.abs(matrix[pivot][i])) {
        pivot = j;
      }
    }
    if (pivot !== i) {
      [matrix[i], matrix[pivot]] = [matrix[pivot], matrix[i]];
      [identity[i], identity[pivot]] = [identity[pivot], identity[i]];
    }
    const scale = 1 / matrix[i][i];
    matrix[i] = matrix[i].map((x) => x * scale);
    identity[i] = identity[i].map((x) => x * scale);
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      const factor = matrix[j][i];
      matrix[j] = matrix[j].map((x, k) => x - factor * matrix[i][k]);
      identity[j] = identity[j].map((x, k) => x - factor * identity[i][k]);
    }
  }
  return identity;
}

function decimalToFraction(decimal: number): {
  numerator: number;
  denominator: number;
} {
  const tolerance = 1.0e-6;
  let sign = decimal > 0 ? 1 : -1;
  decimal = Math.abs(decimal);
  if (Math.abs(Math.round(decimal) - decimal) < tolerance) {
    return { numerator: sign * Math.round(decimal), denominator: 1 };
  }
  let n = decimal;
  let d = 1;
  let h1 = 1;
  let h2 = 0;
  let k1 = 0;
  let k2 = 1;
  while (Math.abs(n / d - decimal) > tolerance) {
    let x = Math.floor(n / d);
    let y = n % d;
    let j = h1 * x + h2;
    let k = k1 * x + k2;
    h1 = h2;
    h2 = j;
    k1 = k2;
    k2 = k;
    k = d;
    d = y;
  }
  return { numerator: sign * h2, denominator: k2 };
}

export {
  matrixProduct,
  getDeterminantAndSteps,
  invertMatrix,
  decimalToFraction,
};
