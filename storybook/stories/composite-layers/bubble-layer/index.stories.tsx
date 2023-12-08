import { storiesOf } from '@storybook/react';

import Earthquake from './Earthquake';
import ScaleUpdate from './ScaleUpdate';

storiesOf('复合图层/散点图层', module)
  .add('地震震级', () => <Earthquake />)
  .add('ScaleUpdate', () => <ScaleUpdate />);
