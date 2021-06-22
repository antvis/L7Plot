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
        slug: 'api/map-api',
        title: {
          zh: '地图 API',
          en: 'Map API',
        },
        order: 0,
      },
      {
        slug: 'api/source',
        title: {
          zh: '数据 Source',
          en: 'Data Source',
        },
        order: 1,
      },
      {
        slug: 'api/point-map',
        title: {
          zh: '点地图',
          en: 'Point map',
        },
        order: 2,
      },
      {
        slug: 'api/options',
        title: {
          zh: '通用配置',
          en: 'Common Configuration',
        },
        order: 3,
      },
      {
        slug: 'api/components',
        title: {
          zh: '图表组件',
          en: 'Components',
        },
        order: 4,
      },
      {
        slug: 'api/advanced-plot',
        title: {
          zh: '组合地图',
          en: 'Advanced plot',
        },
        order: 5,
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
        slug: 'bubble-map',
        icon: 'bubble',
        title: {
          zh: '气泡地图',
          en: 'Bubble Map',
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
