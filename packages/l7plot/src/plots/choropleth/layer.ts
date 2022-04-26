import { deepAssign } from '../../utils';
import { ChinaBoundaryStyle, ChoroplethOptions, FeatureCollection } from './types';
import { PathLayer } from '../../layers/path-layer';
import { CHINA_BOUNDARY_STYLE } from './constants';

/**
 * 创建中国国界线图层
 */
export const createCountryBoundaryLayer = (data: FeatureCollection, plotConfig?: ChoroplethOptions) => {
  const { visible, minZoom, maxZoom, zIndex = 0, chinaBorder } = plotConfig || {};
  const borderStyle: Required<ChinaBoundaryStyle> =
    typeof chinaBorder === 'object' ? deepAssign({}, CHINA_BOUNDARY_STYLE, chinaBorder) : CHINA_BOUNDARY_STYLE;
  const chinaBoundaryFeatures = data.features.filter(({ properties }) =>
    ['coast', 'national'].includes(properties?.['type'])
  );
  const disputeBoundaryFeatures = data.features.filter(({ properties }) => properties?.['type'] === 'dispute');
  const hkmBoundaryFeatures = data.features.filter(({ properties }) => properties?.['type'] === 'hkm');

  const chinaBoundaryLayer = new PathLayer({
    name: 'chinaBoundaryLayer',
    visible,
    minZoom,
    maxZoom,
    zIndex: zIndex + 0.1,
    source: {
      data: { type: 'FeatureCollection', features: chinaBoundaryFeatures },
      parser: { type: 'geojson' },
    },
    color: {
      field: 'type',
      value: ({ type }) => {
        return borderStyle[type].color;
      },
    },
    size: {
      field: 'type',
      value: ({ type }) => {
        return borderStyle[type].width;
      },
    },
    style: {
      opacity: ['type', (type) => borderStyle[type].opacity],
    },
  });
  const chinaHkmBoundaryLayer = new PathLayer({
    name: 'chinaHkmBoundaryLayer',
    visible,
    minZoom,
    maxZoom,
    zIndex: zIndex + 0.1,
    source: {
      data: { type: 'FeatureCollection', features: hkmBoundaryFeatures },
      parser: { type: 'geojson' },
    },
    color: borderStyle.hkm.color,
    size: borderStyle.hkm.width,
    style: {
      opacity: borderStyle.hkm.opacity,
      lineType: 'dash',
      dashArray: borderStyle.hkm.dashArray as [number, number],
    },
  });
  const chinaDisputeBoundaryLayer = new PathLayer({
    name: 'chinaDisputeBoundaryLayer',
    visible,
    minZoom,
    maxZoom,
    zIndex: zIndex + 0.1,
    source: {
      data: { type: 'FeatureCollection', features: disputeBoundaryFeatures },
      parser: { type: 'geojson' },
    },
    color: borderStyle.dispute.color,
    size: borderStyle.dispute.width,
    style: {
      opacity: borderStyle.dispute.opacity,
      lineType: 'dash',
      dashArray: borderStyle.dispute.dashArray as [number, number],
    },
  });

  return { chinaBoundaryLayer, chinaHkmBoundaryLayer, chinaDisputeBoundaryLayer };
};
