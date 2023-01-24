const MatrixSelectionMenu = ({ toggleSelectionMode, matrixArray }) => (
  <header>
    <fieldset>
      <input
        onClick={() => toggleSelectionMode((current) => !current)}
        id="matrix-seletion-toggler"
        type="checkbox"
      />
      <label htmlFor="matrix-seletion-toggler">Select matrix for product</label>
    </fieldset>
    <section>
      {matrixArray
        .filter((m) => m.selected)
        .map((m) => (
          <span
            key={m.color}
            style={{
              backgroundColor: m.color,
              display: 'inline-block',
              borderRadius: '100%',
              width: '25px',
              height: '25px',
              marginRight: '5px',
            }}
          ></span>
        ))}
    </section>
    <button>Multiply!</button>
  </header>
);

export default MatrixSelectionMenu;
