export const CONTAINER_CLASS = 'l7plot-legend l7plot-legend__continue';
export const TITLE_CLASS = 'l7plot-legend__title';
export const RIBBON_CONTAINER_CLASS = 'l7plot-legend__ribbon-container';
export const RIBBON_CLASS = 'l7plot-legend__ribbon';
export const GRADIENT_BAR_CLASS = 'l7plot-legend__gradient-bar';
export const VALUE_RANGE_CLASS = 'l7plot-legend__value-range';

export const CONTAINER_TPL = `<div class="${CONTAINER_CLASS}">
  <div class="${TITLE_CLASS}"></div>
  <div class="${RIBBON_CONTAINER_CLASS}"></div>
</div>`;
export const RIBBON_TPL = `<div class="${RIBBON_CLASS}">
  <span class="${VALUE_RANGE_CLASS}">{min}</span>
  <div class="${GRADIENT_BAR_CLASS}" style="background-image: {backgroundImage}"></div>
  <span class="${VALUE_RANGE_CLASS}">{max}</span>
</div>`;
