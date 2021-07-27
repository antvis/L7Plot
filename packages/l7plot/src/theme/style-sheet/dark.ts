import { IStyleSheet, StyleSheetCfg } from '../../types';

const WHITE_COLORS = {
  100: '#000',
  95: '#0D0D0D',
  85: '#262626',
  65: '#595959',
  45: '#8C8C8C',
  25: '#BFBFBF',
  15: '#D9D9D9',
  6: '#F0F0F0',
};

const BLACK_COLORS = {
  100: '#FFFFFF',
  95: '#F2F2F2',
  85: '#D9D9D9',
  65: '#A6A6A6',
  45: '#737373',
  25: '#404040',
  15: '#262626',
  6: '#0F0F0F',
};

const QUALITATIVE_10 = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E86452',
  '#6DC8EC',
  '#945FB9',
  '#FF9845',
  '#1E9493',
  '#FF99C3',
];

const QUALITATIVE_20 = [
  '#5B8FF9',
  '#CDDDFD',
  '#5AD8A6',
  '#CDF3E4',
  '#5D7092',
  '#CED4DE',
  '#F6BD16',
  '#FCEBB9',
  '#E86452',
  '#F8D0CB',
  '#6DC8EC',
  '#D3EEF9',
  '#945FB9',
  '#DECFEA',
  '#FF9845',
  '#FFE0C7',
  '#1E9493',
  '#BBDEDE',
  '#FF99C3',
  '#FFE0ED',
];

/** 单色顺序色板 */
const SINGLE_SEQUENCE = [
  '#B8E1FF',
  '#9AC5FF',
  '#7DAAFF',
  '#5B8FF9',
  '#3D76DD',
  '#085EC0',
  '#0047A5',
  '#00318A',
  '#001D70',
];

export const createDarkStyleSheet: (cfg?: StyleSheetCfg) => IStyleSheet = (cfg: StyleSheetCfg = {}) => {
  const {
    mapStyle = 'dark',
    subColor = 'rgba(255,255,255,0.05)',
    paletteQualitative10 = QUALITATIVE_10,
    paletteQualitative20 = QUALITATIVE_20,
    paletteSemanticRed = '#F4664A',
    paletteSemanticGreen = '#30BF78',
    paletteSemanticYellow = '#FAAD14',
    paletteSequence = SINGLE_SEQUENCE,
    fontFamily = `"-apple-system", "Segoe UI", Roboto, "Helvetica Neue", Arial,
    "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji"`,
  } = cfg;
  const { brandColor = paletteQualitative10[0] } = cfg;

  return {
    /** 底图样式 */
    mapStyle,
    /** 主题色 */
    brandColor,
    /** 图表辅助色 */
    subColor,
    /** 分类色板 1，在数据量小于等于 10 时使用 */
    paletteQualitative10,
    /** 分类色板 2，在数据量大于 10 时使用 */
    paletteQualitative20,
    /** 语义色 */
    paletteSemanticRed,
    /** 语义色 */
    paletteSemanticGreen,
    /** 语义色 */
    paletteSemanticYellow,
    /** (单色)顺序色板 */
    paletteSequence,
    /** 字体 */
    fontFamily,

    // -------------------- 图例 --------------------
    /** 图例内容框背景色 */
    legendContainerFillColor: 'rgba(31, 31, 31, 0.9)',
    /** 图例内容框阴影 */
    legendContainerShadow: '0px 2px 4px rgba(0,0,0,.5)',
    /** 图例内容框圆角 */
    legendContainerBorderRadius: 2,

    /** 图例文本颜色 */
    legendTextFillColor: BLACK_COLORS[65],
    /** 图例文本字体大小 */
    legendTextFontSize: 12,
    /** 图例文本行高 */
    legendTextLineHeight: '1',

    // -------------------- Tooltip --------------------
    /** tooltip 内容框背景色 */
    tooltipContainerFillColor: 'rgba(31, 31, 31, 0.9)',
    /** tooltip 内容框阴影 */
    tooltipContainerShadow: '0px 2px 4px rgba(0,0,0,.5)',
    /** tooltip 内容框圆角 */
    tooltipContainerBorderRadius: 2,

    /** tooltip 文本颜色 */
    tooltipTextFillColor: BLACK_COLORS[65],
    /** tooltip 文本字体大小 */
    tooltipTextFontSize: 12,
    /** tooltip 文本行高 */
    tooltipTextLineHeight: '20px',

    // -------------------- label --------------------
    /** label 文本颜色 */
    labelFillColor: BLACK_COLORS[65],
    labelFillColorDark: '#2c3542',
    labelFillColorLight: '#ffffff',
    /** label 文本字体大小 */
    labelFontSize: 12,

    // -------------------- 图形样式 --------------------
    /** 点图填充颜色 */
    pointFillColor: QUALITATIVE_10[0],
    /** 点图填充颜色透明度 */
    pointFillOpacity: 0.95,
    /** 点图大小 */
    pointSize: 4,
    /** 点图描边粗细 */
    pointBorder: 1,
    /** 点图描边颜色 */
    pointBorderColor: WHITE_COLORS[100],

    /** 点图 active 状态下描边颜色 */
    pointActiveBorderColor: BLACK_COLORS[100],

    /** 点图 selected 状态下描边颜色 */
    pointSelectedBorderColor: BLACK_COLORS[100],
  };
};

export const dark = createDarkStyleSheet();
