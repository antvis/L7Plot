import { PathLayer } from '../../layers/path-layer';
import { PlotLayerOptions } from '../../types';
import { CHINA_BOUNDARY_STYLE } from './constants';

export const createCountryBoundaryLayer = (data: any, plotLayerConfig?: PlotLayerOptions) => {
  const { visible, minZoom, maxZoom, zIndex = 0 } = plotLayerConfig || {};
  const chinaBoundaryFeatures = data.features.filter(({ properties }) =>
    ['coast', 'hkm', 'national'].includes(properties.type)
  );
  const disputeBoundaryFeatures = data.features.filter(({ properties }) => properties.type === 'dispute');
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
        return CHINA_BOUNDARY_STYLE[type].color;
      },
    },
    size: {
      field: 'type',
      value: ({ type }) => {
        return CHINA_BOUNDARY_STYLE[type].width;
      },
    },
    style: {
      opacity: ['type', (type) => CHINA_BOUNDARY_STYLE[type].opacity],
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
    color: CHINA_BOUNDARY_STYLE['dispute'].color,
    size: CHINA_BOUNDARY_STYLE['dispute'].width,
    style: {
      opacity: CHINA_BOUNDARY_STYLE['dispute'].opacity,
      lineType: 'dash',
      dashArray: CHINA_BOUNDARY_STYLE['dispute'].dashArray as [number, number],
    },
  });

  return { chinaBoundaryLayer, chinaDisputeBoundaryLayer };
};
