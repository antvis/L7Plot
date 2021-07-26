import TOOLTIP_CSS_CONST from '@antv/l7plot-component/dist/lib/tooltip/constants';
import { IStyleSheet } from '../../types';

/**
 * 根据样式表创建 legend 组件主题样式
 * @param styleSheet
 */
function createLegendStyles(styleSheet: IStyleSheet): Record<string, any> {
  return {
    title: null,
    marker: {
      symbol: 'circle',
      spacing: styleSheet.legendMarkerSpacing,
      style: {
        r: styleSheet.legendCircleMarkerSize,
        fill: styleSheet.legendMarkerColor,
      },
    },
    itemName: {
      spacing: 5, // 如果右边有 value 使用这个间距
      style: {
        fill: styleSheet.legendItemNameFillColor,
        fontFamily: styleSheet.fontFamily,
        fontSize: styleSheet.legendItemNameFontSize,
        lineHeight: styleSheet.legendItemNameLineHeight,
        fontWeight: styleSheet.legendItemNameFontWeight,
        textAlign: 'start',
        textBaseline: 'middle',
      },
    },
    itemStates: {
      active: {
        nameStyle: {
          opacity: 0.8,
        },
      },
      unchecked: {
        nameStyle: {
          fill: '#D8D8D8',
        },
        markerStyle: {
          fill: '#D8D8D8',
          stroke: '#D8D8D8',
        },
      },
      inactive: {
        nameStyle: {
          fill: '#D8D8D8',
        },
        markerStyle: {
          opacity: 0.2,
        },
      },
    },
    flipPage: true,
    pageNavigator: {
      marker: {
        style: {
          size: styleSheet.legendPageNavigatorMarkerSize,
          inactiveFill: styleSheet.legendPageNavigatorMarkerInactiveFillColor,
          inactiveOpacity: styleSheet.legendPageNavigatorMarkerInactiveFillOpacity,
          fill: styleSheet.legendPageNavigatorMarkerFillColor,
          opacity: styleSheet.legendPageNavigatorMarkerFillOpacity,
        },
      },
      text: {
        style: {
          fill: styleSheet.legendPageNavigatorTextFillColor,
          fontSize: styleSheet.legendPageNavigatorTextFontSize,
        },
      },
    },
    animate: false,
    maxItemWidth: 200,
    itemSpacing: styleSheet.legendItemSpacing,
    itemMarginBottom: styleSheet.legendItemMarginBottom,
    padding: styleSheet.legendPadding, // 图例组件自己的外边距
  };
}

/**
 * 根据主题样式表生成主题结构
 * @param styleSheet 主题样式表
 */
