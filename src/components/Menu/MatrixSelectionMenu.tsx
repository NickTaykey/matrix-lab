import GeneralContext from '../../store/GeneralContext';
import { useContext } from 'react';

const MatrixSelectionMenu = () => {
  const generalContext = useContext(GeneralContext);
  return (
    <>
      <fieldset>
        <input
          onClick={() =>
            generalContext.toggleSelectionMode((current) => !current)
          }
          id="matrix-seletion-toggler"
          type="checkbox"
        />
        <label htmlFor="matrix-seletion-toggler">
          Select matrix for product
        </label>
      </fieldset>
      <section>
        {generalContext.selectedColorsArray.map((color) => (
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
};

export default MatrixSelectionMenu;
