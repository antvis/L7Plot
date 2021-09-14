import { IGridAggregation, ISource } from '../../types';

export class MappingSource {
  static aggregation(source: Partial<ISource>, aggregation: IGridAggregation) {
    const { type = 'grid', radius, method, field } = aggregation;
    const config = { type, size: radius, method, field };
    if (source.transforms) {
      // 过滤 transform 有相同配置情况
      source.transforms = source.transforms.filter((transform) => transform.type !== transform.type);
      source.transforms.push(config);
    } else {
      source.transforms = [config];
    }
  }
}
