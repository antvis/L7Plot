import { storiesOf } from '@storybook/react';

import Grid from './Grid';
import Grid3D from './Grid3D';

storiesOf('网格地图', module)
  .add('网格热力', () => <Grid />)
  .add('网格热力3D', () => <Grid3D />);
