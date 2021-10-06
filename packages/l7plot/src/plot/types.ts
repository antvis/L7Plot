import { LayerType, MapType } from '../types';
import { Dot, DotOptions } from '../plots/dot';
import { DotDensity, DotDensityOptions } from '../plots/dot-density';
import { Heatmap, HeatmapOptions } from '../plots/heatmap';
import { Grid, GridOptions } from '../plots/grid';
import { Hexagon, HexagonOptions } from '../plots/hexagon';
import { Choropleth, ChoroplethOptions } from '../plots/choropleth';
import { AreaLayer, IAreaLayerOptions } from '../layers/area-layer';
import { ColumnLayer, IColumnLayerOptions } from '../layers/column-layer';
import { IDotDensityLayerOptions } from '../layers/dot-density-layer';
import { DotLayer, IDotLayerOptions } from '../layers/dot-layer';
import { GridLayer, IGridLayerOptions } from '../layers/grid-layer';
import { HexagonLayer, IHexagonLayerOptions } from '../layers/hexagon-layer';
import { ILinesLayerOptions, LinesLayer } from '../layers/lines-layer';
import { ITextLayerOptions, TextLayer } from '../layers/text-layer';
import { HeatmapLayer, IHeatmapLayerOptions } from '../layers/heatmap-layer';
import { IPrismLayerOptions, PrismLayer } from '../layers/prism-layer';

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
  | ({ type: 'choropleth' } & OmitPlotOptions<ChoroplethOptions>);

/**
 * plots 的 class
 */
export const PLOTS_MAP = {
  [MapType.Dot]: Dot,
  [MapType.DotDensity]: DotDensity,
  [MapType.Heatmap]: Heatmap,
  [MapType.Grid]: Grid,
  [MapType.Hexagon]: Hexagon,
  [MapType.Choropleth]: Choropleth,
};

/**
 * L7Plot 内置的 layers 类型
 */
export type LayerConfigType =
  | ({ type: 'textLayer' } & ITextLayerOptions)
  | ({ type: 'dotLayer' } & IDotLayerOptions)
  | ({ type: 'dotDensity' } & IDotDensityLayerOptions)
  | ({ type: 'columnLayer' } & IColumnLayerOptions)
  | ({ type: 'heatmapLayer' } & IHeatmapLayerOptions)
  | ({ type: 'gridLayer' } & IGridLayerOptions)
  | ({ type: 'hexagonLayer' } & IHexagonLayerOptions)
  | ({ type: 'lineLayer' } & ILinesLayerOptions)
  | ({ type: 'areaLayer' } & IAreaLayerOptions)
  | ({ type: 'prismLayer' } & IPrismLayerOptions);

/**
 * L7Plot 内置的 layers 的 class
 */
export const LAYERS_MAP = {
  [LayerType.TextLayer]: TextLayer,
  [LayerType.DotLayer]: DotLayer,
  [LayerType.ColumnLayer]: ColumnLayer,
  [LayerType.HeatmapLayer]: HeatmapLayer,
  [LayerType.GridLayer]: GridLayer,
  [LayerType.HexagonLayer]: HexagonLayer,
  [LayerType.LinesLayer]: LinesLayer,
  [LayerType.AreaLayer]: AreaLayer,
  [LayerType.PrismLayer]: PrismLayer,
};
