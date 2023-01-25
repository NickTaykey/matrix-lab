export type MatrixArray = Array<(number | string)[]>;

export interface MatrixObjectType {
  matrix: MatrixArray;
  nCols: number;
  nRows: number;
  color: string;
  id: string;
}

export enum MatrixActionTypes {
  ADD_MATRIX,
  DELETE_MATRIX,
  UPDATE_MATRIX_SIZE,
  UPDATE_MATRIX_VALUE,
}

interface AddMatrixAction {
  type: MatrixActionTypes.ADD_MATRIX;
  payload: {
    matrix?: MatrixArray;
  };
}

interface DeleteMatrixAction {
  type: MatrixActionTypes.DELETE_MATRIX;
  payload: {
    id: string;
  };
}

interface UpdateMatrixValueAction {
  type: MatrixActionTypes.UPDATE_MATRIX_VALUE;
  payload: {
    id: string;
    rowIdx: number;
    colIdx: number;
    newValue: string;
  };
}

interface UpdateMatrixSizeAction {
  type: MatrixActionTypes.UPDATE_MATRIX_SIZE;
  payload: {
    id: string;
    newNCols?: number;
    newNRows?: number;
  };
}

export type GenericMatrixReducerAction =
  | AddMatrixAction
  | DeleteMatrixAction
  | UpdateMatrixValueAction
  | UpdateMatrixSizeAction;

const genRandomColor = () => {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
};

const matrixArrayReducer = (
  state: MatrixObjectType[],
  action: GenericMatrixReducerAction
) => {
  switch (action.type) {
    case MatrixActionTypes.ADD_MATRIX: {
      let nRows: number | null = null;
      let nCols: number | null = null;
      let matrix: MatrixArray = [];

      if (action.payload.matrix) {
        matrix = action.payload.matrix;
        nCols = matrix[0].length;
        nRows = matrix.length;
      }

      return [
        ...state,
        {
          matrix: matrix ? matrix : new Array(3).fill(new Array(3).fill('')),
          nCols: nCols ? nCols : 3,
          nRows: nRows ? nRows : 3,
          id: crypto.randomUUID(),
          color: genRandomColor(),
        },
      ];
    }

    case MatrixActionTypes.DELETE_MATRIX: {
      return state.filter((m) => m.id !== action.payload.id);
    }

    case MatrixActionTypes.UPDATE_MATRIX_VALUE: {
      const { id, rowIdx, colIdx, newValue } = action.payload;
      return state.map((m) => {
        return m.id === id
          ? {
              ...m,
              matrix: m.matrix.map((r, i) => {
                if (i === rowIdx) {
                  return [
                    ...r.slice(0, colIdx),
                    newValue,
                    ...r.slice(colIdx + 1, r.length),
                  ];
                }
                return r;
              }),
            }
          : m;
      });
    }

    case MatrixActionTypes.UPDATE_MATRIX_SIZE: {
      const { newNCols, newNRows, id } = action.payload;

      if (!newNCols && !newNRows) return state;

      return state.map((m) => {
        let newMatrix = { ...m };
        if (m.id === id) {
          if (newNCols) {
            if (newNCols - m.nCols > 0) {
              newMatrix.matrix = newMatrix.matrix.map((r) => [...r, '']);
            } else {
              newMatrix.matrix = newMatrix.matrix.map((r) => {
                return r.slice(0, r.length - 1);
              });
            }
            newMatrix.nCols = newNCols;
          }
          if (newNRows) {
            if (newNRows - m.nRows > 0) {
              newMatrix.matrix = [
                ...newMatrix.matrix,
                new Array(newMatrix.nCols).fill(''),
              ];
            } else {
              newMatrix.matrix = newMatrix.matrix.slice(
                0,
                newMatrix.matrix.length - 1
              );
            }
            newMatrix.nRows = newNRows;
          }
        }
        return newMatrix;
      });
    }

    default:
      throw new Error('Unknown type for matrixArrayReducer');
  }
};

export default matrixArrayReducer;
