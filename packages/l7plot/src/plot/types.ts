import { LayerType, PlotType } from '../types';

import { Dot, DotOptions } from '../plots/dot';
import { DotDensity, DotDensityOptions } from '../plots/dot-density';
import { Heatmap, HeatmapOptions } from '../plots/heatmap';
import { Grid, GridOptions } from '../plots/grid';
import { Hexbin, HexbinOptions } from '../plots/hexbin';
import { Path, PathOptions } from '../plots/path';
import { Area, AreaOptions } from '../plots/area';
import { Choropleth, ChoroplethOptions } from '../plots/choropleth';

import { TextLayer, TextLayerOptions } from '../layers/text-layer';
import { DotLayer, DotLayerOptions } from '../layers/dot-layer';
import { IconLayer, IconLayerOptions } from '../layers/icon-layer';
import { ColumnLayer, ColumnLayerOptions } from '../layers/column-layer';
import { DotDensityLayer, DotDensityLayerOptions } from '../layers/dot-density-layer';
import { GridLayer, GridLayerOptions } from '../layers/grid-layer';
import { HexbinLayer, HexbinLayerOptions } from '../layers/hexbin-layer';
import { PathLayer, PathLayerOptions } from '../layers/path-layer';
import { ArcLayer, ArcLayerOptions } from '../layers/arc-layer';
import { HeatmapLayer, HeatmapLayerOptions } from '../layers/heatmap-layer';
import { AreaLayer, AreaLayerOptions } from '../layers/area-layer';
import { PrismLayer, PrismLayerOptions } from '../layers/prism-layer';

/**
 * 移除 Plot options 中不需要的配置
 */
type OmitPlotOptions<T> = Omit<
  T,
  'map' | 'width' | 'height' | 'antialias' | 'preserveDrawingBuffer' | 'logo' | 'theme' | 'zoom' | 'scale'
>;

/**
 * plots 类型
 */
export type PlotConfigType = { id?: string } & (
  | ({ type: 'dot' } & OmitPlotOptions<DotOptions>)
  | ({ type: 'dotDensity' } & OmitPlotOptions<DotDensityOptions>)
  | ({ type: 'heatmap' } & OmitPlotOptions<HeatmapOptions>)
  | ({ type: 'grid' } & OmitPlotOptions<GridOptions>)
  | ({ type: 'hexbin' } & OmitPlotOptions<HexbinOptions>)
  | ({ type: 'path' } & OmitPlotOptions<PathOptions>)
  | ({ type: 'area' } & OmitPlotOptions<AreaOptions>)
  | ({ type: 'choropleth' } & OmitPlotOptions<ChoroplethOptions>)
);

/**
 * plots 的 class
 */
export const PLOTS_MAP = {
  [PlotType.Dot]: Dot,
  [PlotType.DotDensity]: DotDensity,
  [PlotType.Heatmap]: Heatmap,
  [PlotType.Grid]: Grid,
  [PlotType.Hexbin]: Hexbin,
  [PlotType.Path]: Path,
  [PlotType.Area]: Area,
  [PlotType.Choropleth]: Choropleth,
};

/**
 * L7Plot 内置的 layers 类型
 */
export type LayerConfigType = { id?: string } & (
  | ({ type: 'textLayer' } & TextLayerOptions)
  | ({ type: 'dotLayer' } & DotLayerOptions)
  | ({ type: 'iconLayer' } & IconLayerOptions)
  | ({ type: 'dotDensity' } & DotDensityLayerOptions)
  | ({ type: 'columnLayer' } & ColumnLayerOptions)
  | ({ type: 'heatmapLayer' } & HeatmapLayerOptions)
  | ({ type: 'gridLayer' } & GridLayerOptions)
  | ({ type: 'hexbinLayer' } & HexbinLayerOptions)
  | ({ type: 'pathLayer' } & PathLayerOptions)
  | ({ type: 'arcLayer' } & ArcLayerOptions)
  | ({ type: 'areaLayer' } & AreaLayerOptions)
  | ({ type: 'prismLayer' } & PrismLayerOptions)
);

/**
 * L7Plot 内置的 layers 的 class
 */
export const LAYERS_MAP = {
  [LayerType.TextLayer]: TextLayer,
  [LayerType.DotLayer]: DotLayer,
  [LayerType.IconLayer]: IconLayer,
  [LayerType.DotDensity]: DotDensityLayer,
  [LayerType.ColumnLayer]: ColumnLayer,
  [LayerType.HeatmapLayer]: HeatmapLayer,
  [LayerType.GridLayer]: GridLayer,
  [LayerType.HexbinLayer]: HexbinLayer,
  [LayerType.PathLayer]: PathLayer,
  [LayerType.ArcLayer]: ArcLayer,
  [LayerType.AreaLayer]: AreaLayer,
  [LayerType.PrismLayer]: PrismLayer,
};
