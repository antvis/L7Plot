import { storiesOf } from '@storybook/react';

import AirTemperature from './AirTemperature';
import L7AirTemperature from './L7AirTemperature';
import Earthquake from './Earthquake';
import CityLocation from './CityLocation';
import GlobalEarthquake from './GlobalEarthquake';
import PopulationGDP from './PopulationGDP';
import Animate from './Animate';

storiesOf('气泡地图', module)
  .add('气温分布', () => <AirTemperature />)
  .add('气温分布-L7', () => <L7AirTemperature />)
  .add('地震震级', () => <Earthquake />)
  .add('全国城市与区县位置', () => <CityLocation />)
  .add('全球地震等级与震深', () => <GlobalEarthquake />)
  .add('中国城市人口数量及GDP排行', () => <PopulationGDP />)
  .add('全国交通事件气泡动画', () => <Animate />);
