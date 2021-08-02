export const CONTAINER_CLASS = 'l7plot-legend l7plot-legend__category';
export const TITLE_CLASS = 'l7plot-legend__title';
export const LIST_CLASS = 'l7plot-legend__category-list';
export const LIST_ITEM_CLASS = 'l7plot-legend__list-item';
export const MARKER_CLASS = 'l7plot-legend__category-marker';
export const VALUE_CLASS = 'l7plot-legend__category-value';

export const CONTAINER_TPL = `<div class="${CONTAINER_CLASS}">
  <div class="${TITLE_CLASS}"></div>
  <ul class="${LIST_CLASS}"></ul>
</div>`;
export const ITEM_TPL = `<li class="${LIST_ITEM_CLASS}" data-index={index}>
  <span class="${MARKER_CLASS}" style="background:{color}"></span>
  <span class="${VALUE_CLASS}">{value}</span>
</li>`;
