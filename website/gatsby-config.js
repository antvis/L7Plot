module.exports = {
  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
        // GATrackingId: ``,
        // theme: { 'primary-color': '#873bf4' },
      },
    },
  ],
  siteMetadata: {
    title: 'L7Plot',
    description: 'An map charting library',
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
        slug: 'api/advanced-plots',
        title: {
          zh: '高级图表 - Advanced Plot',
          en: 'Advanced Plot',
        },
        order: 6,
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
        slug: 'heatmap',
        icon: 'heatmap',
        title: {
          zh: '热力图',
          en: 'Heatmap',
        },
      },
      {
        slug: 'line',
        icon: 'line',
        title: {
          zh: '路径图',
          en: 'line',
        },
      },
      {
        slug: 'polygon',
        icon: 'polygon',
        title: {
          zh: '区域图',
          en: 'polygon',
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
    playground: {
      container: '<div id="container" />',
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
};
