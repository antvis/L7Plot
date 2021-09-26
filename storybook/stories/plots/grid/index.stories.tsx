import { storiesOf } from '@storybook/react';

import Grid2D from './Grid2D';
import Grid3D from './Grid3D';

storiesOf('网格地图', module)
  .add('网格热力', () => <Grid2D />)
  .add('网格热力3D', () => <Grid3D />);
