import { DefaultParams } from '../utils';
import { SimplePoint } from '../simplePoint/index';
import { SimpleLayerType } from '../../types';

export class SimpleWaterPoint extends SimplePoint {
  constructor(data, params) {
    const combinParams = Object.assign(DefaultParams, params, { animate: { enable: true } });
    super(data, combinParams);
    this.simpleType = SimpleLayerType.SimpleWaterPoint;
  }
}
