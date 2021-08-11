import { LayerGroup } from '../../../../src/core/layer/layer-group';
import { IMapOptions, Map, Source } from '../../../../src';
import { createDiv } from '../../../helper/dom';

describe('custom map', () => {
  it('default-options', () => {
    type CustomMapOptions = IMapOptions;
    class CustomMap extends Map<CustomMapOptions> {
      type = 'custom';
      protected interactionLayers = [];
      protected createLayers(source: Source): LayerGroup {
        source;
        const layerGroup = new LayerGroup([]);
        return layerGroup;
      }
      protected updateLayers(options: CustomMapOptions) {
        options;
      }
    }
    const customMap = new CustomMap(createDiv(), { source: { data: [], parser: { type: 'json', x: 'x', y: 'y' } } });
    expect(Map.DefaultOptions).toEqual(CustomMap.DefaultOptions);

    customMap.on('loaded', () => setTimeout(() => customMap.destroy(), 0));
  });
});
