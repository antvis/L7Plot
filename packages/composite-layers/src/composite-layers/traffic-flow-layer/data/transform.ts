import { get } from '@antv/util';
import { OriginTrafficData, TrafficFlow, TrafficFlowSource, TrafficLocation } from '../types';
import { getFlowId, getLocationId } from '../utils/id';

export function xLng(x: number) {
  return (x - 0.5) * 360;
}

export function yLat(y: number) {
  const y2 = ((180 - y * 360) * Math.PI) / 180;
  return (360 * Math.atan(Math.exp(y2))) / Math.PI - 90;
}

// longitude/latitude to spherical mercator in [0..1] range
export function lngX(lng: number) {
  return lng / 360 + 0.5;
}

export function latY(lat: number) {
  const sin = Math.sin((lat * Math.PI) / 180);
  const y = 0.5 - (0.25 * Math.log((1 + sin) / (1 - sin))) / Math.PI;
  return y < 0 ? 0 : y > 1 ? 1 : y;
}

export function transformSource(source: TrafficFlowSource): OriginTrafficData {
  const locationMap: Map<string, TrafficLocation> = new Map();
  const flows: TrafficFlow[] = [];
  const { data, parser } = source;
  const { type, x: xField, y: yField, x1: x1Field, y1: y1Field, weight: weightField } = parser;

  const makeSureLocation = (lng: number, lat: number, weight: number) => {
    const id = `${lng}-${lat}`;
    let location = locationMap.get(id);
    if (!location) {
      location = {
        id: getLocationId(),
        lng: lng,
        lat: lat,
        weight,
      };
      locationMap.set(id, location);
    }
    return location;
  };

  if (type === 'json' && xField && yField && x1Field && y1Field && weightField) {
    data.forEach((item) => {
      const lng1 = +get(item, xField, 0);
      const lat1 = +get(item, yField, 0);
      const lng2 = +get(item, x1Field, 0);
      const lat2 = +get(item, y1Field, 0);
      const weight = +get(item, weightField, 0);

      const location1 = makeSureLocation(lng1, lat1, weight);
      const location2 = makeSureLocation(lng2, lat2, weight);
      flows.push({
        id: getFlowId(),
        fromId: location1.id,
        toId: location2.id,
        weight,
      });
    });
  } else {
    console.error('TrafficFlowLayer 的 source 输入有误，请检查 source 传参');
  }

  return {
    locations: Array.from(locationMap.values()),
    flows,
  };
}
