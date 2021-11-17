import { storiesOf } from '@storybook/react';

import FlyFlow from './FlyFlow';
import AirFlyFlow from './AirFlyFlow';
import WindField from './WindField';

import MutiPlot from './MutiPlot';

storiesOf('高级图表', module)
  .add('流向图', () => <FlyFlow />)
  .add('航向图', () => <AirFlyFlow />)
  .add('风场图', () => <WindField />)
  .add('组合图表', () => <MutiPlot />);
