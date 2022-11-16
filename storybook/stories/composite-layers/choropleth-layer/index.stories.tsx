import { storiesOf } from '@storybook/react';

import ChinaCitys from './ChinaCitys';
import Select from './Select';

storiesOf('复合图层/区域图层', module)
  .add('中国城市区域', () => <ChinaCitys />)
  .add('Select', () => <Select />);
