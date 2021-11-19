import { Scene } from '@antv/l7-scene';
import { Marker } from '@antv/l7-component';
import EventEmitter from '@antv/event-emitter';
import { isString, isEqual } from '@antv/util';
import {
  Tooltip as TooltipComponent,
  TooltipOptions as ITooltipComponentOptions,
  TooltipListItem,
} from '@antv/l7plot-component';
import { get as getValueByPath } from 'lodash-es';
import {
  IPLotLayer,
  ILngLat,
  TooltipAnchorType,
  Event,
  TooltipOptions,
  MouseEvent,
  TooltipItem,
  TooltipEvent,
} from '../types';
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
  public currentVisible = false;
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
      showComponent: true,
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
    this.currentVisible = false;
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
    const { feature, featureId } = event;
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
      items.forEach((item: string | TooltipItem) => {
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

    this.updateTooltip(event, componentOptions);
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

  private updateTooltip(mouseEvent: MouseEvent, componentOptions: Partial<ITooltipComponentOptions>) {
    const { lngLat, x, y } = mouseEvent;
    if (this.options.showComponent) {
      this.updateComponent(componentOptions);
      this.setPostion(lngLat);
    }
    if (this.currentVisible) {
      const event: TooltipEvent = { type: 'tooltip:change', data: componentOptions, lngLat, x, y };
      this.emit('tooltip:change', event);
    } else {
      this.showTooltip();
      const event: TooltipEvent = { type: 'tooltip:show', data: componentOptions, lngLat, x, y };
      this.emit('tooltip:show', event);
    }
  }

  /**
   * tooltip 添加到地图上
   */
  public showTooltip() {
    if (this.currentVisible) return;
    if (this.options.showComponent) {
      this.scene.addMarker(this.marker);
    }
    this.currentVisible = true;
  }

  /**
   * tooltip 从地图上移除
   */
  public hideTooltip() {
    if (!this.currentVisible) return;
    if (this.options.showComponent) {
      this.marker.remove();
    }
    this.currentVisible = false;
    const event: Event = { type: 'tooltip:hide' };
    this.emit('tooltip:hide', event);
  }

  /**
   * 更新 tooltip 组件
   */
  private updateComponent(componentOptions: Partial<ITooltipComponentOptions>) {
    if (!isEqual(this.lastComponentOptions, componentOptions)) {
      this.tooltipComponent.update(componentOptions);
      this.lastComponentOptions = componentOptions;
    }
  }

  /**
   * 设置 tooltip 内容
   */
  private setComponent() {
    const tooltip = this.tooltipComponent.getContainer();
    const container = window.document.createElement('div');
    container.style.cursor = 'auto';
    container.style.userSelect = 'text';
    container.className = 'l7plot-tooltip-container';
    // stopPropagation
    ['mousemove', 'mousedown', 'mouseup', 'click', 'dblclick'].forEach((type) => {
      container.addEventListener(type, (e) => e.stopPropagation());
    });
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
   * 销毁
   */
  public destroy() {
    this.unBindInteractionEvent();
    this.off();
    this.marker.remove();
    this.tooltipComponent.destroy();
  }
}
