import Theme from '../../configs/theme';
import { CONTAINER_CLASS, TITLE_CLASS, RIBBON_CLASS, GRADIENT_BAR_CLASS, VALUE_RANGE_CLASS } from './constants';

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
    padding: '10px',
    lineHeight: 1,
    fontSize: '12px',
  },
  [TITLE_CLASS]: {
    fontSize: '13px',
    lineHeight: '19px',
    marginBottom: '8px',
  },
  [RIBBON_CLASS]: {
    display: 'flex',
    alignItems: 'center',
  },
  [GRADIENT_BAR_CLASS]: {
    width: '140px',
    height: '14px',
    margin: '0px 5px',
  },
  [VALUE_RANGE_CLASS]: {
    padding: '0px',
  },
};
