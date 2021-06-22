import { storiesOf } from '@storybook/react';

import BasicDemo from './Basic';
import L7BasicDemo from './L7Basic';
import Distribution from './Distribution';
import Animate from './Animate';

storiesOf('气泡地图', module)
  .add('气温分布', () => <BasicDemo />)
  .add('气温分布-L7', () => <L7BasicDemo />)
  .add('全球分布', () => <Distribution />)
  .add('动画', () => <Animate />);
