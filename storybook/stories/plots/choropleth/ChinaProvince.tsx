import React, { Component } from 'react';
import { Choropleth } from '@antv/l7plot';

const ProvinceData = [
  {
    name: '云南省',
    code: 530000,
    value: 17881.12,
  },
  {
    name: '黑龙江省',
    code: 230000,
    value: 16361.62,
  },
  {
    name: '贵州省',
    code: 520000,
    value: 14806.45,
  },
  {
    name: '北京市',
    code: 110000,
    value: 30319.98,
  },
  {
    name: '河北省',
    code: 130000,
    value: 36010.27,
  },
  {
    name: '山西省',
    code: 140000,
    value: 16818.11,
  },
  {
    name: '吉林省',
    code: 220000,
    value: 15074,
  },
  {
    name: '宁夏回族自治区',
    code: 640000,
    value: 3705.18,
  },
  {
    name: '辽宁省',
    code: 210000,
    value: 25315.35,
  },
  {
    name: '海南省',
    code: 460000,
    value: 4832.05,
  },
  {
    name: '内蒙古自治区',
    code: 150000,
    value: 17289.22,
  },
  {
    name: '天津市',
    code: 120000,
    value: 18809.64,
  },
  {
    name: '新疆维吾尔自治区',
    code: 650000,
    value: 12199.08,
  },
  {
    name: '上海市',
    code: 310000,
    value: 32679.87,
  },
  {
    name: '陕西省',
    code: 610000,
    value: 24438.32,
  },
  {
    name: '甘肃省',
    code: 620000,
    value: 8246.07,
  },
  {
    name: '安徽省',
    code: 340000,
    value: 30006.82,
  },
  {
    name: '香港特别行政区',
    code: 810000,
    value: 0,
  },
  {
    name: '广东省',
    code: 440000,
    value: 97277.77,
  },
  {
    name: '河南省',
    code: 410000,
    value: 48055.86,
  },
  {
    name: '湖南省',
    code: 430000,
    value: 36425.78,
  },
  {
    name: '江西省',
    code: 360000,
    value: 21984.78,
  },
  {
    name: '四川省',
    code: 510000,
    value: 40678.13,
  },
  {
    name: '广西壮族自治区',
    code: 450000,
    value: 20353.51,
  },
  {
    name: '江苏省',
    code: 320000,
    value: 92595.4,
  },
  {
    name: '澳门特别行政区',
    code: 820000,
    value: null,
  },
  {
    name: '浙江省',
    code: 330000,
    value: 56197.15,
  },
  {
    name: '山东省',
    code: 370000,
    value: 76469.67,
  },
  {
    name: '青海省',
    code: 630000,
    value: 2865.23,
  },
  {
    name: '重庆市',
    code: 500000,
    value: 20363.19,
  },
  {
    name: '福建省',
    code: 350000,
    value: 35804.04,
  },
  {
    name: '湖北省',
    code: 420000,
    value: 39366.55,
  },
  {
    name: '西藏自治区',
    code: 540000,
    value: 1477.63,
  },
  {
    name: '台湾省',
    code: 710000,
    value: null,
  },
];

class ChinaProvince extends Component {
  public map: Choropleth | undefined;

  constructor(props) {
    super(props);
  }

  async initMap() {
    const chinaMap = new Choropleth('container', {
      map: {
        type: 'mapbox',
        style: 'blank',
        center: [120.19382669582967, 30.258134],
        zoom: 3,
        pitch: 0,
      },

      source: {
        data: ProvinceData,
        joinBy: {
          sourceField: 'code',
          geoField: 'adcode',
        },
      },

      viewLevel: {
        level: 'country',
        adcode: '100000',
      },
      autoFit: true,
      chinaBorder: {
        national: {
          color: 'red',
          width: 0.6,
          opacity: 0.5,
        },
      },

      color: {
        field: 'value',
        value: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
        scale: { type: 'quantize' },
      },
      style: {
        opacity: 1,
        stroke: '#ccc',
        lineWidth: 0.6,
        lineOpacity: 1,
      },
      label: {
        visible: true,
        field: 'name',
        style: {
          fill: '#fff',
          opacity: 0.8,
          fontSize: 12,
          stroke: '#fff', // 描边颜色
          strokeWidth: 0.5, // 描边宽度
        },
      },
      state: {
        active: { stroke: 'yellow' },
      },
      tooltip: {
        items: ['name', 'adcode', 'value'],
      },
      zoom: {
        position: 'bottomright',
      },
      scale: {
        position: 'bottomright',
      },
      layerMenu: {
        position: 'topright',
      },
      legend: {
        position: 'bottomleft',
      },
    });

    this.map = chinaMap;
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillUnmount() {
    this.map && this.map.destroy();
  }

  render() {
    return (
      <div
        id="container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></div>
    );
  }
}

export default ChinaProvince;
