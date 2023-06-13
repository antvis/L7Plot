import { defineConfig } from 'dumi';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'L7Plot',
  favicons: ['https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original'], // 网站 favicon
  metas: [
    // 自定义 meta 标签
    { name: 'keywords', content: 'L7Plot' },
    { name: 'description', content: 'L7Plot 地理空间可视化图表库' },
  ],
  locales: [
    { id: 'zh', name: '中文' },
    { id: 'en', name: 'English' },
  ],
  themeConfig: {
    title: 'L7Plot',
    description: 'Geospatial Visualization Chart Library',
    defaultLanguage: 'zh', // 默认语言
    isAntVSite: false, // 是否是 AntV 的大官网
    siteUrl: 'https://l7plot.antv.antgroup.com',
    githubUrl: 'https://github.com/antvis/L7Plot',
    showSearch: true, // 是否显示搜索框
    showGithubCorner: true, // 是否显示头部的 GitHub icon
    showGithubStars: false, // 是否显示 GitHub star 数量
    showAntVProductsCard: true, // 是否显示 AntV 产品汇总的卡片
    showLanguageSwitcher: true, // 是否显示官网语言切换
    showWxQrcode: true, // 是否显示头部菜单的微信公众号
    showChartResize: true, // 是否在 demo 页展示图表视图切换
    showAPIDoc: true, // 是否在 demo 页展示API文档
    // 头部搜索框配置
    docsearchOptions: {
      versionV3: true,
      apiKey: '614478b3f9fabe8e68f5d6a65b48054b',
      indexName: 'l7plot-antv',
      appId: '3RDFA6ITAF',
    },
    internalSite: {
      url: 'https://l7plot.antv.antgroup.com',
      name: { zh: '国内镜像', en: 'China Mirror' },
    },
    /** 首页配置 开始 */
    detail: {
      title: {
        zh: 'L7Plot 地理空间可视化图表库',
        en: 'L7Plot: Geospatial Visualization Chart',
      },
      description: {
        zh: 'L7Plot 是简单易用、图表丰富、支持定制的地理空间数据可视化地理图表库。',
        en: 'L7Plot is easy to use, rich charts, support customized geospatial charts Library.',
      },
      image: 'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*o40BRo-ANLoAAAAAAAAAAABkARQnAQ',
      buttons: [
        {
          text: {
            zh: '图表示例',
            en: 'Examples',
          },
          link: `/examples/gallery`,
          type: 'primary',
        },
        {
          text: {
            zh: '开始使用',
            en: 'Getting Started',
          },
          link: `/manual/introduction`,
        },
      ],
    },
    news: [
      {
        type: {
          zh: '论坛',
          en: 'Forum',
        },
        title: {
          zh: '远方 · 远芳 AntV 2022 年度发布',
          en: 'Yuanyuan · Yuanfang AntV 2022 Annual Release',
        },
        date: '2022.11.22',
        link: 'https://www.yuque.com/antv/blog/1122_6',
      },
      {
        type: {
          zh: '发布',
          en: 'Publish',
        },
        title: {
          zh: 'LocationInsight 开放',
          en: 'LocationInsight Open',
        },
        date: '2022.11.22',
        link: 'https://locationinsight.antv.antgroup.com/#/home',
      },
    ],
    features: [],
    cases: [],
    companies: [],
    ecosystems: [
      {
        name: {
          zh: 'L7',
          en: 'L7',
        },
        url: 'https://l7.antv.antgroup.com/',
      },
      {
        name: {
          zh: 'L7Draw',
          en: 'L7Draw',
        },
        url: 'http://antv.vision/L7Draw/',
      },
      {
        name: {
          zh: 'LarkMap',
          en: 'L7 For React',
        },
        url: 'https://larkmap.antv.antgroup.com/',
      },
      {
        name: {
          zh: 'LocationInsight',
          en: 'LocationInsight',
        },
        url: 'https://locationinsight.antv.antgroup.com/#/home',
      },
    ],
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
    // 文档目录的信息
    docs: [
      // {
      //   slug: 'api/plot-api',
      //   title: {
      //     zh: '图表 - Plot',
      //     en: 'Plot',
      //   },
      //   order: 0,
      // },
      // {
      //   slug: 'api/source',
      //   title: {
      //     zh: '数据 - Source',
      //     en: 'Source',
      //   },
      //   order: 1,
      // },
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
      // {
      //   slug: 'api/theme',
      //   title: {
      //     zh: '主题',
      //     en: '主题 - Theme',
      //   },
      //   order: 4,
      // },
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
      // {
      //   slug: 'api/advanced-plots',
      //   title: {
      //     zh: '高级图表 - Advanced Plot',
      //     en: 'Advanced Plot',
      //   },
      //   order: 8,
      // },
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
    /** 首页配置 结束 */
    playground: {
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
    announcement: {
      zh: '',
      en: '',
    },
  },
  analytics: {
    // Google Analytics code, will be enabled after configuration
    ga: 'G-S7EDKPDSL6',
  },
  mfsu: false,
  alias: {
    // 根据自己项目结构书写绝对路径
    '@': __dirname,
  },
  links: [],
  scripts: ['https://webapi.amap.com/maps?v=2.0&key=ff533602d57df6f8ab3b0fea226ae52f'],
  // 同步 gh-page CNAME 文件
  copy: isProduction ? ['docs/CNAME'] : [],
  styles: [
    `.lil-gui { position: absolute; top: 16px; right: 16px; z-index: 1000000; }`
  ]
});
