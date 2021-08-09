import Theme from '../configs/theme';
import { CONTAINER_CLASS, LIST_CLASS, LIST_ITEM_CLASS, TITLE_CLASS, NAME_CLASS, VALUE_CLASS } from './constants';

export default {
  // css style for tooltip
  [CONTAINER_CLASS]: {
    visibility: 'visible',
    zIndex: 1,
    transition:
      'visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1), ' +
      'left 0.4s cubic-bezier(0.23, 1, 0.32, 1), ' +
      'top 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: 'rgb(0 0 0 / 16%) 0px 6px 12px 0px',
    borderRadius: '2px',
    color: 'rgb(87, 87, 87)',
    fontSize: '12px',
    fontFamily: Theme.fontFamily,
    lineHeight: '20px',
    padding: '10px 10px 6px 10px',
  },
  [TITLE_CLASS]: {
    marginBottom: '4px',
  },
  [LIST_CLASS]: {
    margin: '0px',
    listStyleType: 'none',
    padding: '0px',
  },
  [LIST_ITEM_CLASS]: {
    listStyleType: 'none',
    marginBottom: '4px',
  },
  [NAME_CLASS]: {},
  [VALUE_CLASS]: {
    display: 'inline-block',
    float: 'right',
    marginLeft: '30px',
  },
};
