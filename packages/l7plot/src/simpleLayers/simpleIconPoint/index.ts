import { DefaultParams } from '../utils';
import { SimplePoint } from '../simplePoint/index';
import { SimpleLayerType } from '../../types';

export class SimpleIconPoint extends SimplePoint {
  constructor(data, params) {
    // TODO: L7Plot 兼容
    const combinParams = Object.assign(DefaultParams, params, { color: '#fff' });
    super(data, combinParams);
    this.simpleType = SimpleLayerType.SimpleIconPoint;
  }
}
