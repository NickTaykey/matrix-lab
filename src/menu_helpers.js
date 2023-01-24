const genRandomColor = () => {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
};

const matrixArrayReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MATRIX': {
      return [
        ...state,
        {
          matrix: new Array(3).fill(new Array(3).fill('')),
          id: crypto.randomUUID(),
          color: genRandomColor(),
          selected: false,
          nCols: 3,
          nRows: 3,
        },
      ];
    }

    case 'DELETE_MATRIX': {
      return state.filter((m) => m.id !== action.payload.id);
    }

    case 'TOGGLE_MATRIX_SELECTION_STATE': {
      return state.map((m) =>
        m.id === action.payload.id ? { ...m, selected: !m.selected } : m
      );
    }

    case 'UPDATE_MATRIX_VALUE': {
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

    case 'UPDATE_MATRIX_SIZE': {
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
      throw new Error(
        `Unknown type '${action.type}' for matrixArrayReducer actions`
      );
  }
};

export default matrixArrayReducer;
