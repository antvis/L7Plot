import { Plot } from '../../src/core/plot';
import { L7Plot } from '../../src/plot';
import { L7PlotOptions, PlotOptions } from '../../src/types';
import { createDiv } from './dom';

const mapConfig = {
  type: 'mapbox',
  token: 'pk.eyJ1IjoibGl1dmlnb25nenVvc2hpIiwiYSI6ImNrdW02cjU3ZjNvaHIyb3FsbGR2b2dja2MifQ.OLUdvRf2ZY3lhnJzBU9ToQ',
};

export const createPlot = <T extends Plot<any>, U extends PlotOptions>(PlotClass: any, options: U): T => {
  const plot = new PlotClass(createDiv(), Object.assign({ map: mapConfig }, options));
  return plot;
};

export const createL7Plot = (options: L7PlotOptions) => {
  const l7plot = new L7Plot(createDiv(), Object.assign({ map: mapConfig }, options));
  return l7plot;
};
