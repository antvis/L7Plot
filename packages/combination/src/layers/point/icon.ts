import { Scene, PointLayer, ILayer } from '@antv/l7';
import { isNumber, isString } from '@antv/util';
import { IIconData, IIconOptions, IIconOptionProps } from '../../types';
import { addIconIntoCache, getIconCache, ICache, clearIconCache } from '../../utils/localstroge';
import { generateUUID } from '../../utils/math';

const defaultIconOptions = {
  size: 15,
};

export class Icon {
  private options: IIconOptions;
  private layer: ILayer | undefined;
  private iconCache: ICache = getIconCache();
  private data: IIconData | null;
  private renderData: IIconData[] | null;

  constructor(data: IIconData, options: IIconOptionProps) {
    this.data = data;
    this.options = Object.assign(defaultIconOptions, options);

    this.renderData = this.formatData(data);

    this.initLayer();
  }

  getlayer() {
    return this.layer;
  }

  initLayer() {
    this.layer = new PointLayer()
      .source(this.renderData, {
        parser: {
          x: 'lng',
          y: 'lat',
          type: 'json',
        },
      })
      .shape('url', (url) => url)
      .size(this.options.size);
  }

  formatData(props: IIconData): IIconData[] {
    const originDataArray = [props].flat();

    return originDataArray
      .map((data) => {
        const item = { ...data };
        item.url = this.formatUrl(item.url);
        return item;
      })
      .filter((data) => {
        const { lng, lat, url } = data;
        if (!isNumber(lng) || !isNumber(lat) || !isString(url)) {
          console.warn('Icon 数据错误：' + JSON.stringify(data));
          return false;
        }
        return true;
      });
  }

  formatUrl(url: string | undefined) {
    if (!url) return undefined;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // url
      const name = generateUUID();
      this.iconCache = Icon.addIconURL(this.options.scene, name, url);
      return name;
    } else {
      // name
      if (this.iconCache[url]) {
        return url;
      } else {
        return undefined;
      }
    }
  }

  updateData(data: IIconData) {
    this.renderData = this.formatData(data);
    this.layer && this.layer.setData(this.renderData);
  }

  destroy() {
    this.layer && this.options.scene.removeLayer(this.layer);
    this.data = null;
    this.renderData = null;
  }

  get originData() {
    return this.data;
  }

  get size() {
    return this.options.size;
  }

  set size(size: number) {
    this.options.size = size;
    this.layer?.size(size);
    this.options.scene.render();
  }

  static addIconURL(scene: Scene, name: string, url: string) {
    const cache = addIconIntoCache(name, url);
    scene.addImage(name, url);
    return cache;
  }

  static clearIconCache() {
    clearIconCache();
  }
}
