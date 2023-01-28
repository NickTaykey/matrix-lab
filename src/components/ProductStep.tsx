import ReadOnlyMatrix, { GroupColorState, CellCoords } from './ReadOnlyMatrix';
import type { ProductStep } from '../store/matrix_reducer_types';
import { genRandomColor } from '../store/GeneralContextProvider';
import * as fa from 'react-icons/fa';
import { useState } from 'react';

const ProductStepView = (props: ProductStep) => {
  const [cellColors, setCellColors] = useState<GroupColorState[]>(
    new Array(props.steps[2].length)
      .fill(new Array(props.steps[2][0].length).fill(null))
      .map((row: Array<null>, rowIdx) => {
        return row.map((_, colIdx) => ({
          color: genRandomColor(),
          hightlighted: false,
        }));
      })
  );

  const computeRowColors = () => {
    return cellColors.reduce((acm, row) => {
      acm.push(
        row.reduce((acm, cell) => {
          if (cell.hightlighted) acm.push(cell.color);
          return acm;
        }, [] as string[])
      );
      return acm;
    }, [] as Array<string[]>);
  };

  const computeColColors = () => {
    let colColors: Array<string[]> = [];
    for (let i = 0; i < cellColors[0].length; ++i) {
      colColors[i] = [];
      for (let j = 0; j < cellColors.length; ++j) {
        colColors[i][j] = cellColors[j][i].hightlighted
          ? cellColors[j][i].color
          : 'transparent';
      }
    }
    colColors = colColors.map((col) => col.filter((c) => c !== 'transparent'));
    return colColors;
  };

  const cellClickHandler = (coords: CellCoords) => {
    setCellColors((current) => {
      return current.map((r, i) => {
        if (i !== coords[0]) return r;
        return r.map((c, i) => {
          if (i !== coords[1]) return c;
          const t = Object.assign({}, c);
          t.hightlighted = !c.hightlighted;
          return t;
        });
      });
    });
  };

  return (
    <article
      style={{
        display: 'flex',
        marginBottom: '2rem',
        alignItems: 'center',
      }}
    >
      {props.steps.map((mat, idx, arr) => (
        <section
          style={{ display: 'flex', alignItems: 'center' }}
          key={`mat-${idx}`}
        >
          {idx === arr.length - 1 ? (
            <>
              <fa.FaEquals style={{ margin: '0 2rem' }} />
              <ReadOnlyMatrix
                matrix={mat}
                cellsColorState={cellColors}
                onCellClick={cellClickHandler}
              />
            </>
          ) : idx % 2 === 0 ? (
            <>
              <ReadOnlyMatrix matrix={mat} rowColors={computeRowColors()} />
              <fa.FaTimes style={{ margin: '0 2rem' }} />
            </>
          ) : (
            <ReadOnlyMatrix matrix={mat} colColors={computeColColors()} />
          )}
        </section>
      ))}
      <fa.FaEquals style={{ margin: '0 2rem' }} />
      <ReadOnlyMatrix
        matrix={props.decomposedResult}
        cellsColorState={cellColors}
        onCellClick={cellClickHandler}
      />
    </article>
  );
};

export default ProductStepView;
