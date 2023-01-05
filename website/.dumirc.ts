import { defineConfig } from 'dumi';
import { repository, version } from './package.json';

export default defineConfig({
  locales: [
    { id: 'zh', name: '中文' },
    { id: 'en', name: 'English' },
  ],

  themeConfig: {
    /** !!!!!!!!!!!!!!!!!!!!!!! */
    /** 这里是具体的配置内容 */
    /** 1. 把 gatsby.config.ts 的 cp 到这里 */
    /** 2. 参考 G2Plot 增加 detail、news、features、cases、companies 等配置 */
    /** !!!!!!!!!!!!!!!!!!!!!!! */
  },
  links: [],
  scripts: [],

  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
        GATrackingId: `G-S7EDKPDSL6`,
      },
    },
  ],
  siteMetadata: {
    title: 'L7Plot',
    description: 'Geospatial Visualization Chart Library',
    siteUrl: 'https://l7plot.antv.vision',
    githubUrl: 'https://github.com/antvis/L7Plot',
    navs: [
      {
        slug: 'docs/manual',
        title: {
          zh: '教程',
          en: 'Manual',
        },
        order: 2,
      },
      {
        slug: 'docs/api',
        title: {
          zh: 'API',
          en: 'API',
        },
        order: 1,
      },
      {
        slug: 'examples',
        title: {
          zh: '图表示例',
          en: 'Examples',
        },
        order: 0,
      },
    ],
    docs: [
      {
        slug: 'api/plot-api',
        title: {
          zh: '图表 - Plot',
          en: 'Plot',
        },
        order: 0,
      },
      {
        slug: 'api/source',
        title: {
          zh: '数据 - Source',
          en: 'Source',
        },
        order: 1,
      },
      {
        slug: 'api/plots',
        title: {
          zh: '基础图表 - Plots',
          en: 'Plots',
        },
        order: 2,
      },
      {
        slug: 'api/components',
        title: {
          zh: '组件 - Components',
          en: 'Components',
        },
        order: 3,
      },
      {
        slug: 'api/theme',
        title: {
          zh: '主题',
          en: '主题 - Theme',
        },
        order: 4,
      },
      {
        slug: 'api/layers',
        title: {
          zh: '图层 - Layers',
          en: 'Layers',
        },
        order: 5,
      },
      {
        slug: 'api/base-layers',
        title: {
          zh: '基础图层 - BaseLayers',
          en: 'BaseLayers',
        },
        order: 6,
      },
      {
        slug: 'api/composite-layers',
        title: {
          zh: '复合图层 - CompositeLayers',
          en: 'CompositeLayers',
        },
        order: 7,
      },
      {
        slug: 'api/advanced-plots',
        title: {
          zh: '高级图表 - Advanced Plot',
          en: 'Advanced Plot',
        },
        order: 8,
      },
    ],
    examples: [
      {
        slug: 'gallery',
        icon: 'gallery',
        title: {
          zh: '常用案例',
          en: 'Show Case',
        },
      },
      {
        slug: 'dot',
        icon: 'point',
        title: {
          zh: '散点图',
          en: 'Dot',
        },
      },
      {
        slug: 'heat',
        icon: 'heatmap',
        title: {
          zh: '热力图',
          en: 'Heat',
        },
      },
      {
        slug: 'path',
        icon: 'line',
        title: {
          zh: '路径图',
          en: 'path',
        },
      },
      {
        slug: 'flow',
        icon: 'line',
        title: {
          zh: '流向图',
          en: 'flow',
        },
      },
      {
        slug: 'area',
        icon: 'polygon',
        title: {
          zh: '区域图',
          en: 'area',
        },
      },
      {
        slug: 'choropleth',
        icon: 'polygon',
        title: {
          zh: '行政区域图',
          en: 'choropleth',
        },
      },
      {
        slug: 'composite',
        icon: 'other',
        title: {
          zh: '复合图层',
          en: 'compositeLayer',
        },
      },
      {
        slug: 'advanced-plot',
        icon: 'other',
        title: {
          zh: '高级图表',
          en: 'advanced-plot',
        },
      },
    ],
    galleryMenuCloseAll: false, // 是否默认收起 gallery 页面所有 menu
    showSearch: true, // 是否展示搜索框
    showChinaMirror: true, // 是否展示国内镜像链接
    showAntVProductsCard: true, // 是否展示 AntV 系列产品的卡片链接
    showLanguageSwitcher: true, // 用于定义是否展示语言切换
    showGithubStar: false, // 是否展示 Github Star
    showGithubCorner: true, // 是否展示角落的 GitHub 图标
    showAPIDoc: true, // 是否在demo页展示API文档
    showChartResize: true, // 是否在demo页展示图表视图切换
    docsearchOptions: {
      versionV3: true,
      apiKey: '614478b3f9fabe8e68f5d6a65b48054b',
      indexName: 'l7plot-antv',
      appId: '3RDFA6ITAF',
    },
    playground: {
      container: '<div id="container" style="position: relative; width: 100%; height: 100vh;" />',
      playgroundDidMount: 'console.log("playgroundDidMount");',
      playgroundWillUnmount: 'console.log("playgroundWillUnmount");',
      devDependencies: {
        typescript: 'latest',
      },
    },
    mdPlayground: {
      // markdown 文档中的 playground 若干设置
      splitPaneMainSize: '50%',
    },
    redirects: [],
  },
});