export function createThemeByStyleSheet(styleSheet: IStyleSheet): Record<string, any> {
  const shapeStyles = {
    point: {
      default: {
        fill: styleSheet.pointFillColor,
        r: styleSheet.pointSize,
        stroke: styleSheet.pointBorderColor,
        lineWidth: styleSheet.pointBorder,
        fillOpacity: styleSheet.pointFillOpacity,
      },
      active: {
        stroke: styleSheet.pointActiveBorderColor,
        lineWidth: styleSheet.pointActiveBorder,
      },
      selected: {
        stroke: styleSheet.pointSelectedBorderColor,
        lineWidth: styleSheet.pointSelectedBorder,
      },
      inactive: {
        fillOpacity: styleSheet.pointInactiveFillOpacity,
        strokeOpacity: styleSheet.pointInactiveBorderOpacity,
      },
    },
    hollowPoint: {
      default: {
        fill: styleSheet.hollowPointFillColor,
        lineWidth: styleSheet.hollowPointBorder,
        stroke: styleSheet.hollowPointBorderColor,
        strokeOpacity: styleSheet.hollowPointBorderOpacity,
        r: styleSheet.hollowPointSize,
      },
      active: {
        stroke: styleSheet.hollowPointActiveBorderColor,
        strokeOpacity: styleSheet.hollowPointActiveBorderOpacity,
      },
      selected: {
        lineWidth: styleSheet.hollowPointSelectedBorder,
        stroke: styleSheet.hollowPointSelectedBorderColor,
        strokeOpacity: styleSheet.hollowPointSelectedBorderOpacity,
      },
      inactive: {
        strokeOpacity: styleSheet.hollowPointInactiveBorderOpacity,
      },
    },
    area: {
      default: {
        fill: styleSheet.areaFillColor,
        fillOpacity: styleSheet.areaFillOpacity,
        stroke: null,
      },
      active: {
        fillOpacity: styleSheet.areaActiveFillOpacity,
      },
      selected: {
        fillOpacity: styleSheet.areaSelectedFillOpacity,
      },
      inactive: {
        fillOpacity: styleSheet.areaInactiveFillOpacity,
      },
    },
    hollowArea: {
      default: {
        fill: null,
        stroke: styleSheet.hollowAreaBorderColor,
        lineWidth: styleSheet.hollowAreaBorder,
        strokeOpacity: styleSheet.hollowAreaBorderOpacity,
      },
      active: {
        fill: null,
        lineWidth: styleSheet.hollowAreaActiveBorder,
      },
      selected: {
        fill: null,
        lineWidth: styleSheet.hollowAreaSelectedBorder,
      },
      inactive: {
        strokeOpacity: styleSheet.hollowAreaInactiveBorderOpacity,
      },
    },
    interval: {
      default: {
        fill: styleSheet.intervalFillColor,
        fillOpacity: styleSheet.intervalFillOpacity,
      },
      active: {
        stroke: styleSheet.intervalActiveBorderColor,
        lineWidth: styleSheet.intervalActiveBorder,
      },
      selected: {
        stroke: styleSheet.intervalSelectedBorderColor,
        lineWidth: styleSheet.intervalSelectedBorder,
      },
      inactive: {
        fillOpacity: styleSheet.intervalInactiveFillOpacity,
        strokeOpacity: styleSheet.intervalInactiveBorderOpacity,
      },
    },
    hollowInterval: {
      default: {
        fill: styleSheet.hollowIntervalFillColor,
        stroke: styleSheet.hollowIntervalBorderColor,
        lineWidth: styleSheet.hollowIntervalBorder,
        strokeOpacity: styleSheet.hollowIntervalBorderOpacity,
      },
      active: {
        stroke: styleSheet.hollowIntervalActiveBorderColor,
        lineWidth: styleSheet.hollowIntervalActiveBorder,
        strokeOpacity: styleSheet.hollowIntervalActiveBorderOpacity,
      },
      selected: {
        stroke: styleSheet.hollowIntervalSelectedBorderColor,
        lineWidth: styleSheet.hollowIntervalSelectedBorder,
        strokeOpacity: styleSheet.hollowIntervalSelectedBorderOpacity,
      },
      inactive: {
        stroke: styleSheet.hollowIntervalInactiveBorderColor,
        lineWidth: styleSheet.hollowIntervalInactiveBorder,
        strokeOpacity: styleSheet.hollowIntervalInactiveBorderOpacity,
      },
    },
    line: {
      default: {
        stroke: styleSheet.lineBorderColor,
        lineWidth: styleSheet.lineBorder,
        strokeOpacity: styleSheet.lineBorderOpacity,
        fill: null,
        lineAppendWidth: 10,
        lineCap: 'round',
        lineJoin: 'round',
      },
      active: {
        lineWidth: styleSheet.lineActiveBorder,
      },
      selected: {
        lineWidth: styleSheet.lineSelectedBorder,
      },
      inactive: {
        strokeOpacity: styleSheet.lineInactiveBorderOpacity,
      },
    },
  };
  const legendStyles = createLegendStyles(styleSheet);

  return {
    mapStyle: styleSheet.mapStyle,
    defaultColor: styleSheet.brandColor,
    subColor: styleSheet.subColor,
    semanticRed: styleSheet.paletteSemanticRed,
    semanticGreen: styleSheet.paletteSemanticGreen,
    padding: 'auto',
    fontFamily: styleSheet.fontFamily,
    // 兼容Theme配置
    /** 一般柱状图宽度占比，geometry中已添加默认值，为了geometry配置生效默认值为null */
    columnWidthRatio: 1 / 2,
    /** 柱状图最大宽度 */
    maxColumnWidth: null,
    /** 柱状图最小宽度 */
    minColumnWidth: null,
    /** 玫瑰图占比 */
    roseWidthRatio: 0.9999999,
    /** 多层饼图/环图占比 */
    multiplePieWidthRatio: 1 / 1.3,
    colors10: styleSheet.paletteQualitative10,
    colors20: styleSheet.paletteQualitative20,
    sequenceColors: styleSheet.paletteSequence,
    shapes: {
      point: [
        'hollow-circle',
        'hollow-square',
        'hollow-bowtie',
        'hollow-diamond',
        'hollow-hexagon',
        'hollow-triangle',
        'hollow-triangle-down',
        'circle',
        'square',
        'bowtie',
        'diamond',
        'hexagon',
        'triangle',
        'triangle-down',
        'cross',
        'tick',
        'plus',
        'hyphen',
        'line',
      ],
      line: ['line', 'dash', 'dot', 'smooth'],
      area: ['area', 'smooth', 'line', 'smooth-line'],
      interval: ['rect', 'hollow-rect', 'line', 'tick'],
    },
    sizes: [1, 10],
    geometries: {
      interval: {
        rect: {
          default: {
            style: shapeStyles.interval.default,
          },
          active: {
            style: shapeStyles.interval.active,
          },
          inactive: {
            style: shapeStyles.interval.inactive,
          },
          selected: {},
        },
        'hollow-rect': {
          default: {
            style: shapeStyles.hollowInterval.default,
          },
          active: {
            style: shapeStyles.hollowInterval.active,
          },
          inactive: {
            style: shapeStyles.hollowInterval.inactive,
          },
          selected: {
            style: shapeStyles.hollowInterval.selected,
          },
        },
        line: {
          default: {
            style: shapeStyles.hollowInterval.default,
          },
          active: {
            style: shapeStyles.hollowInterval.active,
          },
          inactive: {
            style: shapeStyles.hollowInterval.inactive,
          },
          selected: {
            style: shapeStyles.hollowInterval.selected,
          },
        },
        tick: {
          default: {
            style: shapeStyles.hollowInterval.default,
          },
          active: {
            style: shapeStyles.hollowInterval.active,
          },
          inactive: {
            style: shapeStyles.hollowInterval.inactive,
          },
          selected: {
            style: shapeStyles.hollowInterval.selected,
          },
        },
        funnel: {
          default: {
            style: shapeStyles.interval.default,
          },
          active: {
            style: shapeStyles.interval.active,
          },
          inactive: {
            style: shapeStyles.interval.inactive,
          },
          selected: {
            style: shapeStyles.interval.selected,
          },
        },
        pyramid: {
          default: {
            style: shapeStyles.interval.default,
          },
          active: {
            style: shapeStyles.interval.active,
          },
          inactive: {
            style: shapeStyles.interval.inactive,
          },
          selected: {
            style: shapeStyles.interval.selected,
          },
        },
      },
      line: {
        line: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        dot: {
          default: {
            style: {
              ...shapeStyles.line.default,
              lineCap: null,
              lineDash: [1, 1],
            },
          },
          active: {
            style: {
              ...shapeStyles.line.active,
              lineCap: null,
              lineDash: [1, 1],
            },
          },
          inactive: {
            style: {
              ...shapeStyles.line.inactive,
              lineCap: null,
              lineDash: [1, 1],
            },
          },
          selected: {
            style: {
              ...shapeStyles.line.selected,
              lineCap: null,
              lineDash: [1, 1],
            },
          },
        },
        dash: {
          default: {
            style: {
              ...shapeStyles.line.default,
              lineCap: null,
              lineDash: [5.5, 1],
            },
          },
          active: {
            style: {
              ...shapeStyles.line.active,
              lineCap: null,
              lineDash: [5.5, 1],
            },
          },
          inactive: {
            style: {
              ...shapeStyles.line.inactive,
              lineCap: null,
              lineDash: [5.5, 1],
            },
          },
          selected: {
            style: {
              ...shapeStyles.line.selected,
              lineCap: null,
              lineDash: [5.5, 1],
            },
          },
        },
        smooth: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        hv: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        vh: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        hvh: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        vhv: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
      },
      polygon: {
        polygon: {
          default: {
            style: shapeStyles.interval.default,
          },
          active: {
            style: shapeStyles.interval.active,
          },
          inactive: {
            style: shapeStyles.interval.inactive,
          },
          selected: {
            style: shapeStyles.interval.selected,
          },
        },
      },
      point: {
        circle: {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          inactive: {
            style: shapeStyles.point.inactive,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
        square: {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          inactive: {
            style: shapeStyles.point.inactive,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
        bowtie: {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          inactive: {
            style: shapeStyles.point.inactive,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
        diamond: {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          inactive: {
            style: shapeStyles.point.inactive,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
        hexagon: {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          inactive: {
            style: shapeStyles.point.inactive,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
        triangle: {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          inactive: {
            style: shapeStyles.point.inactive,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
        'triangle-down': {
          default: {
            style: shapeStyles.point.default,
          },
          active: {
            style: shapeStyles.point.active,
          },
          inactive: {
            style: shapeStyles.point.inactive,
          },
          selected: {
            style: shapeStyles.point.selected,
          },
        },
        'hollow-circle': {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        'hollow-square': {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        'hollow-bowtie': {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        'hollow-diamond': {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        'hollow-hexagon': {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        'hollow-triangle': {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        'hollow-triangle-down': {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        cross: {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        tick: {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        plus: {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        hyphen: {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
        line: {
          default: {
            style: shapeStyles.hollowPoint.default,
          },
          active: {
            style: shapeStyles.hollowPoint.active,
          },
          inactive: {
            style: shapeStyles.hollowPoint.inactive,
          },
          selected: {
            style: shapeStyles.hollowPoint.selected,
          },
        },
      },
      area: {
        area: {
          default: {
            style: shapeStyles.area.default,
          },
          active: {
            style: shapeStyles.area.active,
          },
          inactive: {
            style: shapeStyles.area.inactive,
          },
          selected: {
            style: shapeStyles.area.selected,
          },
        },
        smooth: {
          default: {
            style: shapeStyles.area.default,
          },
          active: {
            style: shapeStyles.area.active,
          },
          inactive: {
            style: shapeStyles.area.inactive,
          },
          selected: {
            style: shapeStyles.area.selected,
          },
        },
        line: {
          default: {
            style: shapeStyles.hollowArea.default,
          },
          active: {
            style: shapeStyles.hollowArea.active,
          },
          inactive: {
            style: shapeStyles.hollowArea.inactive,
          },
          selected: {
            style: shapeStyles.hollowArea.selected,
          },
        },
        'smooth-line': {
          default: {
            style: shapeStyles.hollowArea.default,
          },
          active: {
            style: shapeStyles.hollowArea.active,
          },
          inactive: {
            style: shapeStyles.hollowArea.inactive,
          },
          selected: {
            style: shapeStyles.hollowArea.selected,
          },
        },
      },
      schema: {
        candle: {
          default: {
            style: shapeStyles.hollowInterval.default,
          },
          active: {
            style: shapeStyles.hollowInterval.active,
          },
          inactive: {
            style: shapeStyles.hollowInterval.inactive,
          },
          selected: {
            style: shapeStyles.hollowInterval.selected,
          },
        },
        box: {
          default: {
            style: shapeStyles.hollowInterval.default,
          },
          active: {
            style: shapeStyles.hollowInterval.active,
          },
          inactive: {
            style: shapeStyles.hollowInterval.inactive,
          },
          selected: {
            style: shapeStyles.hollowInterval.selected,
          },
        },
      },
      edge: {
        line: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        vhv: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        smooth: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        arc: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
      },
      violin: {
        violin: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        smooth: {
          default: {
            style: shapeStyles.line.default,
          },
          active: {
            style: shapeStyles.line.active,
          },
          inactive: {
            style: shapeStyles.line.inactive,
          },
          selected: {
            style: shapeStyles.line.selected,
          },
        },
        hollow: {
          default: {
            style: shapeStyles.hollowArea.default,
          },
          active: {
            style: shapeStyles.hollowArea.active,
          },
          inactive: {
            style: shapeStyles.hollowArea.inactive,
          },
          selected: {
            style: shapeStyles.hollowArea.selected,
          },
        },
        'hollow-smooth': {
          default: {
            style: shapeStyles.hollowArea.default,
          },
          active: {
            style: shapeStyles.hollowArea.active,
          },
          inactive: {
            style: shapeStyles.hollowArea.inactive,
          },
          selected: {
            style: shapeStyles.hollowArea.selected,
          },
        },
      },
    },
    components: {
      legend: {
        common: legendStyles,
        right: {
          layout: 'vertical',
          padding: styleSheet.legendVerticalPadding,
        },
        left: {
          layout: 'vertical',
          padding: styleSheet.legendVerticalPadding,
        },
        top: {
          layout: 'horizontal',
          padding: styleSheet.legendHorizontalPadding,
        },
        bottom: {
          layout: 'horizontal',
          padding: styleSheet.legendHorizontalPadding,
        },
      },
      tooltip: {
        showContent: true,
        follow: true,
        showCrosshairs: false,
        showMarkers: true,
        shared: false,
        enterable: false,
        position: 'auto',
        marker: {
          symbol: 'circle',
          stroke: '#fff',
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'rgba(0,0,0,0.09)',
          lineWidth: 2,
          r: 4,
        },
        // tooltip dom 样式
        domStyles: {
          [`${TOOLTIP_CSS_CONST.CONTAINER_CLASS}`]: {
            position: 'absolute',
            visibility: 'hidden',
            zIndex: 8,
            transition: 'left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s',
            backgroundColor: styleSheet.tooltipContainerFillColor,
            opacity: styleSheet.tooltipContainerFillOpacity,
            boxShadow: styleSheet.tooltipContainerShadow,
            borderRadius: `${styleSheet.tooltipContainerBorderRadius}px`,
            color: styleSheet.tooltipTextFillColor,
            fontSize: `${styleSheet.tooltipTextFontSize}px`,
            fontFamily: styleSheet.fontFamily,
            lineHeight: `${styleSheet.tooltipTextLineHeight}px`,
            padding: '0 12px 0 12px',
          },
          [`${TOOLTIP_CSS_CONST.TITLE_CLASS}`]: {
            marginBottom: '12px',
            marginTop: '12px',
          },
          [`${TOOLTIP_CSS_CONST.LIST_CLASS}`]: {
            margin: 0,
            listStyleType: 'none',
            padding: 0,
          },
          [`${TOOLTIP_CSS_CONST.LIST_ITEM_CLASS}`]: {
            listStyleType: 'none',
            padding: 0,
            marginBottom: '12px',
            marginTop: '12px',
            marginLeft: 0,
            marginRight: 0,
          },
          // [`${TOOLTIP_CSS_CONST.MARKER_CLASS}`]: {
          //   width: '8px',
          //   height: '8px',
          //   borderRadius: '50%',
          //   display: 'inline-block',
          //   marginRight: '8px',
          // },
          [`${TOOLTIP_CSS_CONST.VALUE_CLASS}`]: {
            display: 'inline-block',
            float: 'right',
            marginLeft: '30px',
          },
        },
      },
    },
    labels: {
      offset: 12,
      style: {
        fill: styleSheet.labelFillColor,
        fontSize: styleSheet.labelFontSize,
        fontFamily: styleSheet.fontFamily,
        lineWidth: styleSheet.labelBorder,
      },
      fillColorDark: styleSheet.labelFillColorDark,
      fillColorLight: styleSheet.labelFillColorLight,
      autoRotate: true,
    },
    innerLabels: {
      style: {
        fill: styleSheet.innerLabelFillColor,
        fontSize: styleSheet.innerLabelFontSize,
        fontFamily: styleSheet.fontFamily,
        lineWidth: styleSheet.innerLabelBorder,
      },
      autoRotate: true,
    },
    overflowLabels: {
      style: {
        fill: styleSheet.overflowLabelFillColor,
        fontSize: styleSheet.overflowLabelFontSize,
        fontFamily: styleSheet.fontFamily,
        stroke: styleSheet.overflowLabelBorderColor,
        lineWidth: styleSheet.overflowLabelBorder,
      },
    },
    pieLabels: {
      labelHeight: 14,
      offset: 10,
      labelLine: {
        style: {},
      },
      autoRotate: true,
    },
  };
}
