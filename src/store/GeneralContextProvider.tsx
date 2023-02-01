import {
  GenericMatrixReducerAction,
  MatrixProductObject,
  StoredMatrixObject,
  MatrixActionTypes,
  MatrixObject,
  MatrixTypes,
  Table,
} from './matrix_reducer_types';
import { getDeterminantAndSteps } from '../helpers/matrix_calc_helpers';
import MatrixContext, { NumberTable } from './GeneralContext';
import { useEffect, useReducer, useState } from 'react';
import { genRandomColor } from '../helpers/color_utils';

const updateLocalStorage = (
  matrices: (MatrixObject | MatrixProductObject)[]
) => {
  localStorage.setItem(
    'recent-matrices',
    JSON.stringify(
      matrices.map((m) => ({
        id: m.id,
        productSteps: (m as MatrixProductObject).productSteps,
        table: m.table,
        color: m.color,
      }))
    )
  );
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
        let table: Table | null = null;
        let nRows: number | null = null;
        let nCols: number | null = null;

        const id = action.payload.id ? action.payload.id : crypto.randomUUID();

        if (state.findIndex((m) => m.id === id) >= 0) return state;

        const color = action.payload.color
          ? action.payload.color
          : genRandomColor();

        if (action.payload.table) {
          table = action.payload.table;
          nCols = table[0].length;
          nRows = table.length;
        }

        const determinant =
          table && isNumberTable(table)
            ? getDeterminantAndSteps(table as NumberTable)
            : null;

        let matrixObj = {
          type: action.payload.productSteps
            ? MatrixTypes.PRODUCT
            : MatrixTypes.INPUT,
          table: table ? table : new Array(3).fill(new Array(3).fill('')),
          nCols: nCols ? nCols : 3,
          nRows: nRows ? nRows : 3,
          determinant,
          color,
          id,
        } as MatrixObject;

        const newState = [
          ...state,
          action.payload.productSteps
            ? ({
                ...matrixObj,
                productSteps: action.payload.productSteps,
              } as MatrixProductObject)
            : matrixObj,
        ];

        if (action.payload.saveOnLocalStorage) updateLocalStorage(newState);

        return newState;
      }

      case MatrixActionTypes.DELETE_MATRIX: {
        const newState = state.filter((m) => m.id !== action.payload.id);
        updateLocalStorage(newState);
        return newState;
      }

      case MatrixActionTypes.UPDATE_MATRIX_VALUE: {
        const { id, rowIdx, colIdx, newValue } = action.payload;
        const newState = state.map((m) => {
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
                ? getDeterminantAndSteps(updatedTable as NumberTable)
                : null,
            };
          }
          return m;
        });

        updateLocalStorage(newState);

        return newState;
      }

      case MatrixActionTypes.UPDATE_MATRIX_SIZE: {
        const { newNCols, newNRows, id } = action.payload;

        if (!newNCols && !newNRows) return state;

        const newState = state.map((m) => {
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

        updateLocalStorage(newState);

        return newState;
      }

      default:
        throw new Error('Unknown type for TableReducer');
    }
  };

  const [selectedColorsArray, setSelectedColorsArray] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [matrices, dispatchMatrices] = useReducer(TableReducer, []);
  const [isSelectionModeOn, toggleSelectionMode] = useState(false);

  useEffect(() => {
    let savedMatrices: StoredMatrixObject[] | string | null = null;

    savedMatrices = localStorage.getItem('recent-matrices');

    let defaultMatrices: StoredMatrixObject[] = [
      {
        color: genRandomColor(),
        id: crypto.randomUUID(),
        table: [
          [1, 2],
          [3, 4],
        ],
      },
      {
        color: genRandomColor(),
        id: crypto.randomUUID(),
        table: [
          [5, 2],
          [3, 7],
        ],
      },
      {
        color: genRandomColor(),
        id: crypto.randomUUID(),
        table: [
          [9, 10],
          [3, 11],
        ],
      },
    ];

    if (savedMatrices === null && !matrices.length) {
      localStorage.setItem('recent-matrices', JSON.stringify(defaultMatrices));
    }

    if (savedMatrices !== null && !matrices.length) {
      savedMatrices = JSON.parse(savedMatrices);
      (savedMatrices as StoredMatrixObject[]).forEach((m) => {
        dispatchMatrices({
          type: MatrixActionTypes.ADD_MATRIX,
          payload: { ...m, saveOnLocalStorage: false },
        });
      });
    }
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
        createMatrix(table, productSteps) {
          dispatchMatrices({
            type: MatrixActionTypes.ADD_MATRIX,
            payload: { table, productSteps, saveOnLocalStorage: true },
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
