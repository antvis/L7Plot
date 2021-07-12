export const CONTAINER_CLASS = 'l7plot-tooltip';
export const TITLE_CLASS = 'l7plot-tooltip-title';
export const LIST_CLASS = 'l7plot-tooltip-list';
export const LIST_ITEM_CLASS = 'l7plot-tooltip-list-item';
export const MARKER_CLASS = 'l7plot-tooltip-marker';
export const VALUE_CLASS = 'l7plot-tooltip-value';
export const NAME_CLASS = 'l7plot-tooltip-name';

export const CONTAINER_TPL = `<div class="${CONTAINER_CLASS}"><div class="${TITLE_CLASS}"></div><ul class="${LIST_CLASS}"></ul></div>`;
export const ITEM_TPL = `<li class="${LIST_ITEM_CLASS}" data-index={index}>
  <span class="${MARKER_CLASS}" style="background:{color}"></span>
  <span class="${NAME_CLASS}">{name}</span>:
  <span class="${VALUE_CLASS}">{value}</span>
</li>`;
