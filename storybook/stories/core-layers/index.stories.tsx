import { storiesOf } from '@storybook/react';

import PointLayer from './PointLayer';
import TextLayer from './TextLayer';
import Raster from './RasterLayer';
import RasterTile from './rastertileLayer';
import Image from './ImageLayer';
import PolygonLayer from './PolygonLayer';
import LineLayer from './LineLayer';
import L7LineLayer from './L7LineLayer';

storiesOf('核心图层/Point', module).add('Point', () => <PointLayer />);
storiesOf('核心图层/Text', module).add('Text', () => <TextLayer />);
storiesOf('核心图层/Raster', module).add('raster', () => <Raster />);
storiesOf('核心图层/RasterTile', module).add('raster', () => <RasterTile />);
storiesOf('核心图层/Image', module).add('image', () => <Image />);
storiesOf('核心图层/Polygon', module).add('西湖区', () => <PolygonLayer />);
storiesOf('核心图层/Line', module)
  .add('line', () => <LineLayer />)
  .add('l7line', () => <L7LineLayer />);
