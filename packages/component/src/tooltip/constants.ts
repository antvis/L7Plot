export const CONTAINER_CLASS = 'l7plot-tooltip';
export const TITLE_CLASS = 'l7plot-tooltip__title';
export const LIST_CLASS = 'l7plot-tooltip__list';
export const LIST_ITEM_CLASS = 'l7plot-tooltip__list-item';
export const NAME_CLASS = 'l7plot-tooltip__name';
export const VALUE_CLASS = 'l7plot-tooltip__value';

export const CONTAINER_TPL = `<div class="${CONTAINER_CLASS}">
  <div class="${TITLE_CLASS}"></div>
  <ul class="${LIST_CLASS}"></ul>
</div>`;
export const ITEM_TPL = `<li class="${LIST_ITEM_CLASS}" data-index={index}>
  <span class="${NAME_CLASS}">{name}</span>
  <span class="${VALUE_CLASS}">{value}</span>
</li>`;
