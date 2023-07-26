import { get } from '@antv/util';
import { FlowSource, OriginData, OriginFlow, OriginLocation } from '../types';
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

export function transformSource(source: FlowSource): OriginData {
  const locationMap: Map<string, OriginLocation> = new Map();
  const flows: OriginFlow[] = [];
  const { data, parser } = source;
  const {
    type,
    x: xField,
    y: yField,
    x1: x1Field,
    y1: y1Field,
    weight: weightField,
    name: nameField,
    name1: name1Field,
  } = parser;

  const makeSureLocation = ({ lng, lat, weight, name }: Omit<OriginLocation, 'id'>) => {
    const id = `${lng}-${lat}`;
    let location = locationMap.get(id);
    if (!location) {
      location = {
        id: getLocationId(),
        lng: lng,
        lat: lat,
        weight,
        name,
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
      const name1 = nameField && get(item, nameField, undefined);
      const name2 = name1Field && get(item, name1Field, undefined);

      const location1 = makeSureLocation({ lng: lng1, lat: lat1, weight, name: name1 });
      const location2 = makeSureLocation({ lng: lng2, lat: lat2, weight, name: name2 });
      flows.push({
        id: getFlowId(),
        fromId: location1.id,
        toId: location2.id,
        weight,
      });
    });
  } else {
    console.error('FlowLayer 的 source 输入有误，请检查 source 传参');
  }

  return {
    locations: Array.from(locationMap.values()),
    flows,
  };
}
