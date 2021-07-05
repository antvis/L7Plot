import { LayerGroup } from '../../../../src/core/layer/layer-group';
import { IMapOptions, MapWrapper, PointMap, Source } from '../../../../src';
import { createDiv } from '../../../helper/dom';

describe('core map', () => {
  const pointMap = new PointMap(createDiv(), { autoFit: true, source: { data: [] }, shape: 'circle' });

  it('update', () => {
    pointMap.update({ shape: 'square' });

    expect(pointMap.options.shape).toEqual('square');
  });

  it('render', () => {
    pointMap.updateOption({ shape: 'circle' });
    pointMap.render();

    expect(pointMap.options.shape).toEqual('circle');
  });

  it('change data', () => {
    pointMap.pointLayer?.once('inited', () => {
      const data = [{ x: 129, y: 29 }];
      pointMap.changeData(data);
      expect(pointMap.source['originData']).toEqual(data);
      pointMap.destroy();
    });
  });
});

describe('custom map', () => {
  it('default-options', () => {
    type CustomMapOptions = IMapOptions;
    class CustomMap extends MapWrapper<CustomMapOptions> {
      type = 'custom';
      protected createInternalLayers(source: Source): LayerGroup {
        source;
        const layerGroup = new LayerGroup([]);
        return layerGroup;
      }
      protected updateInternalLayers(options: CustomMapOptions) {
        options;
      }
    }
    const customMap = new CustomMap(createDiv(), { source: { data: [] } });
    expect(MapWrapper.DefaultOptions).toEqual(CustomMap.DefaultOptions);

    customMap.destroy();
  });
});
