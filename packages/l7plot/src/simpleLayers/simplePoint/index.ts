import { DotLayer } from '../../layers/dot-layer';
import { buildPointOptions, DefaultParams } from '../utils';
import { ISimpleData, ISimpleParams } from '../types';
import { SizeAttr, ColorAttr, LayerBlend, SimpleLayerType } from '../../types/';
export class SimplePoint extends DotLayer {
  public simpleType: SimpleLayerType;
  private params: ISimpleParams;
  private originData: ISimpleData;
  constructor(originData: ISimpleData, params?) {
    const combinParams = Object.assign(DefaultParams, params);
    const option = buildPointOptions(originData, combinParams);
    super(option);

    this.originData = originData;
    this.params = combinParams;
    this.simpleType = SimpleLayerType.SimplePoint;
  }
  get data() {
    return this.originData;
  }

  set data(data: ISimpleData) {
    this.originData = data;
    const option = buildPointOptions(this.originData, this.params);
    this.layer.setData(option.source.data);
  }

  get color() {
    return this.params.color as ColorAttr;
  }

  set color(color: ColorAttr) {
    if (this.simpleType === SimpleLayerType.SimpleIconPoint) {
      console.warn("warning! water point shouldn't set color!");
      return;
    }
    this.params.color = color;
    this.update(buildPointOptions(this.originData, this.params));
  }

  get size() {
    return this.params.size as SizeAttr;
  }

  set size(size: SizeAttr) {
    this.params.size = size;
    this.update(buildPointOptions(this.originData, this.params));
  }

  get opacity() {
    return this.params['opacity'];
  }

  set opacity(opacity: number) {
    this.params['opacity'] = opacity;
    this.update(buildPointOptions(this.originData, this.params));
  }

  get blend() {
    const { blend } = this.layer.getLayerConfig();
    return blend;
  }

  set blend(blend: LayerBlend | undefined) {
    if (blend !== undefined) {
      this.params.blend = blend;
      this.setBlend(blend);
    }
  }

  get zIndex() {
    return this.layer.zIndex;
  }

  set zIndex(zIndex: number | undefined) {
    if (zIndex !== undefined) {
      this.params.zIndex = zIndex;
      this.setIndex(zIndex);
    }
  }

  get visible() {
    return this.layer.isVisible();
  }

  set visible(visible: boolean | undefined) {
    if (visible !== undefined) {
      this.params.visible = visible;
      visible ? this.show() : this.hide();
    }
  }

  get lntlatFilter() {
    return this.params['lntlatFilter'];
  }

  set lntlatFilter(lntlatFilter: boolean) {
    this.params['lntlatFilter'] = lntlatFilter;
    this.update(buildPointOptions(this.originData, this.params));
  }

  get stroke() {
    return this.params['stroke'];
  }

  set stroke(stroke: ColorAttr) {
    this.params['stroke'] = stroke;
    this.update(buildPointOptions(this.originData, this.params));
  }

  get strokeWidth() {
    return this.params['strokeWidth'];
  }

  set strokeWidth(strokeWidth: number) {
    this.params['strokeWidth'] = strokeWidth;
    this.update(buildPointOptions(this.originData, this.params));
  }
}
