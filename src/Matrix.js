const Matrix = (props) => {
  const updateMatrixSize = (e) => {
    if (e.target.name === 'nCols') {
      props.dispatchMatrixArray({
        type: 'UPDATE_MATRIX_SIZE',
        payload: {
          id: props.id,
          newNCols: Number(e.target.value),
        },
      });
    }
    if (e.target.name === 'nRows') {
      props.dispatchMatrixArray({
        type: 'UPDATE_MATRIX_SIZE',
        payload: {
          id: props.id,
          newNRows: Number(e.target.value),
        },
      });
    }
  };

  const updateCellValue = (e) => {
    let [rowIdx, colIdx] = e.target.getAttribute('id').split('-');
    rowIdx = Number(rowIdx);
    colIdx = Number(colIdx);
    props.dispatchMatrixArray({
      type: 'UPDATE_MATRIX_VALUE',
      payload: {
        id: props.id,
        newValue: e.target.value,
        colIdx,
        rowIdx,
      },
    });
  };

  return (
    <article
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        padding: '2rem',
        margin: '2rem',
        border: `5px solid ${props.color}`,
      }}
    >
      {props.isSelectionModeOn && (
        <input
          type="checkbox"
          checked={props.selected}
          onChange={() => {
            props.dispatchMatrixArray({
              type: 'TOGGLE_MATRIX_SELECTION_STATE',
              payload: { id: props.id },
            });
          }}
        />
      )}
      <header style={{ display: 'flex', justifyContent: 'center' }}>
        <fieldset>
          <label htmlFor="rows-input">Rows</label>
          <input
            type="number"
            name="nRows"
            id="rows-input"
            onChange={updateMatrixSize}
            value={props.nRows}
            min="2"
            max="10"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="cols-input">Columns</label>
          <input
            type="number"
            name="nCols"
            id="cols-input"
            onChange={updateMatrixSize}
            value={props.nCols}
            min="2"
            max="10"
          />
        </fieldset>
      </header>
      <table>
        <tbody>
          {props.matrix.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, cellIdx) => (
                <td key={`${rowIdx}-${cellIdx}`}>
                  <input
                    id={`${rowIdx}-${cellIdx}`}
                    onChange={updateCellValue}
                    value={cell}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default Matrix;
