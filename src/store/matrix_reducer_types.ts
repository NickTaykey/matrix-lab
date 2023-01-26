export type MatrixArray = Array<(number | string)[]>;

export enum MatrixTypes {
  INPUT,
  PRODUCT,
}

export interface MatrixObject {
  type: MatrixTypes;
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
    type?: MatrixTypes;
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
    newNCols: number | null;
    newNRows: number | null;
  };
}

export type GenericMatrixReducerAction =
  | AddMatrixAction
  | DeleteMatrixAction
  | UpdateMatrixValueAction
  | UpdateMatrixSizeAction;
