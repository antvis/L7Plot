import Theme from '../../configs/theme';
import { CONTAINER_CLASS, LIST_CLASS, LIST_ITEM_CLASS, MARKER_CLASS, TITLE_CLASS, VALUE_CLASS } from './constants';

export default {
  // css style for legend
  [CONTAINER_CLASS]: {
    visibility: 'visible',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: 'rgb(0 0 0 / 16%) 0px 6px 12px 0px',
    borderRadius: '2px',
    color: 'rgb(87, 87, 87)',
    fontFamily: Theme.fontFamily,
    padding: '10px 10px 6px 10px',
    lineHeight: 1,
    fontSize: '12px',
  },
  [TITLE_CLASS]: {
    lineHeight: '18px',
    marginBottom: '5px',
  },
  [LIST_CLASS]: {
    margin: '0px',
    listStyleType: 'none',
    padding: '0px',
  },
  [LIST_ITEM_CLASS]: {
    listStyleType: 'none',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2px',
  },
  [MARKER_CLASS]: {
    width: '24px',
    height: '12px',
    marginRight: '8px',
  },
  [VALUE_CLASS]: {},
};
