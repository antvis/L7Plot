import { storiesOf } from '@storybook/react';

import ChoroplethDrill from './ChoroplethDrill';
import PlotIconLayer from './PlotIconLayer';

storiesOf('插件', module)
  .add('行政区域图', () => <ChoroplethDrill />)
  .add('图标图层', () => <PlotIconLayer />);
