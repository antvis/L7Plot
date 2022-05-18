import { storiesOf } from '@storybook/react';

import Heat from './Heat';
import L7Heat from './L7Heat';
import Heat3D from './Heat3D';

storiesOf('图表/热力图', module)
  .add('杭州房屋交易量', () => <Heat />)
  .add('杭州房屋交易量-L7', () => <L7Heat />)
  .add('全国交通事故增长率', () => <Heat3D />);
