import ReadOnlyMatrix, {
  GroupColorState,
  CellCoords,
} from '../Matrix/ReadOnlyMatrix';
import type { ProductStep } from '../../store/matrix_reducer_types';
import { genRandomColor } from '../../helpers/color_utils';
import * as fa from 'react-icons/fa';
import { useState } from 'react';

const ProductStepView = (props: ProductStep) => {
  const [cellColors, setCellColors] = useState<GroupColorState[]>(
    new Array(props.steps[2].length)
      .fill(new Array(props.steps[2][0].length).fill(null))
      .map((row: Array<null>) => {
        return row.map(() => ({
          color: genRandomColor(),
          clickTimeStamp: 0,
        }));
      })
  );

  const computeRowColors = () => {
    const rowColors = cellColors.reduce((acm, row) => {
      acm.push(
        row.reduce((acm, cell) => {
          if (cell.clickTimeStamp) acm.push(cell);
          return acm;
        }, [] as GroupColorState)
      );
      return acm;
    }, [] as GroupColorState[]);

    const clickedRowsColors = rowColors.map((row) => {
      if (row.length === 0) return 'transparent';
      const maxTimeStamp = Math.max(...row.map((c) => c.clickTimeStamp));
      return row.find((c) => {
        return c.clickTimeStamp === maxTimeStamp;
      })!.color;
    });

    return clickedRowsColors;
  };

  const computeColColors = () => {
    let colColors: GroupColorState[] = [];

    for (let i = 0; i < cellColors[0].length; ++i) {
      colColors[i] = [];
      for (let j = 0; j < cellColors.length; ++j) {
        if (
          cellColors[j][i].clickTimeStamp &&
          cellColors[j][i].color !== 'transparent'
        ) {
          colColors[i].push(cellColors[j][i]);
        }
      }
    }

    const clickedColsColors = colColors.map((col) => {
      if (col.length === 0) return 'transparent';
      const maxTimeStamp = Math.max(...col.map((c) => c.clickTimeStamp));
      return col.find((c) => {
        return c.clickTimeStamp === maxTimeStamp;
      })!.color;
    });

    return clickedColsColors;
  };

  const cellClickHandler = (coords: CellCoords) => {
    setCellColors((current) => {
      return current.map((r, i) => {
        if (i !== coords[0]) return r;
        return r.map((c, i) => {
          if (i !== coords[1]) return c;
          const t = Object.assign({}, c);
          t.clickTimeStamp = !c.clickTimeStamp ? Date.now() : 0;
          return t;
        });
      });
    });
  };

  return (
    <article className="product-steps-container">
      <section className="product-step-container">
        {props.steps.map((mat, idx, arr) => (
          <section className="product-step-item" key={`mat-${idx}`}>
            {idx === arr.length - 1 ? (
              <>
                <fa.FaEquals className="equals" />
                <ReadOnlyMatrix
                  matrix={mat}
                  cellsColorState={cellColors}
                  defaultTextColor="black"
                  onCellClick={cellClickHandler}
                />
              </>
            ) : idx % 2 === 0 ? (
              <>
                <ReadOnlyMatrix
                  matrix={mat}
                  rowColors={computeRowColors()}
                  defaultTextColor="black"
                />
                <fa.FaTimes className="times-icon" />
              </>
            ) : (
              <ReadOnlyMatrix
                matrix={mat}
                colColors={computeColColors()}
                defaultTextColor="black"
              />
            )}
          </section>
        ))}
      </section>
      <fa.FaEquals style={{ margin: '2rem', alignSelf: 'center' }} />
      <section style={{ width: '90%', margin: '0 auto' }}>
        <ReadOnlyMatrix
          matrix={props.decomposedResult}
          cellsColorState={cellColors}
          onCellClick={cellClickHandler}
          defaultTextColor={'black'}
        />
      </section>
    </article>
  );
};

export default ProductStepView;
