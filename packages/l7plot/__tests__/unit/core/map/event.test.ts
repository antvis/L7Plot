import { Map, PlotOptions } from '../../../../src';
import { createPlot } from '../../../helper/plot';

describe('event listener', () => {
  const map = createPlot(Map, {} as PlotOptions);
  it('once', () => {
    map.once('onceLoaded', function () {
      console.log('onceLoaded');
    });

    expect(map.getEvents()['onceLoaded'][0].once).toBeTruthy();
  });

  it('on', () => {
    const map = createPlot(Map, {} as PlotOptions);

    map.on('onLoaded', function () {
      console.log('onLoaded');
    });

    expect(map.getEvents()['onLoaded'][0].once).toBeFalsy();
  });

  setTimeout(() => map.destroy(), 0);
});
