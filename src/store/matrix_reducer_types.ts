import { NumberTable } from '../helpers/matrix_calc_helpers';

export type Table = Array<(number | string)[]>;

export enum MatrixTypes {
  INPUT,
  PRODUCT,
}

export type StoredMatrixObject = {
  table: NumberTable;
  productSteps?: MatrixProductSteps;
  color: string;
  id: string;
};

export type DeterminantStep = {
  currentCell: number;
  submatrix: NumberTable | null;
  submatrixDeterminant: {
    result: number;
    steps: DeterminantStep[] | null;
  } | null;
  coords: [number, number];
  cellStyle: {
    backgroundColor: string;
    color: string;
  };
};

export type Determinant = {
  result: number;
  steps: DeterminantStep[] | null;
};

export interface MatrixObject {
  type: MatrixTypes;
  determinant: Determinant | null;
  table: Table;
  nCols: number;
  nRows: number;
  color: string;
  id: string;
}

export type ProductStep = {
  decomposedResult: Table;
  steps: NumberTable[];
};

export type MatrixProductSteps = Array<ProductStep>;

export interface MatrixProductObject extends MatrixObject {
  type: MatrixTypes.PRODUCT;
  productSteps: MatrixProductSteps;
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
    productSteps?: MatrixProductSteps;
    saveOnLocalStorage?: boolean;
    table?: NumberTable;
    color?: string;
    id?: string;
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
