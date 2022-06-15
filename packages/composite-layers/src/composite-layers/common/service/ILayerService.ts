import { TextLayerStyleOptions } from '../../../core-layers/text-layer/types';
import { TextLayer } from '../../../core-layers/text-layer';
export interface ILayerService {
  getLayerOptions: () => TextLayerStyleOptions;
  createLayer: (id?: string) => TextLayer;
}
