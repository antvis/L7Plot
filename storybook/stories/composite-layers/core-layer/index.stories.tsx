import { storiesOf } from '@storybook/react';

import Raster from './raster';
import Image from './image';

storiesOf('核心图层/Raster', module).add('raster', () => <Raster />);
storiesOf('核心图层/Image', module).add('image', () => <Image />);
