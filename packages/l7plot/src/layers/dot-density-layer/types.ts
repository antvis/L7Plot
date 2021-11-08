import { ISourceCFG, Source } from '../../types';
import { DotLayerOptions } from '../dot-layer/types';

/**
 * 数据配置
 */
export interface DotDensityLayerSourceOptions extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
}

export interface DotDensityLayerOptions extends Omit<DotLayerOptions, 'shape'> {
  /**
   * 具体的数据
   */
  source: DotDensityLayerSourceOptions | Source;
  /**
   * 图形大小
   */
  size?: number;
}
