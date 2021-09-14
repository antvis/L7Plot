import { storiesOf } from '@storybook/react';

import HexagonDelay from './HexagonDelay';
import Hexagon3D from './Hexagon3D';

storiesOf('蜂窝地图', module)
  .add('杭州交通高峰期路口延误指数', () => <HexagonDelay />)
  .add('蜂窝热力图3D', () => <Hexagon3D />);
