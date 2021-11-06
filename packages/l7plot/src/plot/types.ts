import { LayerType, PlotType } from '../types';
import { Dot, DotOptions } from '../plots/dot';
import { DotDensity, DotDensityOptions } from '../plots/dot-density';
import { Heatmap, HeatmapOptions } from '../plots/heatmap';
import { Grid, GridOptions } from '../plots/grid';
import { Hexagon, HexagonOptions } from '../plots/hexagon';
import { Area, AreaOptions } from '../plots/area';
import { AreaLayer, AreaLayerOptions } from '../layers/area-layer';
import { ColumnLayer, ColumnLayerOptions } from '../layers/column-layer';
import { DotDensityLayer, DotDensityLayerOptions } from '../layers/dot-density-layer';
import { DotLayer, DotLayerOptions } from '../layers/dot-layer';
import { GridLayer, GridLayerOptions } from '../layers/grid-layer';
import { HexagonLayer, HexagonLayerOptions } from '../layers/hexagon-layer';
import { LinesLayer, LinesLayerOptions } from '../layers/lines-layer';
import { TextLayer, TextLayerOptions } from '../layers/text-layer';
import { HeatmapLayer, HeatmapLayerOptions } from '../layers/heatmap-layer';
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
export type PlotConfigType =
  | ({ type: 'dot' } & OmitPlotOptions<DotOptions>)
  | ({ type: 'dotDensity' } & OmitPlotOptions<DotDensityOptions>)
  | ({ type: 'heatmap' } & OmitPlotOptions<HeatmapOptions>)
  | ({ type: 'grid' } & OmitPlotOptions<GridOptions>)
  | ({ type: 'hexagon' } & OmitPlotOptions<HexagonOptions>)
  | ({ type: 'area' } & OmitPlotOptions<AreaOptions>);

/**
 * plots 的 class
 */
export const PLOTS_MAP = {
  [PlotType.Dot]: Dot,
  [PlotType.DotDensity]: DotDensity,
  [PlotType.Heatmap]: Heatmap,
  [PlotType.Grid]: Grid,
  [PlotType.Hexagon]: Hexagon,
  [PlotType.Area]: Area,
};

/**
 * L7Plot 内置的 layers 类型
 */
export type LayerConfigType =
  | ({ type: 'textLayer' } & TextLayerOptions)
  | ({ type: 'dotLayer' } & DotLayerOptions)
  | ({ type: 'dotDensity' } & DotDensityLayerOptions)
  | ({ type: 'columnLayer' } & ColumnLayerOptions)
  | ({ type: 'heatmapLayer' } & HeatmapLayerOptions)
  | ({ type: 'gridLayer' } & GridLayerOptions)
  | ({ type: 'hexagonLayer' } & HexagonLayerOptions)
  | ({ type: 'lineLayer' } & LinesLayerOptions)
  | ({ type: 'areaLayer' } & AreaLayerOptions)
  | ({ type: 'prismLayer' } & PrismLayerOptions);

/**
 * L7Plot 内置的 layers 的 class
 */
export const LAYERS_MAP = {
  [LayerType.TextLayer]: TextLayer,
  [LayerType.DotLayer]: DotLayer,
  [LayerType.DotDensity]: DotDensityLayer,
  [LayerType.ColumnLayer]: ColumnLayer,
  [LayerType.HeatmapLayer]: HeatmapLayer,
  [LayerType.GridLayer]: GridLayer,
  [LayerType.HexagonLayer]: HexagonLayer,
  [LayerType.LinesLayer]: LinesLayer,
  [LayerType.AreaLayer]: AreaLayer,
  [LayerType.PrismLayer]: PrismLayer,
};
