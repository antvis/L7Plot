import { GridAggregation, SourceOptions } from '../../types';

export class MappingSource {
  static aggregation(source: Partial<SourceOptions>, aggregation: GridAggregation) {
    const { type = 'grid', radius, method, field } = aggregation;
    const config = { type, size: radius, method, field };
    if (source.transforms) {
      // 过滤 transform 有相同配置情况
      source.transforms = source.transforms.filter((transform) => transform.type !== config.type);
      source.transforms.push(config);
    } else {
      source.transforms = [config];
    }
  }
}
