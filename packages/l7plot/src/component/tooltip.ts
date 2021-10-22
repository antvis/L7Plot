import { Scene } from '@antv/l7-scene';
import { Marker } from '@antv/l7-component';
import EventEmitter from '@antv/event-emitter';
import { isString } from '@antv/util';
import {
  Tooltip as TooltipComponent,
  TooltipOptions as ITooltipComponentOptions,
  TooltipListItem,
} from '@antv/l7plot-component';
import { isEqual, get as getValueByPath } from 'lodash-es';
import { IPLotLayer, ILngLat, TooltipAnchorType, Event, TooltipOptions, MouseEvent, ITooltipItem } from '../types';
import { deepAssign } from '../utils';

const TRIGGER_LIST = ['mousemove', 'click'];

export class Tooltip extends EventEmitter {
  /**
   * 地图容器
   */
  protected scene: Scene;
  /**
   * 带交互的图层
   */
  protected interactionLayers: IPLotLayer[];
  /**
   * tooltip 的 schema 配置
   */
  protected options: TooltipOptions;
  /**
   * marker 实例
   */
  private marker: Marker;
  /**
   * tooltipComponent 实例
   */
  private tooltipComponent: TooltipComponent;
  /**
   * tooltip 是否可见
   */
  public visible = false;
  /**
   * TooltipComponent 更新项
   */
  private lastComponentOptions: any;

  constructor(scene: Scene, interactionLayers: IPLotLayer[], options: TooltipOptions) {
    super();
    this.scene = scene;
    this.interactionLayers = interactionLayers;
    this.options = deepAssign({}, this.getDefaultOptions(), options);
    const { offsets, title, showTitle, customContent, domStyles, anchor, className } = this.options;

    this.marker = new Marker({
      offsets,
      anchor,
      draggable: false,
    });
    this.tooltipComponent = new TooltipComponent({
      title,
      showTitle,
      items: [],
      customContent,
      domStyles,
      className,
    });

    this.setComponent();
    this.initInteractionEvent();
  }

  /**
   * 获取默认配置
   */
  protected getDefaultOptions(): Partial<TooltipOptions> {
    return {
      showTitle: true,
      items: [],
      offsets: [15, 0],
      trigger: 'mousemove',
      anchor: TooltipAnchorType['TOP-LEFT'],
    };
  }

  /**
   * 更新 tooltip 组件
   */
  public update(options: Partial<TooltipOptions>) {
    this.marker.remove();
    this.visible = false;
    this.options = deepAssign({}, this.options, options);

    const { offsets, showTitle, customContent, domStyles, anchor, className } = this.options;

    this.marker = new Marker({
      offsets,
      anchor,
      draggable: false,
    });
    this.tooltipComponent.update({
      showTitle,
      customContent,
      domStyles,
      className,
    });
    this.setComponent();
  }

  private initInteractionEvent() {
    const trigger = this.options.trigger || 'mousemove';
    if (!TRIGGER_LIST.includes(trigger)) {
      throw new Error('trigger is mousemove or click');
    }

    this.interactionLayers.forEach(({ layer }) => {
      layer.on(trigger, this.interactionTriggerHander);
      layer.on(`un${trigger}`, this.interactionUntriggerHander);
    });
  }

  private interactionTriggerHander = (event: MouseEvent) => {
    const { lngLat, feature, featureId } = event;
    const { title, customTitle, items, customItems } = this.options;
    // is GeoJson type
    const isGeoFeature = feature.type === 'Feature' && feature.geometry && feature.properties;
    // parse GeoJson properties
    const properties = isGeoFeature ? feature.properties : feature;
    let tooltipItems: TooltipListItem[] = [];

    if (customItems) {
      const items = customItems(feature);
      if (Array.isArray(items)) {
        tooltipItems = items;
      } else {
        throw new Error('customItems return array');
      }
    } else if (items) {
      items.forEach((item: string | ITooltipItem) => {
        if (isString(item)) {
          const name = item.split('.').pop() || item;
          const value = getValueByPath(properties, item);
          if (value !== undefined) {
            tooltipItems.push({ name, value });
          }
        } else {
          const { field, alias, customValue } = item;
          const name = alias || field.split('.').pop() || field;
          const value = getValueByPath(properties, field);
          if (value !== undefined) {
            tooltipItems.push({
              name,
              value: customValue ? customValue(value, properties, featureId) : value,
            });
          }
        }
      });
    }

    const componentOptions = { title: customTitle ? customTitle(properties) : title, items: tooltipItems };

    this.showTooltip(lngLat, componentOptions);
  };

  private interactionUntriggerHander = () => {
    this.hideTooltip();
  };

  private unBindInteractionEvent() {
    const trigger = this.options.trigger || 'mousemove';
    this.interactionLayers.forEach(({ layer }) => {
      layer.off(trigger, this.interactionTriggerHander);
      layer.off(`un${trigger}`, this.interactionUntriggerHander);
    });
  }

  public showTooltip(position: ILngLat, componentOptions: Partial<ITooltipComponentOptions>) {
    this.updateComponent(position, componentOptions);
    this.addTo();
  }

  public hideTooltip() {
    this.remove();
  }

  /**
   * 更新 tooltip 组件
   */
  public updateComponent(position: ILngLat, componentOptions: Partial<ITooltipComponentOptions>) {
    if (!isEqual(this.lastComponentOptions, componentOptions)) {
      this.tooltipComponent.update(componentOptions);
      this.lastComponentOptions = componentOptions;
    }
    this.setPostion(position);
  }

  /**
   * 设置 tooltip 内容
   */
  private setComponent() {
    const tooltip = this.tooltipComponent.getContainer();
    const container = window.document.createElement('div');
    container.className = 'l7plot-tooltip-container';
    container.appendChild(tooltip);
    this.marker.setElement(container);
  }

  /**
   * 设置 tooltip 位置
   */
  private setPostion(position: ILngLat) {
    this.marker.setLnglat(position);
  }

  /**
   * tooltip 添加到地图上
   */
  public addTo() {
    if (this.visible) return;
    this.scene.addMarker(this.marker);
    this.visible = true;
    const event: Event = { type: 'tooltip:show' };
    this.emit('tooltip:show', event);
  }

  /**
   * tooltip 从地图上移除
   */
  public remove() {
    if (!this.visible) return;
    this.marker.remove();
    this.visible = false;
    const event: Event = { type: 'tooltip:hide' };
    this.emit('tooltip:hide', event);
  }

  /**
   * 销毁
   */
  public destroy() {
    this.unBindInteractionEvent();
    this.off();
    this.marker.remove();
    this.tooltipComponent.destroy();
  }
}
