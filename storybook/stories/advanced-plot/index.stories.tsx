import { storiesOf } from '@storybook/react';

import FlyFlow from './FlyFlow';
import AirFlyFlow from './AirFlyFlow';
import WindField from './WindField';

import WorldBubbleMap from './WorldBubbleMap';
import ChinaBubbleMap from './ChinaBubbleMap';

storiesOf('高级图表', module)
  .add('流向图', () => <FlyFlow />)
  .add('航向图', () => <AirFlyFlow />)
  .add('风场图', () => <WindField />)
  .add('世界气泡图', () => <WorldBubbleMap />)
  .add('中国气泡图', () => <ChinaBubbleMap />);
