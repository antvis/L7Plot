import { LayerGroup } from '../../../../src/core/layer/layer-group';
import { IPlotOptions, Plot, Source } from '../../../../src';
import { createPlot } from '../../../helper/plot';

describe('custom plot', () => {
  it('default-options', () => {
    type CustomPlotOptions = IPlotOptions;
    class CustomPlot extends Plot<CustomPlotOptions> {
      type = 'custom';
      protected interactionLayers = [];
      protected createLayers(source: Source): LayerGroup {
        source;
        const layerGroup = new LayerGroup([]);
        return layerGroup;
      }
      protected updateLayers(options: CustomPlotOptions) {
        options;
      }
    }

    const customMap = createPlot<CustomPlot, CustomPlotOptions>(CustomPlot, {
      source: { data: [], parser: { type: 'json', x: 'x', y: 'y' } },
    });
    expect(Plot.DefaultOptions).toEqual(CustomPlot.DefaultOptions);

    customMap.on('loaded', () => setTimeout(() => customMap.destroy(), 0));
  });
});
