import { pick } from '@antv/util';
import { Plot } from '../../core/plot';
import { FlowOptions } from './types';
import { DEFAULT_OPTIONS } from './constants';
import { ArcLayer } from '../../layers/arc-layer';
import { DotLayer } from '../../layers/dot-layer';
import { TextLayer } from '../../layers/text-layer';
import { LabelOptions, LegendOptions, Source } from '../../types';
import { LayerGroup } from '../../core/layer/layer-group';

export type { FlowOptions };

export class Flow extends Plot<FlowOptions> {
  /**
   * 默认配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;

  /**
   * 图表类型
   */
  public type = Plot.PlotType.Flow;

  /**
   * 流向图层
   */
  public flowLayer!: ArcLayer;

  /**
   * 辐射圈图层
   */
  public radiationLayer: DotLayer | undefined;

  /**
   * 落地点标注图层
   */
  public labelLayer: TextLayer | undefined;

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<FlowOptions> {
    return Flow.DefaultOptions;
  }

  /**
   * 创建图层
   */
  protected createLayers(source: Source): LayerGroup {
    this.flowLayer = new ArcLayer({
      name: 'flowLayer',
      source,
      ...pick<any>(this.options, ArcLayer.LayerOptionsKeys),
    });
    const layerGroup = new LayerGroup([this.flowLayer]);

    if (this.options.radiation) {
      this.radiationLayer = this.createRadiationLayer(source);
      layerGroup.addLayer(this.radiationLayer);
    }

    if (this.options.label) {
      this.labelLayer = this.createLabelLayer(source, this.options.label);
      layerGroup.addLayer(this.labelLayer);
    }

    return layerGroup;
  }

  /**
   * 解析流向图起终点数据
   */
  private parserPointData(source: Source) {
    // const pointMap = {};
    const data: any[] = [];
    source.data.dataArray.forEach((item) => {
      const { coordinates } = item;
      // [startPoint, endPoint]
      const [, endPoint] = coordinates;
      // if (isUndefined(pointMap[startPoint.toString()])) {
      //   data.push({ ...item, coordinates: startPoint });
      //   pointMap[startPoint.toString()] = true;
      // }
      data.push({ ...item, coordinates: endPoint });
    });

    return data;
  }

  /**
   * 创建辐射圈图层
   */
  protected createRadiationLayer(source: Source): DotLayer {
    const data = this.parserPointData(source);
    const { enabled = true, color, size = 20, shape = 'circle', animate = true } = this.options.radiation || {};
    const radiationLayer = new DotLayer({
      name: 'radiationLayer',
      source: {
        data,
        parser: { type: 'json', coordinates: 'coordinates' },
      },
      visible: enabled,
      color,
      size,
      shape,
      animate,
    });

    const updateCallback = () => {
      const data = this.parserPointData(this.source);
      radiationLayer.layer.setData(data);
    };

    source.on('update', updateCallback);
    radiationLayer.on('remove', () => {
      source.off('update', updateCallback);
    });

    return radiationLayer;
  }

  /**
   * 创建数据标签图层
   */
  protected createLabelLayer(source: Source, label: LabelOptions): TextLayer {
    const data = this.parserPointData(source);
    const { visible, minZoom, maxZoom, zIndex = 0 } = this.options;
    const labelLayer = new TextLayer({
      name: 'labelLayer',
      source: {
        data,
        parser: { type: 'json', coordinates: 'coordinates' },
      },
      visible,
      minZoom,
      maxZoom,
      zIndex: zIndex + 0.1,
      ...label,
    });

    const updateCallback = () => {
      const data = this.parserPointData(this.source);
      labelLayer.layer.setData(data);
    };

    source.on('update', updateCallback);
    labelLayer.on('remove', () => {
      source.off('update', updateCallback);
    });

    return labelLayer;
  }

  /**
   * 更新图层
   */
  protected updateLayers(options: FlowOptions) {
    const flowLayerConfig = pick<any>(options, ArcLayer.LayerOptionsKeys);
    this.flowLayer.update(flowLayerConfig);

    if (options.radiation) {
      if (this.radiationLayer) {
        const radiation = { ...options.radiation, visible: options.radiation.enabled };
        this.radiationLayer.update(radiation);
      } else {
        this.radiationLayer = this.createRadiationLayer(this.source);
        this.layerGroup.addLayer(this.radiationLayer);
      }
    }

    this.updateLabelLayer(this.source, options.label, this.options, this.labelLayer);
  }

  /**
   * 实现 legend 配置项
   */
  public getLegendOptions(): LegendOptions {
    const colorLegendItems = this.flowLayer.getColorLegendItems();
    if (colorLegendItems.length !== 0) {
      return { type: 'category', items: colorLegendItems };
    }

    return {};
  }
}
