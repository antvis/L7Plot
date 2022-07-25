import { FieldGetter, FlowItem, LocationFlow, LocationItem } from './types';
import { DEFAULT_FIELD_GETTER_OPTIONS } from './constants';
import { createUuid, getValueByGetter, lat2Y, lng2X, x2Lng, y2Lat } from './utils';

/**
 * 将经纬度装换为字符串，用作Map的key值
 * @param lng
 * @param lat
 */
export function getLocationLngLatKey(lng: number, lat: number) {
  return `${lng.toFixed(6)},${lat.toFixed(6)}`;
}

/**
 * 创建LocationItem项，可传入经纬度，也可传入X/Y，两者会在方法内互相转换并赋予到新LocationItem中
 * @param config
 */
export function createLocationItem(
  config: Omit<LocationItem, 'x' | 'y'> | Omit<LocationItem, 'lng' | 'lat'>
): LocationItem {
  if ('lng' in config) {
    return {
      ...config,
      x: lng2X(config.lng),
      y: lat2Y(config.lat),
    };
  }
  if ('x' in config) {
    return {
      ...config,
      lng: x2Lng(config.x),
      lat: y2Lat(config.y),
    };
  }
  throw new Error('创建Location错误，未传入位置信息');
}

/**
 * 创建FlowItem项，需要传入起终点的LocationItem
 * @param config
 * @param fromLocation
 * @param toLocation
 */
export function createFlowItem(
  config: Omit<FlowItem, 'fromId' | 'fromLng' | 'fromLat' | 'toId' | 'toLng' | 'toLat'>,
  fromLocation: Pick<LocationItem, 'id' | 'lng' | 'lat'>,
  toLocation: Pick<LocationItem, 'id' | 'lng' | 'lat'>
): FlowItem {
  return {
    ...config,
    fromId: fromLocation.id,
    fromLng: fromLocation.lng,
    fromLat: fromLocation.lat,
    toId: toLocation.id,
    toLng: toLocation.lng,
    toLat: toLocation.lat,
  };
}

/**
 * 根据传入OD数据初始化LocationItem和FlowItem的方法
 * @param data: od数据
 * @param fieldGetterOptions: 字段获取配置
 */
export function initOriginData(data: any[], fieldGetterOptions: FieldGetter): LocationFlow {
  // 当od数据长度为0时直接返回
  if (data.length === 0) {
    return {
      locations: [],
      flows: [],
    };
  }

  // 用于收集LocationItem和FlowItem，同时负责当前是否已保存相同经纬度的item项
  const locationMap = new Map<string, LocationItem>();
  const flowMap = new Map<string, FlowItem>();

  const {
    fromLng: fromLngGetter,
    fromLat: fromLatGetter,
    toLng: toLngGetter,
    toLat: toLatGetter,
    weight: weightGetter,
    fromId: fromIdGetter,
    toId: toIdGetter,
    id: idGetter,
  } = {
    ...DEFAULT_FIELD_GETTER_OPTIONS,
    ...fieldGetterOptions,
  } as FieldGetter;

  data.forEach((item, index) => {
    // 提取字段
    const fromLng = +getValueByGetter(item, index, fromLngGetter);
    const fromLat = +getValueByGetter(item, index, fromLatGetter);
    const toLng = +getValueByGetter(item, index, toLngGetter);
    const toLat = +getValueByGetter(item, index, toLatGetter);
    const weight = +getValueByGetter(item, index, weightGetter, 1);
    const fromId = fromIdGetter ? String(getValueByGetter(item, index, fromIdGetter)) : undefined;
    const toId = toIdGetter ? String(getValueByGetter(item, index, toIdGetter)) : undefined;
    const id = idGetter ? String(getValueByGetter(item, index, idGetter)) : undefined;

    // 判断必填字段是否有获取为undefined的情况
    if ([fromLng, fromLat, toLng, toLat, weight].some((item) => isNaN(item))) {
      console.error(`第${index + 1}项数据解析有误`);
      return;
    }

    // 循环处理起终点
    const [{ key: fromKey, location: fromLocation }, { key: toKey, location: toLocation }] = [
      [fromLng, fromLat, fromId],
      [toLng, toLat, toId],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    ].map(([lng, lat, id]: [number, number, string | undefined]) => {
      // 生成lnglat的key值
      const locationKey = getLocationLngLatKey(lng, lat);
      let targetLocation = locationMap.get(locationKey);

      // 判断当前locationMap中是否有相同起终点的LocationItem
      if (targetLocation) {
        // 若有则将当前od数据添加进改LocationItem中
        targetLocation.originData.push(item);
        targetLocation.weight += weight;
      } else {
        // 若无则创建新的locationItem
        targetLocation = createLocationItem({
          id: id ? id : createUuid(),
          lng,
          lat,
          childIds: [],
          isCluster: false,
          originData: [item],
          weight,
        });
        locationMap.set(locationKey, targetLocation);
      }
      return {
        key: locationKey,
        location: targetLocation,
      };
    });

    // 将起终点的key拼接成线路lnglat的key值
    const flowKey = `${fromKey}-${toKey}`;
    const targetFlow = flowMap.get(flowKey);
    if (targetFlow) {
      targetFlow.originData.push(item);
      targetFlow.weight += weight;
    } else {
      flowMap.set(
        flowKey,
        createFlowItem(
          {
            id: id ? id : createUuid(),
            childIds: [],
            isCluster: false,
            originData: [item],
            weight,
          },
          fromLocation,
          toLocation
        )
      );
    }
  });

  return {
    locations: Array.from(locationMap.values()),
    flows: Array.from(flowMap.values()),
  };
}
