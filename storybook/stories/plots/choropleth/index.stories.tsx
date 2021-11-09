import { storiesOf } from '@storybook/react';

import ChinaProvince from './ChinaProvince';
import ChinaCity from './ChinaCity';
import ChinaDistrict from './ChinaDistrict';
import World from './World';
import ChinaMap from './ChinaMap';
import MapView from './MapView';
import Drill from './Drill';
import DrillCallback from './DrillCallback';
import WorldSufei from './WorldSufei';

storiesOf('行政区域分布图', module)
  .add('中国省级行政图', () => <ChinaProvince />)
  .add('中国市级行政图', () => <ChinaCity />)
  .add('中国区县级行政图', () => <ChinaDistrict />)
  .add('世界图', () => <World />)
  .add('中国行政图', () => <ChinaMap />)
  .add('地图切换', () => <MapView />)
  .add('行政数据钻取', () => <Drill />)
  .add('行政数据钻取-回调', () => <DrillCallback />)
  .add('WorldSufei', () => <WorldSufei />);
