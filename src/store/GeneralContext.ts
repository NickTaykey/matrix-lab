import type { NumberMatrix } from '../helpers/matrix_calc_helpers';
import React from 'react';

export type MatrixArray = Array<(number | string)[]>;

export interface MatrixObject {
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
    newNCols: number | null;
    newNRows: number | null;
  };
}

export type GenericMatrixReducerAction =
  | AddMatrixAction
  | DeleteMatrixAction
  | UpdateMatrixValueAction
  | UpdateMatrixSizeAction;

interface MatrixContextObject {
  errorMessage: string | null;
  setErrorMessage(
    mod: ((errorMessage: string | null) => string | null) | string
  ): void;
  isSelectionModeOn: boolean;
  toggleSelectionMode(cb: (currentState: boolean) => boolean): void;
  matrices: MatrixObject[];
  createMatrix(matrix?: NumberMatrix): void;
  updateMatrixValue(
    matrixId: string,
    rowIdx: number,
    colIdx: number,
    newValue: string
  ): void;
  updateMatrixSize(
    matrixId: string,
    newSize: { newNRows: number | null; newNCols: number | null }
  ): void;
  deleteMatrix(matrixId: string): void;
  selectedColorsArray: string[];
  setSelectedColorsArray(cb: (colors: string[]) => string[]): void;
}

const MatrixContext = React.createContext<MatrixContextObject>({
  errorMessage: null,
  setErrorMessage(
    mod: ((errorMessage: string | null) => string | null) | string
  ) {},
  isSelectionModeOn: true,
  toggleSelectionMode(cb: (currentState: boolean) => boolean) {},
  matrices: [],
  createMatrix(matrix?: NumberMatrix) {},
  updateMatrixSize(
    matrixId: string,
    newSize: { newNRows: number | null; newNCols: number | null }
  ) {},
  updateMatrixValue(
    matrixId: string,
    rowIdx: number,
    colIdx: number,
    newValue: string
  ) {},
  deleteMatrix(matrixId: string) {},
  selectedColorsArray: [],
  setSelectedColorsArray(cb: (colors: string[]) => string[]) {},
});

export default MatrixContext;
