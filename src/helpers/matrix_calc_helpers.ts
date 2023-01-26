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

  let product: NumberMatrix = new Array(x);

  for (let p = 0; p < x; p++) {
    product[p] = productRow.slice();
  }

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      for (let k = 0; k < z; k++) {
        product[i][j] += m1[i][k] * m2[k][j];
      }
    }
  }

  return product;
}

export default matrixProduct;