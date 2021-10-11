import { createDiv } from './dom';
import { Plot } from '../../src/core/plot';
import { IL7PlotOptions, IPlotOptions } from '../../src/types';
import { L7Plot } from '../../src/plot';

const mapConfig = {
  type: 'mapbox',
  token: 'pk.eyJ1IjoibGl1dmlnb25nenVvc2hpIiwiYSI6ImNrdW02cjU3ZjNvaHIyb3FsbGR2b2dja2MifQ.OLUdvRf2ZY3lhnJzBU9ToQ',
};

export const createPlot = <T extends Plot<any>, U extends IPlotOptions>(PlotClass: any, options: U): T => {
  const plot = new PlotClass(createDiv(), Object.assign({ map: mapConfig }, options));
  return plot;
};

export const createL7Plot = (options: IL7PlotOptions) => {
  const l7plot = new L7Plot(createDiv(), Object.assign({ map: mapConfig }, options));
  return l7plot;
};
