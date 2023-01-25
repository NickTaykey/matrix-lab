const MatrixSelectionMenu = ({ toggleSelectionMode, selectedColorArray }) => (
  <>
    <fieldset>
      <input
        onClick={() => toggleSelectionMode((current) => !current)}
        id="matrix-seletion-toggler"
        type="checkbox"
      />
      <label htmlFor="matrix-seletion-toggler">Select matrix for product</label>
    </fieldset>
    <section>
      {selectedColorArray.map((color) => (
        <span
          key={color}
          style={{
            backgroundColor: color,
            display: 'inline-block',
            borderRadius: '100%',
            width: '25px',
            height: '25px',
            marginRight: '5px',
          }}
        />
      ))}
    </section>
  </>
);

export default MatrixSelectionMenu;
