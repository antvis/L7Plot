import { storiesOf } from '@storybook/react';

import Arc from './Arc';
import GroundFlow from './GroundFlow';
import Flowtsx from './Flow';
import Airline from './Airline';

storiesOf('流向图', module)
  .add('弧线图', () => <Arc />)
  .add('贴地流向图', () => <GroundFlow />)
  .add('流向图', () => <Flowtsx />)
  .add('航空线', () => <Airline />);
