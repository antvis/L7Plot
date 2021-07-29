import { getLayerStyleAttribute } from '../../../helper/layer';
import { LineLayerWrapper } from '../../../../src/layers/line-layer';
import { Source } from '../../../../src/types';

const source: any = {
  type: 'FeatureCollection',
  crs: {
    type: 'name',
    properties: {
      name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
    },
  },
  features: [
    {
      type: 'Feature',
      properties: {
        标准名称: '2号线',
        分类代码: 1,
        数据来源: '正射影像',
        现状时间: '2021/07-29',
        备注: null,
        SHAPE_LENG: 23177.0298819,
        Shape_Le_1: 23177.0298784,
        Shape_Le_2: 30241.8106532,
      },
      geometry: {
        type: 'MultiLineString',
        coordinates: [
          [16.38050072430798, 39.94888011518406],
          [116.38714780612922, 39.94892587302933],
        ],
      },
    },
  ],
};

describe('line layer', () => {
  const layerWrapper = new LineLayerWrapper({
    source: new Source(source),
    size: 1.5,
    color: {
      field: '标准名称',
      value: 'red',
    },
    animate: true,
  });

  it('layerWrapper', () => {
    expect(layerWrapper).toBeDefined();
  });

  it('type', () => {
    expect(layerWrapper.layer.type).toBe('LineLayer');
  });

  it('size', () => {
    expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'size')).toEqual({
      attributeName: 'size',
      attributeField: 1.5,
    });
  });

  it('color', () => {
    expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'color')).toEqual({
      attributeName: 'color',
      attributeField: '标准名称',
      attributeValues: 'red',
      updateOptions: undefined,
    });
  });

  it('animate', () => {
    expect(getLayerStyleAttribute(layerWrapper.layer['pendingStyleAttributes'], 'animate')).toEqual({
      attributeName: 'animate',
      attributeValue: true,
    });
  });
});
