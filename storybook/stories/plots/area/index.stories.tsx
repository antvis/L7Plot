import { storiesOf } from '@storybook/react';

import ChinaCitys from './ChinaCitys';
import WorldSufei from './WorldSufei';

storiesOf('区域图', module)
  .add('中国城市区域', () => <ChinaCitys />)
  .add('WorldSufei', () => <WorldSufei />);