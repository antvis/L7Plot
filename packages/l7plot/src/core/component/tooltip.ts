import { ILayer, ILngLat } from '@antv/l7-core';
import { Scene } from '@antv/l7-scene';
import { Marker } from '@antv/l7-component';
import EventEmitter from '@antv/event-emitter';
import { isString } from '@antv/util';
import {
  Tooltip as TooltipComponent,
  ITooltipOptions as ITooltipComponentOptions,
  ITooltipListItem,
} from '@antv/l7plot-component';
import { get as getValueByPath } from 'lodash-es';
import { TooltipAnchorType, IEvent, ITooltipOptions } from '../../types';
import { deepAssign } from '../../utils';

const TRIGGER_LIST = ['mousemove', 'click'];

export class Tooltip extends EventEmitter {
  /**
   * 地图容器
   */
  protected scene: Scene;
  /**
   * 带交互的图层
   */
  protected interactionLayers: ILayer[];
  /**
   * tooltip 的 schema 配置
   */
  protected options: ITooltipOptions;
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

  constructor(scene: Scene, interactionLayers: ILayer[], options: ITooltipOptions) {
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
  protected getDefaultOptions(): Partial<ITooltipOptions> {
    return {
      showTitle: true,
      items: [],
      offsets: [15, 0],
      trigger: 'mousemove',
      anchor: TooltipAnchorType['TOP-LEFT'],
    };
  }

  private initInteractionEvent() {
    const trigger = this.options.trigger || 'mousemove';
    if (!TRIGGER_LIST.includes(trigger)) {
      throw new Error('trigger is mousemove or click');
      return;
    }

    this.interactionLayers.forEach((layer) => {
      layer.on(trigger, this.interactionTriggerHander);
      layer.on(`un${trigger}`, this.interactionUntriggerHander);
    });
  }

  private interactionTriggerHander = (event: any) => {
    const { lngLat, feature } = event;
    const { title, customTitle, items, customItems } = this.options;
    let tooltipItems: ITooltipListItem[] = [];

    if (customItems) {
      const items = customItems(feature);
      if (Array.isArray(items)) {
        tooltipItems = items;
      } else {
        throw new Error('customItems return array');
      }
    } else if (items) {
      items.forEach((item) => {
        if (isString(item)) {
          const value = getValueByPath(feature, item);
          if (value !== undefined) {
            tooltipItems.push({ name: item, value });
          }
        } else {
          const { field, alias, customValue } = item;
          const value = getValueByPath(feature, field);
          if (value !== undefined) {
            tooltipItems.push({
              name: alias || field,
              value: customValue ? customValue(value, feature) : value,
            });
          }
        }
      });
    }

    const componentOptions = { title: customTitle ? customTitle(feature) : title, items: tooltipItems };

    this.showTooltip(lngLat, componentOptions);
  };

  private interactionUntriggerHander = () => {
    this.hideTooltip();
  };

  private unBindInteractionEvent() {
    const trigger = this.options.trigger || 'mousemove';
    this.interactionLayers.forEach((layer) => {
      layer.off(trigger, this.interactionTriggerHander);
      layer.off(`un${trigger}`, this.interactionUntriggerHander);
    });
  }

  public showTooltip(position: ILngLat, componentOptions: Partial<ITooltipComponentOptions>) {
    this.update(position, componentOptions);
    this.addTo();
    const event: IEvent = { type: 'tooltip:show' };
    this.emit('tooltip:show', event);
  }

  public hideTooltip() {
    this.remove();
    const event: IEvent = { type: 'tooltip:hide' };
    this.emit('tooltip:hide', event);
  }

  /**
   * 更新 tooltip
   */
  public update(position: ILngLat, componentOptions: Partial<ITooltipComponentOptions>) {
    this.tooltipComponent.update(componentOptions);
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
  }

  /**
   * tooltip 从地图上移除
   */
  public remove() {
    if (!this.visible) return;
    this.marker.remove();
    this.visible = false;
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
