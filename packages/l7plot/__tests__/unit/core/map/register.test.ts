import { PointMap, registerFontFace, registerImage, registerImages } from '../../../../src';
import { createDiv } from '../../../helper/dom';

describe('register', () => {
  it('registerImage', () => {
    registerImage('01', 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg');

    const pointMap = new PointMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
      shape: '01',
    });

    expect(pointMap.scene.hasImage('01')).toBeTruthy();

    setTimeout(() => pointMap.destroy(), 0);
  });

  it('registerImages', () => {
    const images = [
      { id: '02', image: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg' },
    ];
    registerImages(images);

    const pointMap = new PointMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
      shape: '02',
    });

    expect(pointMap.scene.hasImage('02')).toBeTruthy();

    setTimeout(() => pointMap.destroy(), 0);
  });

  it('registerFontFace', () => {
    const fontFamily = 'iconfont';
    const fontPath = '//at.alicdn.com/t/font_2534097_iiet9d3nekn.woff2?t=1620444089776';
    registerFontFace(fontFamily, fontPath);

    const pointMap = new PointMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });

    expect(pointMap.scene['sceneService'].loadFont).toBeTruthy();

    setTimeout(() => pointMap.destroy(), 0);
  });
});
