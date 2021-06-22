import { storiesOf } from '@storybook/react';

import BasicDemo from './Basic';
import Density from './Density';

storiesOf('散点地图', module)
  .add('分布', () => <BasicDemo />)
  .add('点密度', () => <Density />);
