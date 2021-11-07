import { storiesOf } from '@storybook/react';

import BeijingMetro from './BeijingMetro';
import BeijingBusPath from './BeijingBusPath';
import BusRoutes from './BusRoutes';
import BusLevelRoutes from './BusLevelRoutes';
import Trail from './Trail';

storiesOf('路径图', module)
  .add('北京地铁线', () => <BeijingMetro />)
  .add('在建地铁线路', () => <BeijingBusPath />)
  .add('公交路线', () => <BusRoutes />)
  .add('分类公交路线', () => <BusLevelRoutes />)
  .add('轨迹线', () => <Trail />);
