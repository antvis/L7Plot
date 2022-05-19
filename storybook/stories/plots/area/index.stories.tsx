import { storiesOf } from '@storybook/react';

import ChinaCitys from './ChinaCitys';
import WorldSufei from './WorldSufei';
import WorldSufeiMove from './WorldSufeiMove';

storiesOf('图表/区域图', module)
  .add('中国城市区域', () => <ChinaCitys />)
  .add('WorldSufei', () => <WorldSufei />)
  .add('WorldSufeiMove', () => <WorldSufeiMove />);
