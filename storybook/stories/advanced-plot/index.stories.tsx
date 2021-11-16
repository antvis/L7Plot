import { storiesOf } from '@storybook/react';

import FlyFlow from './FlyFlow';
import AirFlyFlow from './AirFlyFlow';
import Combination from './Combination';

storiesOf('高级图表', module)
  .add('流向图', () => <FlyFlow />)
  .add('航向图', () => <AirFlyFlow />)
  .add('组合图表', () => <Combination />);
