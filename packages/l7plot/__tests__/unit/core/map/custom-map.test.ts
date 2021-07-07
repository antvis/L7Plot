import { LayerGroup } from '../../../../src/core/layer/layer-group';
import { IMapOptions, MapWrapper, Source } from '../../../../src';
import { createDiv } from '../../../helper/dom';

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
    const customMap = new CustomMap(createDiv(), { source: { data: [], parser: { type: 'json', x: 'x', y: 'y' } } });
    expect(MapWrapper.DefaultOptions).toEqual(CustomMap.DefaultOptions);

    customMap.on('loaded', () => setTimeout(() => customMap.destroy(), 0));
  });
});
