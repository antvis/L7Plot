import { registerImages, IconMap } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/maps/icon-map/constants';
import { createDiv } from '../../../helper/dom';

describe('icon map', () => {
  it('defaultOptions', () => {
    expect(IconMap.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const images = [
      { id: '01', image: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg' },
    ];
    registerImages(images);
    const iconMap = new IconMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
      shape: '01',
      size: 25,
      label: {
        field: 's',
        style: {
          fill: '#fff',
          opacity: 0.6,
          fontSize: 12,
        },
      },
    });

    expect(iconMap.type).toEqual('icon');
    expect(iconMap.iconLayer).toBeDefined();
    expect(iconMap.labelLayer).toBeDefined();

    iconMap.on('loaded', () => setTimeout(() => iconMap.destroy(), 0));
  });

  it('event', () => {
    const iconMap = new IconMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });

    return new Promise<void>((resolve, reject) => {
      iconMap.on('iconLayer:add', () => {
        try {
          expect(iconMap.iconLayer?.inited).toBeTruthy();
          expect(iconMap.getLayerByName('iconLayer')).toBeDefined();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => iconMap.destroy(), 0);
      });
    });
  });
});
