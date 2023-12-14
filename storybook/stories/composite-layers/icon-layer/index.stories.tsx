import { storiesOf } from '@storybook/react';

import IconImage from './iconImage';
import IconImageAtlas from './iconImageAtlas';
import IconImageScale from './iconImageScale';
import IconFont from './IconFont';

storiesOf('复合图层/标注图层', module)
  .add('图片标注', () => <IconImage />)
  .add('图片资源更新', () => <IconImageAtlas />)
  .add('图片自定义映射 domain 更新', () => <IconImageScale />)
  .add('图标标注', () => <IconFont />);
