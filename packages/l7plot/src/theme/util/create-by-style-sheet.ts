import * as TOOLTIP_CSS_CONST from '@antv/l7plot-component/dist/lib/tooltip/constants';
import * as CATEGORY_LEGEND_CSS_CONST from '@antv/l7plot-component/dist/lib/legend/category/constants';
import * as CONTINUE_LEGEND_CSS_CONST from '@antv/l7plot-component/dist/lib/legend/continue/constants';
import { StyleSheet } from '../../types';

/**
 * 根据主题样式表生成主题结构
 * @param styleSheet 主题样式表
 */
export function createThemeByStyleSheet(styleSheet: StyleSheet): Record<string, any> {
  const shapeStyles = {
    point: {
      default: {
        fill: styleSheet.pointFillColor,
        size: styleSheet.pointSize,
        stroke: styleSheet.pointBorderColor,
        lineWidth: styleSheet.pointBorder,
        fillOpacity: styleSheet.pointFillOpacity,
      },
      active: {
        fill: styleSheet.pointActiveFillColor,
      },
      selected: {
        fill: styleSheet.pointSelectedFillColor,
      },
    },
  };

  return {
    mapStyle: styleSheet.mapStyle,
    defaultColor: styleSheet.brandColor,
    subColor: styleSheet.subColor,
    semanticRed: styleSheet.paletteSemanticRed,
    semanticGreen: styleSheet.paletteSemanticGreen,
    fontFamily: styleSheet.fontFamily,
    colors10: styleSheet.paletteQualitative10,
    colors20: styleSheet.paletteQualitative20,
    sequenceColors: styleSheet.paletteSequence,
    shapes: {
      point: ['circle', 'square'],
      line: ['line'],
    },
    sizes: [1, 10],
    geometries: {
      point: {
        circle: {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
      },
      line: {},
      polygon: {},
    },
    components: {
      legend: {
        category: {
          domStyles: {
            [CATEGORY_LEGEND_CSS_CONST.CONTAINER_CLASS]: {
              visibility: 'visible',
              zIndex: 1,
              backgroundColor: styleSheet.legendContainerFillColor,
              boxShadow: styleSheet.legendContainerShadow,
              borderRadius: `${styleSheet.legendContainerBorderRadius}px`,
              color: styleSheet.legendTextFillColor,
              fontFamily: styleSheet.fontFamily,
              padding: '10px',
              lineHeight: '1',
              fontSize: `${styleSheet.legendTextFontSize}px`,
            },
            [CATEGORY_LEGEND_CSS_CONST.TITLE_CLASS]: {
              fontSize: '13px',
              lineHeight: '19px',
              marginBottom: '8px',
            },
            [CATEGORY_LEGEND_CSS_CONST.LIST_CLASS]: {
              listStyleType: 'none',
            },
            [CATEGORY_LEGEND_CSS_CONST.LIST_ITEM_CLASS]: {
              listStyleType: 'none',
              display: 'flex',
              alignItems: 'center',
            },
            [CATEGORY_LEGEND_CSS_CONST.MARKER_CLASS]: {
              width: '24px',
              height: '12px',
              marginRight: '8px',
            },
            [CATEGORY_LEGEND_CSS_CONST.VALUE_CLASS]: {},
          },
        },
        continue: {
          domStyles: {
            [CONTINUE_LEGEND_CSS_CONST.CONTAINER_CLASS]: {
              visibility: 'visible',
              zIndex: 1,
              backgroundColor: styleSheet.legendContainerFillColor,
              boxShadow: styleSheet.legendContainerShadow,
              borderRadius: `${styleSheet.legendContainerBorderRadius}px`,
              color: styleSheet.legendTextFillColor,
              fontFamily: styleSheet.fontFamily,
              padding: '10px',
              lineHeight: 1,
              fontSize: `${styleSheet.legendTextFontSize}px`,
            },
            [CONTINUE_LEGEND_CSS_CONST.TITLE_CLASS]: {
              fontSize: '13px',
              lineHeight: '19px',
              marginBottom: '8px',
            },
            [CONTINUE_LEGEND_CSS_CONST.RIBBON_CLASS]: {
              display: 'flex',
              alignItems: 'center',
            },
            [CONTINUE_LEGEND_CSS_CONST.GRADIENT_BAR_CLASS]: {
              width: '140px',
              height: '12px',
              margin: '0px 5px',
            },
            [CONTINUE_LEGEND_CSS_CONST.VALUE_RANGE_CLASS]: {
              padding: '0px',
            },
          },
        },
      },
      tooltip: {
        // tooltip dom 样式
        domStyles: {
          [TOOLTIP_CSS_CONST.CONTAINER_CLASS]: {
            visibility: 'visible',
            zIndex: 1,
            transition:
              'visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1), ' +
              'left 0.4s cubic-bezier(0.23, 1, 0.32, 1), ' +
              'top 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            backgroundColor: styleSheet.tooltipContainerFillColor,
            boxShadow: styleSheet.tooltipContainerShadow,
            borderRadius: `${styleSheet.tooltipContainerBorderRadius}px`,
            color: styleSheet.tooltipTextFillColor,
            fontSize: `${styleSheet.tooltipTextFontSize}px`,
            fontFamily: styleSheet.fontFamily,
            lineHeight: styleSheet.tooltipTextLineHeight,
          },
          [TOOLTIP_CSS_CONST.TITLE_CLASS]: {
            marginBottom: '4px',
          },
          [TOOLTIP_CSS_CONST.LIST_CLASS]: {
            margin: '0px',
            listStyleType: 'none',
            padding: '0px',
          },
          [TOOLTIP_CSS_CONST.LIST_ITEM_CLASS]: {
            listStyleType: 'none',
            marginBottom: '4px',
          },
          [TOOLTIP_CSS_CONST.NAME_CLASS]: {
            color: styleSheet.tooltipItemNameFillColor,
          },
          [TOOLTIP_CSS_CONST.VALUE_CLASS]: {
            color: styleSheet.tooltipItemValueFillColor,
            display: 'inline-block',
            float: 'right',
            marginLeft: '30px',
          },
        },
      },
      label: {
        style: {
          textAnchor: 'center',
          textOffset: [0, 0],
          fill: styleSheet.labelFillColor,
          fontSize: styleSheet.labelFontSize,
          fontFamily: styleSheet.fontFamily,
          fillColorDark: styleSheet.labelFillColorDark,
          fillColorLight: styleSheet.labelFillColorLight,
        },
      },
    },
  };
}
