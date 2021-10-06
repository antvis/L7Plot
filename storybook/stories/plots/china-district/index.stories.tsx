import { storiesOf } from '@storybook/react';

import ChinaProvince from './ChinaProvince';
import ChinaCity from './ChinaCity';
import ChinaDistrict from './ChinaDistrict';
import World from './World';
import ChinaMap from './ChinaMap';

storiesOf('中国行政图', module)
  .add('中国省级行政图', () => <ChinaProvince />)
  .add('中国市级行政图', () => <ChinaCity />)
  .add('中国区县级行政图', () => <ChinaDistrict />)
  .add('世界图', () => <World />)
  .add('中国行政图', () => <ChinaMap />);
