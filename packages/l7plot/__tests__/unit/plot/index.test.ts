import { L7Plot } from '../../../src/plot';
import { createDiv } from '../../helper/dom';
import data from '../../data-set/point-temperature.json';

describe('L7Plot', () => {
  const l7Plot = new L7Plot(createDiv(), {
    source: {
      data: data.list,
      parser: { type: 'json', x: 'j', y: 'w' },
    },
    plots: [],
    layers: [],
  });

  it('l7Plot', () => {
    expect(l7Plot).toBeDefined();
  });
});
