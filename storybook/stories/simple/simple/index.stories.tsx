import { storiesOf } from '@storybook/react';

import SimpleDot from './simpleDot';
import SimpleWaterDot from './simpleWaterDot';
import SimpleIconDot from './simpleIconDot';

storiesOf('simple', module)
  .add('simple dot', () => <SimpleDot />)
  .add('simple water dot', () => <SimpleWaterDot />)
  .add('simple icon dot', () => <SimpleIconDot />);
