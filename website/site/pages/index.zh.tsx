import React from 'react';
import SEO from '@antv/gatsby-theme-antv/site/components/Seo';
import { useTranslation } from 'react-i18next';
import Banner from '@antv/gatsby-theme-antv/site/components/Banner';
// import Features from '@antv/gatsby-theme-antv/site/components/Features';
// import Cases from '@antv/gatsby-theme-antv/site/components/Cases';
import BannerSVG from '@antv/gatsby-theme-antv/site/components/BannerSVG';
import './index.less';

const IndexPage = () => {
  const { t, i18n } = useTranslation();

  // const features = [
  //   {
  //     icon: 'https://gw.alipayobjects.com/zos/basement_prod/5dbaf094-c064-4a0d-9968-76020b9f1510.svg',
  //     title: t('简单方便'),
  //     description: t('从数据出发，仅需几行代码可以轻松获得想要的图表展示效果。'),
  //   },
  //   {
  //     icon: 'https://gw.alipayobjects.com/zos/basement_prod/0a0371ab-6bed-41ad-a99b-87a5044ba11b.svg',
  //     title: t('方便可靠'),
  //     description: t('大量产品实践之上，提供绘图引擎、完备图形语法，专业设计规范。'),
  //   },
  //   {
  //     icon: 'https://gw.alipayobjects.com/zos/basement_prod/716d0bc0-e311-4b28-b79f-afdd16e8148e.svg',
  //     title: t('无限可能'),
  //     description: t('任何图表，都可以基于图形语法灵活绘制，满足你无限的创意。'),
  //   },
  // ];

  // const cases = [
  //   {
  //     logo: 'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*2Ij9T76DyCcAAAAAAAAAAABkARQnAQ',
  //     isAppLogo: true,
  //     title: '灯塔专业版',
  //     description:
  //       '深入金融的基金深入金融的基金深入金融的基金深入金融的基金深入金融的基金深入金融的基金深入金融的基金深入金融的基金深入金融的基金深入金融的基金深入金融的基金',
  //     link: '#',
  //     image: 'https://gw.alipayobjects.com/mdn/rms_23b644/afts/img/A*oCd7Sq3N-QEAAAAAAAAAAABkARQnAQ',
  //   },
  // ];

  const bannerButtons = [
    {
      text: t('图表示例'),
      link: `/${i18n.language}/examples/gallery`,
      type: 'primary',
    },
    {
      text: t('开始使用'),
      link: `/${i18n.language}/docs/manual/introduction`,
    },
  ];

  // const coverImage = <img width='100%' src='https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*o40BRo-ANLoAAAAAAAAAAABkARQnAQ' alt='cover' />
  return (
    <>
      <SEO title={t('L7Plot 地理空间数据可视化图表库')} lang={i18n.language} />
      <Banner
        // coverImage={coverImage}
        coverImage={<BannerSVG />}
        title={t('L7Plot 地理空间数据可视化图表库')}
        description={t('L7Plot 是简单易用的地理空间数据统计图表库')}
        className="banner"
        buttons={bannerButtons}
        showGithubStars={false}
      />
      {/* <Features features={features} style={{ width: '100%' }} /> */}
      {/* <Cases cases={cases} /> */}
    </>
  );
};

export default IndexPage;
