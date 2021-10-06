import { Map } from '../map';
import { deepAssign } from '../../utils';
import { TextLayer } from '../../layers/text-layer';
import { MapType, IPlotOptions, ILabelOptions, Source, ISource, Scene } from '../../types';
import { LayerGroup } from '../layer/layer-group';
import { MappingSource } from '../../adaptor/source';

const DEFAULT_OPTIONS: Partial<IPlotOptions> = {
  autoFit: false,
};

export abstract class Plot<O extends IPlotOptions> extends Map<O> {
  /**
   * 默认的 options 配置项
   */
  static DefaultOptions = DEFAULT_OPTIONS;
  /**
   * 地图图表类型
   */
  static MapType = MapType;
  /**
   * 图表类型名称
   */
  public abstract readonly type: MapType | string;
  /**
   * 数据
   */
  public source: Source;

  constructor(container: O);
  constructor(container: string | HTMLDivElement, options: O);
  constructor(container: string | HTMLDivElement | O, options?: O) {
    if (typeof container === 'string' || container instanceof Element) {
      if (options === undefined) {
        throw new Error('options is undefined');
      }
      super(options);
      this.container = this.createContainer(container);

      this.theme = this.createTheme();
      this.scene = this.createScene();
      this.source = this.createSource();

      this.registerResources();
      this.initLayers();
    } else {
      super(container);
      this.source = this.createSource();
    }
  }

  /**
   * 初始化图层
   */
  protected initLayers() {
    this.render();
    this.inited = true;
  }

  /**
   * 初始化图层事件
   */
  protected initLayersEvent() {
    //
  }

  /**
   * 初始化组件
   */
  protected initComponents() {
    this.initControls();
    this.initTooltip();
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<IPlotOptions> {
    return Plot.DefaultOptions;
  }

  /**
   * 创建 source 实例
   */
  protected createSource() {
    const { data, aggregation, ...sourceCFG } = this.options.source;
    aggregation && MappingSource.aggregation(sourceCFG, aggregation);
    const source = new Source(data, sourceCFG);
    return source;
  }

  /**
   * 创建图层
   */
  protected abstract createLayers(source: Source): LayerGroup;

  /**
   * 更新图层
   */
  protected abstract updateLayers(options: Partial<O>): void;

  /**
   * 创建数据标签图层
   */
  protected createLabelLayer(source: Source, label: ILabelOptions): TextLayer {
    const textLayer = new TextLayer({ name: 'labelLayer', source, ...label });
    return textLayer;
  }

  /**
   * 渲染
   */
  public render() {
    const layerGroup = this.createLayers(this.source);
    if (this.inited) {
      this.layerGroup.removeAllLayer();
      layerGroup.addTo(this.scene);
      this.layerGroup = layerGroup;
      this.initComponents();
    } else {
      this.layerGroup = layerGroup;
      this.onLayersLoaded();
      layerGroup.addTo(this.scene);
    }
    this.initLayersEvent();
  }

  /**
   * 图表图层加载成功
   */
  protected onLayersLoaded() {
    const onLoaded = () => {
      this.initComponents();
      this.loaded = true;
      this.emit('loaded');
    };
    if (this.scene['sceneService'].loaded) {
      this.sceneLoaded = true;
      this.layersLoaded && onLoaded();
    } else {
      this.scene.once('loaded', () => {
        this.sceneLoaded = true;
        this.layersLoaded && onLoaded();
      });
    }
    if (this.layerGroup.isEmpty()) {
      this.layersLoaded = true;
    } else {
      this.layerGroup.once('inited-all', () => {
        this.layersLoaded = true;
        this.sceneLoaded && onLoaded();
      });
    }
  }

  /**
   * 挂载到容器
   */
  public attachToScene(scene: Scene, theme: Record<string, any>) {
    this.scene = scene;
    this.theme = theme;
    this.render();
    this.inited = true;
  }

  /**
   * 更新: 更新数据
   */
  public changeData(data: any, cfg?: Omit<ISource, 'data'>) {
    this.options.source = deepAssign({}, this.options.source, { data, ...cfg });
    const { aggregation, ...sourceCFG } = this.options.source;
    aggregation && MappingSource.aggregation(sourceCFG, aggregation);

    this.source.setData(this.options.source.data, sourceCFG);
  }
}
