import {
  GenericMatrixReducerAction,
  MatrixProductObject,
  MatrixActionTypes,
  MatrixObject,
  MatrixTypes,
  Table,
} from './matrix_reducer_types';
import { getMatrixDeterminant } from '../helpers/matrix_calc_helpers';
import MatrixContext, { NumberTable } from './GeneralContext';
import { useEffect, useReducer, useState } from 'react';

export const genRandomColor = () => {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

const isNumberTable = (table: Table) => {
  return table.every((row) => {
    return row.every((c) => typeof c === 'number');
  });
};

const GeneralContextProvider: React.FC<{
  children: React.ReactNode[] | React.ReactNode;
}> = (props) => {
  const TableReducer = (
    state: (MatrixObject | MatrixProductObject)[],
    action: GenericMatrixReducerAction
  ) => {
    switch (action.type) {
      case MatrixActionTypes.ADD_MATRIX: {
        let matrix: Table | null = null;
        let nRows: number | null = null;
        let nCols: number | null = null;

        if (action.payload.matrix) {
          matrix = action.payload.matrix;
          nCols = matrix[0].length;
          nRows = matrix.length;
        }

        let matrixObj = {
          type: action.payload.matrixProductSteps
            ? MatrixTypes.PRODUCT
            : MatrixTypes.INPUT,
          table: matrix ? matrix : new Array(3).fill(new Array(3).fill('')),
          nCols: nCols ? nCols : 3,
          nRows: nRows ? nRows : 3,
          determinant:
            matrix && isNumberTable(matrix)
              ? getMatrixDeterminant(matrix as NumberTable)
              : null,
          id: crypto.randomUUID(),
          color: genRandomColor(),
        } as MatrixObject;

        return [
          ...state,
          action.payload.matrixProductSteps
            ? {
                ...matrixObj,
                matrixProductSteps: action.payload.matrixProductSteps,
              }
            : matrixObj,
        ];
      }

      case MatrixActionTypes.DELETE_MATRIX: {
        return state.filter((m) => m.id !== action.payload.id);
      }

      case MatrixActionTypes.UPDATE_MATRIX_VALUE: {
        const { id, rowIdx, colIdx, newValue } = action.payload;
        const updatedMatrices = state.map((m) => {
          if (m.id === id) {
            const updatedTable = m.table.map((r, i) => {
              if (i === rowIdx) {
                return [
                  ...r.slice(0, colIdx),
                  !newValue.length || isNaN(Number(newValue))
                    ? newValue
                    : Number(newValue),
                  ...r.slice(colIdx + 1, r.length),
                ];
              }
              return r;
            });

            const calculateDeterminant = isNumberTable(updatedTable);

            return {
              ...m,
              table: updatedTable,
              determinant: calculateDeterminant
                ? getMatrixDeterminant(updatedTable as NumberTable)
                : null,
            };
          }
          return m;
        });

        return updatedMatrices;
      }

      case MatrixActionTypes.UPDATE_MATRIX_SIZE: {
        const { newNCols, newNRows, id } = action.payload;

        if (!newNCols && !newNRows) return state;

        return state.map((m) => {
          let newMatrix = { ...m };
          if (m.id === id) {
            if (newNCols) {
              if (newNCols - m.nCols > 0) {
                newMatrix.table = newMatrix.table.map((r) => [...r, '']);
              } else {
                newMatrix.table = newMatrix.table.map((r) => {
                  return r.slice(0, r.length - 1);
                });
              }
              newMatrix.nCols = newNCols;
            }
            if (newNRows) {
              if (newNRows - m.nRows > 0) {
                newMatrix.table = [
                  ...newMatrix.table,
                  new Array(newMatrix.nCols).fill(''),
                ];
              } else {
                newMatrix.table = newMatrix.table.slice(
                  0,
                  newMatrix.table.length - 1
                );
              }
              newMatrix.nRows = newNRows;
            }
          }

          return newMatrix;
        });
      }

      default:
        throw new Error('Unknown type for TableReducer');
    }
  };

  const [selectedColorsArray, setSelectedColorsArray] = useState<string[]>([]);
  const [matrices, dispatchMatrices] = useReducer(TableReducer, []);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSelectionModeOn, toggleSelectionMode] = useState(false);

  useEffect(() => {
    dispatchMatrices({
      type: MatrixActionTypes.ADD_MATRIX,
      payload: {
        matrix: [
          [1, 2],
          [3, 4],
        ],
      },
    });
    dispatchMatrices({
      type: MatrixActionTypes.ADD_MATRIX,
      payload: {
        matrix: [
          [5, 2],
          [3, 7],
        ],
      },
    });
    dispatchMatrices({
      type: MatrixActionTypes.ADD_MATRIX,
      payload: {
        matrix: [
          [9, 10],
          [3, 11],
        ],
      },
    });
  }, []);

  return (
    <MatrixContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        isSelectionModeOn,
        toggleSelectionMode,
        selectedColorsArray,
        setSelectedColorsArray,
        matrices,
        createMatrix(matrix, matrixProductSteps) {
          dispatchMatrices({
            type: MatrixActionTypes.ADD_MATRIX,
            payload: { matrix, matrixProductSteps },
          });
        },
        deleteMatrix(matrixId) {
          dispatchMatrices({
            type: MatrixActionTypes.DELETE_MATRIX,
            payload: { id: matrixId },
          });
        },
        updateMatrixSize(matrixId, newSize) {
          dispatchMatrices({
            type: MatrixActionTypes.UPDATE_MATRIX_SIZE,
            payload: { id: matrixId, ...newSize },
          });
        },
        updateMatrixValue(matrixId, rowIdx, colIdx, newValue) {
          dispatchMatrices({
            type: MatrixActionTypes.UPDATE_MATRIX_VALUE,
            payload: {
              id: matrixId,
              newValue,
              colIdx,
              rowIdx,
            },
          });
        },
      }}
    >
      {props.children}
    </MatrixContext.Provider>
  );
};

export default GeneralContextProvider;
