import { ISourceCFG, PointShape3d, Source } from '../../types';
import { DotLayerOptions } from '../dot-layer/types';

/**
 * 数据配置
 */
export interface ColumnLayerSourceOptions extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
}

export interface ColumnLayerOptions extends DotLayerOptions {
  /**
   * 具体的数据
   */
  source: ColumnLayerSourceOptions | Source;
  /**
   * 图形形状
   */
  shape?: PointShape3d;
}
