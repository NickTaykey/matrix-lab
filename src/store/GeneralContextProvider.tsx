import { useReducer, useState } from 'react';
import MatrixContext, {
  GenericMatrixReducerAction,
  MatrixActionTypes,
  MatrixObject,
  MatrixArray,
} from './GeneralContext';

const genRandomColor = () => {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
};

const MatrixContextProvider: React.FC<{
  children: React.ReactNode[] | React.ReactNode;
}> = (props) => {
  const matrixArrayReducer = (
    state: MatrixObject[],
    action: GenericMatrixReducerAction
  ) => {
    switch (action.type) {
      case MatrixActionTypes.ADD_MATRIX: {
        let matrix: MatrixArray | null = null;
        let nRows: number | null = null;
        let nCols: number | null = null;

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

  const [selectedColorsArray, setSelectedColorsArray] = useState<string[]>([]);
  const [matrices, dispatchMatrices] = useReducer(matrixArrayReducer, []);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSelectionModeOn, toggleSelectionMode] = useState(false);

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
        createMatrix(matrix) {
          dispatchMatrices({
            type: MatrixActionTypes.ADD_MATRIX,
            payload: matrix ? { matrix } : {},
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

export default MatrixContextProvider;
