import { Determinant, DeterminantStep } from '../store/matrix_reducer_types';
import { genRandomColor, isColorDark } from './color_utils';
import Fraction from 'fraction.js';

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

interface InverseMatrixStep {
  leftMatrix: NumberTable;
  rightMatrix: NumberTable;
  row: number | null;
  scale: number | null;
  message: string;
}

function inverseMatrixWithScaleReduction(matrix: NumberTable) {
  const N = matrix.length;
  let identity: NumberTable = [];
  const steps: InverseMatrixStep[] = [];

  for (let i = 0; i < N; i++) {
    identity.push(Array(N).fill(0));
    identity[i][i] = 1;
  }

  steps.push({
    leftMatrix: matrix.slice(),
    rightMatrix: identity.slice(),
    row: null,
    scale: null,
    message: 'Write identity matrix after original matrix.',
  });

  let inverse: NumberTable;
  let lastMatrix: NumberTable = matrix;
  let lastIdentity: NumberTable = identity;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i !== j) {
        let scale = -lastMatrix[j][i] / lastMatrix[i][i];
        const matrixCopy = lastMatrix.map((r) => r.map((v) => v));
        const identityCopy = lastIdentity.map((r) => r.map((v) => v));

        if (scale !== 0 && isFinite(scale)) {
          for (let k = 0; k < N; k++) {
            matrixCopy[j][k] += scale * matrixCopy[i][k];
            identityCopy[j][k] += scale * identityCopy[i][k];
          }
          steps.push({
            leftMatrix: matrixCopy,
            rightMatrix: identityCopy,
            row: j,
            scale: scale,
            message: `Add ${new Fraction(scale).toFraction()} times row ${
              i + 1
            } to row ${j + 1}`,
          });
          lastIdentity = identityCopy;
          lastMatrix = matrixCopy;
        }
      }
    }
  }

  for (let i = 0; i < N; i++) {
    let scale = 1 / lastMatrix[i][i];
    if (isFinite(scale)) {
      const matrixCopy = lastMatrix.map((r) => r.map((v) => v));
      const identityCopy = lastIdentity.map((r) => r.map((v) => v));
      matrixCopy[i] = matrixCopy[i].map((x) => x * scale);
      identityCopy[i] = identityCopy[i].map((x) => x * scale);
      inverse = identityCopy;
      steps.push({
        leftMatrix: matrixCopy,
        rightMatrix: identityCopy,
        row: i,
        scale: scale,
        message: `Multiply row ${i + 1} by ${new Fraction(scale).toFraction()}`,
      });
      lastIdentity = identityCopy;
      lastMatrix = matrixCopy;
    }
  }

  return { table: inverse!, steps };
}

const copyMatrix = (m: NumberTable) => m.map((r) => r.slice());

function isolateEmptyRows(matrix: NumberTable): {
  newMatrix: NumberTable;
  nEmptyRows: number;
} {
  const idxEmptyRows = matrix.reduce((acm, row, idx) => {
    const isEmpty = row.every((c) => c === 0);
    if (isEmpty) return [...acm, idx];
    return acm;
  }, [] as number[]);

  const newMatrix = matrix.filter((_, idx) => !idxEmptyRows.includes(idx));

  return { newMatrix, nEmptyRows: idxEmptyRows.length };
}

function fillWithEmptyRows(matrix: NumberTable, nEmptyRows: number) {
  return matrix.concat(
    new Array(nEmptyRows)
      .fill(null)
      .map(() => new Array(matrix[0].length).fill(0))
  );
}

function scaleReduction(matrix: NumberTable): {
  matrix: NumberTable;
  steps: Step[];
} {
  const { newMatrix, nEmptyRows } = isolateEmptyRows(matrix);

  let lastMatrix: NumberTable = nEmptyRows > 0 ? newMatrix : copyMatrix(matrix);
  let matrixCopy: NumberTable;
  let steps: Step[] = [];

  steps.push({
    matrix: copyMatrix(matrix),
    message: `Start`,
    rows: [],
  });

  for (let i = 0; i < lastMatrix.length; i++) {
    matrixCopy = copyMatrix(lastMatrix);

    let row = matrixCopy[i];
    let scale = row[i];
    if (scale !== 0 && scale !== 1) {
      for (let j = 0; j < row.length; j++) {
        row[j] /= scale;
      }
      let scaleFraction = new Fraction(scale).toFraction();
      steps.push({
        message: `Divide row ${i + 1} by ${scaleFraction}`,
        matrix: fillWithEmptyRows(copyMatrix(matrixCopy), nEmptyRows),
        rows: [i],
      });
    }

    for (let j = 0; j < lastMatrix.length; j++) {
      if (j !== i) {
        let elimination = matrixCopy[j][i];
        if (elimination === 0) continue;
        for (let k = 0; k < row.length; k++) {
          matrixCopy[j][k] -= elimination * row[k];
        }
        let eliminationFraction = new Fraction(elimination).toFraction();
        steps.push({
          matrix: fillWithEmptyRows(copyMatrix(matrixCopy), nEmptyRows),
          message: `Row ${j + 1} minus ${eliminationFraction} times row ${
            i + 1
          }`,
          rows: [j, i],
        });
      }
    }
    lastMatrix = matrixCopy;
  }
  return {
    matrix: copyMatrix(lastMatrix).concat(
      new Array(nEmptyRows)
        .fill(null)
        .map(() => new Array(matrixCopy[0].length).fill(0))
    ),
    steps,
  };
}

interface Step {
  matrix: NumberTable;
  message: string;
  rows: number[];
}

export {
  matrixProduct,
  getDeterminantAndSteps,
  scaleReduction,
  inverseMatrixWithScaleReduction,
};
