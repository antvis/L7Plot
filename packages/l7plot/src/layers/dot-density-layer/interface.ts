import { ISourceCFG, Source } from '../../types';
import { IDotLayerOptions } from '../dot-layer/interface';

/**
 * 数据配置
 */
export interface ISource extends Pick<ISourceCFG, 'parser' | 'transforms'> {
  data: any;
}

export interface IDotDensityLayerOptions extends IDotLayerOptions {
  /**
   * 具体的数据
   */
  source: ISource | Source;
  /**
   * 图形形状
   */
  shape?: 'dot';
  /**
   * 图形大小
   */
  size?: number;
}
