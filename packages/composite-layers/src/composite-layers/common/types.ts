import { TextLayerOptions } from '../../core-layers/text-layer/types';

/**
 * 文本标注
 */
export type LabelOptions = Omit<TextLayerOptions, 'source'>;
