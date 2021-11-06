export type StyleSheet = {
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
  /** 图例内容框背景色 */
  legendContainerFillColor?: string;
  /** 图例内容框阴影 */
  legendContainerShadow?: string;
  /** 图例内容框圆角 */
  legendContainerBorderRadius?: number;

  /** 图例颜色 */
  legendTextFillColor?: string;
  /** 图例文本字体大小 */
  legendTextFontSize?: number;
  /** 图例文本行高 */
  legendTextLineHeight?: string;

  // -------------------- Tooltip --------------------

  /** tooltip 内容框背景色 */
  tooltipContainerFillColor?: string;
  /** tooltip 内容框阴影 */
  tooltipContainerShadow?: string;
  /** tooltip 内容框圆角 */
  tooltipContainerBorderRadius?: number;

  /** tooltip 文本颜色 */
  tooltipTextFillColor?: string;
  /** tooltip 数据项名称颜色 */
  tooltipItemNameFillColor?: string;
  /** tooltip 数据项数据颜色 */
  tooltipItemValueFillColor?: string;
  /** tooltip 文本字体大小 */
  tooltipTextFontSize?: number;
  /** tooltip 文本行高 */
  tooltipTextLineHeight?: string;

  // --------------------labels --------------------
  /** label 文本颜色 */
  labelFillColor?: string;
  /** label 暗色文本颜色 */
  labelFillColorDark?: string;
  /** label 亮色文本颜色 */
  labelFillColorLight?: string;
  /** label 文本字体大小 */
  labelFontSize?: number;
  /** label 文本字体粗细 */
  labelFontWeight?: number | string;

  // --------------------图形样式--------------------
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

  /** 点图 active 状态下填充颜色 */
  pointActiveFillColor?: string;

  /** 点图 selected 状态下填充颜色 */
  pointSelectedFillColor?: string;
};

/** createTheme 主题样式表配置 */
export type StyleSheetCfg = Pick<
  StyleSheet,
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
