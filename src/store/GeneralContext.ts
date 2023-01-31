import type { MatrixObject, MatrixProductSteps } from './matrix_reducer_types';
import React from 'react';

export type NumberTable = Array<number[]>;

interface MatrixContextObject {
  errorMessage: string | null;
  setErrorMessage(
    mod: ((errorMessage: string | null) => string | null) | string
  ): void;
  isSelectionModeOn: boolean;
  toggleSelectionMode(cb: (currentState: boolean) => boolean): void;
  matrices: MatrixObject[];
  createMatrix(table?: NumberTable, productSteps?: MatrixProductSteps): void;
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
  createMatrix(table?: NumberTable, productSteps?: MatrixProductSteps) {},
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
