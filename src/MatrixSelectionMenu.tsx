interface MatrixSelectionMenuProps {
  toggleSelectionMode(cb: (v: boolean) => boolean): void;
  selectedColorArray: string[];
}

const MatrixSelectionMenu = (props: MatrixSelectionMenuProps) => (
  <>
    <fieldset>
      <input
        onClick={() => props.toggleSelectionMode((current) => !current)}
        id="matrix-seletion-toggler"
        type="checkbox"
      />
      <label htmlFor="matrix-seletion-toggler">Select matrix for product</label>
    </fieldset>
    <section>
      {props.selectedColorArray.map((color) => (
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

/*
 */

export default MatrixSelectionMenu;
