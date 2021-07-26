import { storiesOf } from '@storybook/react';

import POI from './POI';
import BankOutlets from './BankOutlets';

storiesOf('图标地图', module)
  .add('POI 图标', () => <POI />)
  .add('银行网点', () => <BankOutlets />);
