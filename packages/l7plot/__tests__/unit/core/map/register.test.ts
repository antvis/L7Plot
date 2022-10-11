import { createPlot } from '../../../helper/plot';
import { Dot, DotOptions, registerFontFace, registerImage, registerImages } from '../../../../src';

describe('register', () => {
  it('registerImage', () => {
    registerImage('01', 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg');

    const dotMap = createPlot<Dot, DotOptions>(Dot, {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
      shape: '01',
    });

    expect(dotMap.scene.hasImage('01')).toBeTruthy();

    setTimeout(() => dotMap.destroy(), 0);
  });

  it('registerImages', () => {
    const images = [
      { id: '02', image: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg' },
    ];
    registerImages(images);

    const dotMap = createPlot<Dot, DotOptions>(Dot, {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
      shape: '02',
    });

    expect(dotMap.scene.hasImage('02')).toBeTruthy();

    setTimeout(() => dotMap.destroy(), 0);
  });

  it('registerFontFace', () => {
    const fontFamily = 'iconfont';
    const fontPath = 'https://at.alicdn.com/t/font_2534097_iiet9d3nekn.woff2?t=1620444089776';
    registerFontFace(fontFamily, fontPath);

    const dotMap = createPlot<Dot, DotOptions>(Dot, {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });

    expect(dotMap.type).toEqual('dot');
    // dotMap.scene['sceneService'].on('fontloaded', (e) => {
    //   expect(e.fontFamily).toBe(111)
    // })

    setTimeout(() => dotMap.destroy(), 0);
  });
});
