import { createL7Plot } from '../../helper/plot';
// import data from '../../data-set/point-temperature.json';

describe('L7Plot', () => {
  const l7Plot = createL7Plot({
    plots: [],
    layers: [],
  });

  it('l7Plot', () => {
    expect(l7Plot).toBeDefined();
  });
});
