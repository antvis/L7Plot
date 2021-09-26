import { storiesOf } from '@storybook/react';

import ShanghaiTraffic from './ShanghaiTraffic';
import BeijingTraffic from './BeijingTraffic';
import CuisineNationwide from './CuisineNationwide';

storiesOf('点密度图', module)
  .add('6万点位全国粤菜分布', () => <CuisineNationwide />)
  .add('10万辆北京公共交通车辆', () => <BeijingTraffic />)
  .add('164万辆上海市交通车辆', () => <ShanghaiTraffic />);
