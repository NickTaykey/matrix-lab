import { MatrixArray } from '../store/matrix_reducer_types';

export type NumberMatrix = Array<number[]>;

function matrixProduct(m1: NumberMatrix, m2: NumberMatrix) {
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

  let productMat: NumberMatrix = new Array(x);
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

export default matrixProduct;
