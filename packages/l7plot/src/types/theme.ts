export interface IStyleSheet {
  /** 底图样式 */
  mapStyle?: string;
  /** 主题色 */
  brandColor?: string;
  /** 辅助色 */
  subColor?: string;
  /** 分类色板 1，在数据量小于等于 10 时使用 */
  paletteQualitative10?: string[];
  /** 分类色板 2，在数据量大于 10 时使用 */
  paletteQualitative20?: string[];
  /** 语义色 */
  paletteSemanticRed?: string;
  /** 语义色 */
  paletteSemanticGreen?: string;
  /** 语义色 */
  paletteSemanticYellow?: string;
  /** (单色)顺序色板 */
  paletteSequence?: string[];
  /** 字体 */
  fontFamily?: string;

  // -------------------- 图例 --------------------
  /** 图例标题颜色 */
  legendTitleTextFillColor?: string;
  /** 图例标题文本字体大小 */
  legendTitleTextFontSize?: number;
  /** 图例标题文本行高 */
  legendTitleTextLineHeight?: number;
  /** 图例标题文本字体粗细 */
  legendTitleTextFontWeight?: number | string;

  /** 图例 marker 颜色 */
  legendMarkerColor?: string;
  /** 图例 marker 距离图例文本的间距 */
  legendMarkerSpacing?: number;
  /** 图例 marker 默认半径大小 */
  legendMarkerSize?: number;
  /** 图例 'circle' marker 半径 */
  legendCircleMarkerSize?: number;
  /** 图例 'square' marker 半径 */
  legendSquareMarkerSize?: number;
  /** 图例 'line' marker 半径 */
  legendLineMarkerSize?: number;

  /** 图例项文本颜色 */
  legendItemNameFillColor?: string;
  /** 图例项文本字体大小 */
  legendItemNameFontSize?: number;
  /** 图例项文本行高 */
  legendItemNameLineHeight?: number;
  /** 图例项粗细 */
  legendItemNameFontWeight?: number | string;
  /** 图例项之间的水平间距 */
  legendItemSpacing?: number;
  /** 图例项垂直方向的间隔 */
  legendItemMarginBottom?: number;
  /** 图例与图表绘图区域的偏移距离  */
  legendPadding?: number[];
  /** 水平布局的图例与绘图区域偏移距离 */
  legendHorizontalPadding?: number[];
  /** 垂直布局的图例与绘图区域偏移距离 */
  legendVerticalPadding?: number[];

  /** 图例分页器 marker 大小 */
  legendPageNavigatorMarkerSize: number;
  /** 图例分页器 marker 非激活状态填充色 */
  legendPageNavigatorMarkerInactiveFillColor: string;
  /** 图例分页器 marker 非激活状态填充色透明度 */
  legendPageNavigatorMarkerInactiveFillOpacity: number;
  /** 图例分页器 marker 填充色 */
  legendPageNavigatorMarkerFillColor: string;
  /** 图例分页器 marker 填充色透明度 */
  legendPageNavigatorMarkerFillOpacity: number;
  /** 图例分页器文本颜色 */
  legendPageNavigatorTextFillColor: string;
  /** 图例分页器文本字体大小 */
  legendPageNavigatorTextFontSize: number;

  // -------------------- Tooltip --------------------

  /** tooltip 内容框背景色 */
  tooltipContainerFillColor?: string;
  /** tooltip 内容框背景透明度 */
  tooltipContainerFillOpacity?: number;
  /** tooltip 内容框阴影 */
  tooltipContainerShadow?: string;
  /** tooltip 内容框圆角 */
  tooltipContainerBorderRadius?: number;

  /** tooltip 文本颜色 */
  tooltipTextFillColor?: string;
  /** tooltip 文本字体大小 */
  tooltipTextFontSize?: number;
  /** tooltip 文本行高 */
  tooltipTextLineHeight?: number;
  /** tooltip 文本字体粗细 */
  tooltipTextFontWeight?: number | string;

  // -------------------- Geometry labels --------------------
  /** Geometry label 文本颜色 */
  labelFillColor?: string;
  /** Geometry label 暗色文本颜色 */
  labelFillColorDark?: string;
  /** Geometry label 亮色文本颜色 */
  labelFillColorLight?: string;
  /** Geometry label 文本字体大小 */
  labelFontSize?: number;
  /** Geometry label 文本行高 */
  labelLineHeight?: number;
  /** Geometry label 文本字体粗细 */
  labelFontWeight?: number | string;
  /** Geometry label 文本描边颜色 */
  // labelBorderColor?: string;
  /** Geometry label 文本描边粗细 */
  labelBorder?: number;

  /** Geometry innerLabel 文本颜色 */
  innerLabelFillColor?: string;
  /** Geometry innerLabel 文本字体大小 */
  innerLabelFontSize?: number;
  /** Geometry innerLabel 文本行高 */
  innerLabelLineHeight?: number;
  /** Geometry innerLabel 文本字体粗细 */
  innerLabelFontWeight?: number | string;
  /** Geometry innerLabel 文本描边颜色 */
  // innerLabelBorderColor?: string;
  /** Geometry innerLabel 文本描边粗细 */
  innerLabelBorder?: number;

  /** Geometry overflowLabel 文本颜色 */
  overflowLabelFillColor?: string;
  /** Geometry overflowLabel 暗色文本颜色 */
  overflowLabelFillColorDark?: string;
  /** Geometry overflowLabel 亮色文本颜色 */
  overflowLabelFillColorLight?: string;
  /** Geometry overflowLabel 文本字体大小 */
  overflowLabelFontSize?: number;
  /** Geometry overflowLabel 文本行高 */
  overflowLabelLineHeight?: number;
  /** Geometry overflowLabel 文本字体粗细 */
  overflowLabelFontWeight?: number | string;
  /** Geometry overflowLabel 文本描边颜色 */
  overflowLabelBorderColor?: string;
  /** Geometry overflowLabel 文本描边粗细 */
  overflowLabelBorder?: number;

  // -------------------- Geometry 图形样式--------------------
  /** 点图的大小范围 */
  pointSizeRange?: [number, number];
  /** 点图填充颜色 */
  pointFillColor?: string;
  /** 点图填充颜色透明度 */
  pointFillOpacity?: number;
  /** 点图大小 */
  pointSize?: number;
  /** 点图描边粗细 */
  pointBorder?: number;
  /** 点图描边颜色 */
  pointBorderColor?: string;
  /** 点图描边透明度 */
  pointBorderOpacity?: number;

  /** 点图 active 状态下填充颜色 */
  pointActiveFillColor?: string;
  /** 点图 active 状态下填充颜色透明度 */
  pointActiveFillOpacity?: number;
  /** 点图 active 状态下大小 */
  pointActiveSize?: number;
  /** 点图 active 状态下描边粗细 */
  pointActiveBorder?: number;
  /** 点图 active 状态下描边颜色 */
  pointActiveBorderColor?: string;
  /** 点图 active 状态下描边透明度 */
  pointActiveBorderOpacity?: number;

  /** 点图 selected 状态下填充颜色 */
  pointSelectedFillColor?: string;
  /** 点图 selected 状态下填充颜色透明度 */
  pointSelectedFillOpacity?: number;
  /** 点图 selected 状态下大小 */
  pointSelectedSize?: number;
  /** 点图 selected 状态下描边粗细 */
  pointSelectedBorder?: number;
  /** 点图 selected 状态下描边颜色 */
  pointSelectedBorderColor?: string;
  /** 点图 selected 状态下描边透明度 */
  pointSelectedBorderOpacity?: number;

  /** 点图 inactive 状态下填充颜色 */
  pointInactiveFillColor?: string;
  /** 点图 inactive 状态下填充颜色透明度 */
  pointInactiveFillOpacity?: number;
  /** 点图 inactive 状态下大小 */
  pointInactiveSize?: number;
  /** 点图 inactive 状态下描边粗细 */
  pointInactiveBorder?: number;
  /** 点图 inactive 状态下描边颜色 */
  pointInactiveBorderColor?: string;
  /** 点图 inactive 状态下描边透明度 */
  pointInactiveBorderOpacity?: number;

  /** 描边点图大小 */
  hollowPointSize?: number;
  /** 描边点图描边粗细 */
  hollowPointBorder?: number;
  /** 描边点图描边颜色 */
  hollowPointBorderColor?: string;
  /** 描边点图描边透明度 */
  hollowPointBorderOpacity?: number;
  /** 描边点图填充颜色 */
  hollowPointFillColor?: string;
  /** 描边点图填充透明度 */
  hollowPointFillOpacity?: number;

  /** 点 描边 active 状态下大小 */
  hollowPointActiveSize?: number;
  /** 点 描边 active 状态下描边粗细 */
  hollowPointActiveBorder?: number;
  /** 点 描边 active 状态下描边颜色 */
  hollowPointActiveBorderColor?: string;
  /** 点 描边 active 状态下描边透明度 */
  hollowPointActiveBorderOpacity?: number;

  /** 点 描边 selected 状态下大小 */
  hollowPointSelectedSize?: number;
  /** 点 描边 selected 状态下描边粗细 */
  hollowPointSelectedBorder?: number;
  /** 点 描边 selected 状态下描边颜色 */
  hollowPointSelectedBorderColor?: string;
  /** 点 描边 selected 状态下描边透明度 */
  hollowPointSelectedBorderOpacity?: number;

  /** 点 描边 inactive 状态下大小 */
  hollowPointInactiveSize?: number;
  /** 点 描边 inactive 状态下描边粗细 */
  hollowPointInactiveBorder?: number;
  /** 点 描边 inactive 状态下描边颜色 */
  hollowPointInactiveBorderColor?: string;
  /** 点 描边 inactive 状态下描边透明度 */
  hollowPointInactiveBorderOpacity?: number;

  /** 线图粗细 */
  lineBorder?: number;
  /** 线图颜色 */
  lineBorderColor?: string;
  /** 线图透明度 */
  lineBorderOpacity?: number;

  /** 线图 active 状态下粗细 */
  lineActiveBorder?: number;
  /** 线图 active 状态下颜色 */
  lineActiveBorderColor?: string;
  /** 线图 active 状态下透明度 */
  lineActiveBorderOpacity?: number;

  /** 线图 selected 状态下粗细 */
  lineSelectedBorder?: number;
  /** 线图 selected 状态下颜色 */
  lineSelectedBorderColor?: string;
  /** 线图 selected 状态下透明度 */
  lineSelectedBorderOpacity?: number;

  /** 线图 inactive 状态下粗细 */
  lineInactiveBorder?: number;
  /** 线图 inactive 状态下颜色 */
  lineInactiveBorderColor?: string;
  /** 线图 inactive 状态下透明度 */
  lineInactiveBorderOpacity?: number;

  areaBorder?: number;
  /** area 边框颜色 */
  areaBorderColor?: string;
  /** area 边框透明度 */
  areaBorderOpacity?: number;
  /** area 填充颜色 */
  areaFillColor?: string;
  /** area 填充透明度 */
  areaFillOpacity?: number;

  /** area Active 状态下边框粗细 */
  areaActiveBorder?: number;
  /** area Active 状态下边框颜色 */
  areaActiveBorderColor?: string;
  /** area Active 状态下边框透明度 */
  areaActiveBorderOpacity?: number;
  /** area Active 状态下填充颜色 */
  areaActiveFillColor?: string;
  /** area Active 状态下填充透明度 */
  areaActiveFillOpacity?: number;

  /** area selected 状态下边框粗细 */
  areaSelectedBorder?: number;
  /** area selected 状态下边框颜色 */
  areaSelectedBorderColor?: string;
  /** area selected 状态下边框透明度 */
  areaSelectedBorderOpacity?: number;
  /** area selected 状态下填充颜色 */
  areaSelectedFillColor?: string;
  /** area selected 状态下填充透明度 */
  areaSelectedFillOpacity?: number;

  /** area inactive 状态下边框粗细 */
  areaInactiveBorder?: number;
  /** area inactive 状态下边框颜色 */
  areaInactiveBorderColor?: string;
  /** area inactive 状态下边框透明度 */
  areaInactiveBorderOpacity?: number;
  /** area inactive 状态下填充颜色 */
  areaInactiveFillColor?: string;
  /** area inactive 状态下填充透明度 */
  areaInactiveFillOpacity?: number;

  /** hollowArea 边框粗细 */
  hollowAreaBorder?: number;
  /** hollowArea 边框颜色 */
  hollowAreaBorderColor?: string;
  /** hollowArea 边框透明度 */
  hollowAreaBorderOpacity?: number;

  /** hollowArea Active 状态下边框粗细 */
  hollowAreaActiveBorder?: number;
  /** hollowArea Active 状态下边框颜色 */
  hollowAreaActiveBorderColor?: string;
  /** hollowArea Active 状态下边框透明度 */
  hollowAreaActiveBorderOpacity?: number;

  /** hollowArea selected 状态下边框粗细 */
  hollowAreaSelectedBorder?: number;
  /** hollowArea selected 状态下边框颜色 */
  hollowAreaSelectedBorderColor?: string;
  /** hollowArea selected 状态下边框透明度 */
  hollowAreaSelectedBorderOpacity?: number;

  /** hollowArea inactive 状态下边框粗细 */
  hollowAreaInactiveBorder?: number;
  /** hollowArea inactive 状态下边框颜色 */
  hollowAreaInactiveBorderColor?: string;
  /** hollowArea inactive 状态下边框透明度 */
  hollowAreaInactiveBorderOpacity?: number;

  /** interval 边框粗细 */
  intervalBorder?: number;
  /** interval 边框颜色 */
  intervalBorderColor?: string;
  /** interval 边框透明度 */
  intervalBorderOpacity?: number;
  /** interval 填充颜色 */
  intervalFillColor?: string;
  /** interval 填充透明度 */
  intervalFillOpacity?: number;

  /** interval active 状态下边框粗细 */
  intervalActiveBorder?: number;
  /** interval active 状态下边框颜色 */
  intervalActiveBorderColor?: string;
  /** interval active 状态下边框透明度 */
  intervalActiveBorderOpacity?: number;
  /** interval active 状态下填充颜色 */
  intervalActiveFillColor?: string;
  /** interval active 状态下填充透明度 */
  intervalActiveFillOpacity?: number;

  /** interval selected 状态下边框粗细 */
  intervalSelectedBorder?: number;
  /** interval selected 状态下边框颜色 */
  intervalSelectedBorderColor?: string;
  /** interval selected 状态下边框透明度 */
  intervalSelectedBorderOpacity?: number;
  /** interval selected 状态下填充颜色 */
  intervalSelectedFillColor?: string;
  /** interval selected 状态下填充透明度 */
  intervalSelectedFillOpacity?: number;

  /** interval inactive 状态下边框粗细 */
  intervalInactiveBorder?: number;
  /** interval inactive 状态下边框颜色 */
  intervalInactiveBorderColor?: string;
  /** interval inactive 状态下边框透明度 */
  intervalInactiveBorderOpacity?: number;
  /** interval inactive 状态下填充颜色 */
  intervalInactiveFillColor?: string;
  /** interval inactive 状态下填充透明度 */
  intervalInactiveFillOpacity?: number;

  /** hollowInterval 边框粗细 */
  hollowIntervalBorder?: number;
  /** hollowInterval 边框颜色 */
  hollowIntervalBorderColor?: string;
  /** hollowInterval 边框透明度 */
  hollowIntervalBorderOpacity?: number;
  /** hollowInterval 填充颜色 */
  hollowIntervalFillColor?: string;
  /** hollowInterval 填充透明度 */
  hollowIntervalFillOpacity?: number;

  /** hollowInterval active 状态下边框粗细 */
  hollowIntervalActiveBorder?: number;
  /** hollowInterval active 状态下边框颜色 */
  hollowIntervalActiveBorderColor?: string;
  /** hollowInterval active 状态下边框透明度 */
  hollowIntervalActiveBorderOpacity?: number;

  /** hollowInterval selected 状态下边框粗细 */
  hollowIntervalSelectedBorder?: number;
  /** hollowInterval selected 状态下边框颜色 */
  hollowIntervalSelectedBorderColor?: string;
  /** hollowInterval selected 状态下边框透明度 */
  hollowIntervalSelectedBorderOpacity?: number;

  /** hollowInterval inactive 状态下边框粗细 */
  hollowIntervalInactiveBorder?: number;
  /** hollowInterval inactive 状态下边框颜色 */
  hollowIntervalInactiveBorderColor?: string;
  /** hollowInterval inactive 状态下边框透明度 */
  hollowIntervalInactiveBorderOpacity?: number;
}

/** createTheme 主题样式表配置 */
export type StyleSheetCfg = Pick<
  IStyleSheet,
  | 'mapStyle'
  | 'subColor'
  | 'brandColor'
  | 'paletteQualitative10'
  | 'paletteQualitative20'
  | 'paletteSemanticRed'
  | 'paletteSemanticGreen'
  | 'paletteSemanticYellow'
  | 'paletteSequence'
  | 'fontFamily'
>;
