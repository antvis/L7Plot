import { IPolygonLayerConfig } from '../../types/layer';
import { ISourceCFG, Source } from '../../types';

/**
 * 数据配置
 */
export interface ISource extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
}

export interface IPrismLayerOptions extends Omit<IPolygonLayerConfig, 'shape'> {
  /**
   * 具体的数据
   */
  source: ISource | Source;
}
