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

function getMatrixMinor(m: NumberTable, i: number, j: number) {
  let _pj_a = [];
  let _pj_b = [...m.slice(0, i), ...m.slice(i + 1)];

  for (let _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
    let row = _pj_b[_pj_c];

    _pj_a.push([...row.slice(0, j), ...row.slice(j + 1)]);
  }

  return _pj_a;
}

function getMatrixDeternminant(m: NumberTable) {
  let determinant;

  if (m.length === 2) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  }

  determinant = 0;

  for (let c = 0, _pj_a = m.length; c < _pj_a; c += 1) {
    determinant +=
      Math.pow(-1, c) *
      m[0][c] *
      getMatrixDeternminant(getMatrixMinor(m, 0, c));
  }

  return determinant;
}

export { matrixProduct, getMatrixDeternminant };
