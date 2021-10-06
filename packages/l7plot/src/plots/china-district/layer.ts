import { LinesLayer } from '../../layers/lines-layer';
import { CHINA_BOUNDARY_STYLE } from './constants';

export const createCountryBoundaryLayer = (data: any) => {
  const chinaBoundaryFeatures = data.features.filter(({ properties }) =>
    ['海洋', '港澳', '国界'].includes(properties.type)
  );
  const disputeBoundaryFeatures = data.features.filter(({ properties }) => properties.type === '争议');
  const chinaBoundaryLayer = new LinesLayer({
    source: {
      data: { type: 'FeatureCollection', features: chinaBoundaryFeatures },
      parser: { type: 'geojson' },
    },
    shape: 'line',
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
  const chinaDisputeBoundaryLayer = new LinesLayer({
    source: {
      data: { type: 'FeatureCollection', features: disputeBoundaryFeatures },
      parser: { type: 'geojson' },
    },
    shape: 'line',
    color: CHINA_BOUNDARY_STYLE['争议'].color,
    size: CHINA_BOUNDARY_STYLE['争议'].width,
    style: {
      opacity: CHINA_BOUNDARY_STYLE['争议'].opacity,
      lineType: 'dash',
      dashArray: CHINA_BOUNDARY_STYLE['争议'].dashArray as [number, number],
    },
  });

  return { chinaBoundaryLayer, chinaDisputeBoundaryLayer };
};
