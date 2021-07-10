import { registerImages, SymbolMap } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/maps/symbol-map/constants';
import { createDiv } from '../../../helper/dom';

describe('symbol map', () => {
  it('defaultOptions', () => {
    expect(SymbolMap.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const images = [
      { id: '01', image: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg' },
    ];
    registerImages(images);
    const symbolMap = new SymbolMap(createDiv(), {
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

    expect(symbolMap.type).toEqual('symbol');
    expect(symbolMap.symbolLayer).toBeDefined();
    expect(symbolMap.labelLayer).toBeDefined();

    symbolMap.on('loaded', () => setTimeout(() => symbolMap.destroy(), 0));
  });

  it('event', () => {
    const symbolMap = new SymbolMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });

    return new Promise<void>((resolve, reject) => {
      symbolMap.on('symbolLayer:add', () => {
        try {
          expect(symbolMap.symbolLayer?.inited).toBeTruthy();
          expect(symbolMap.getLayerByName('symbolLayer')).toBeDefined();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => symbolMap.destroy(), 0);
      });
    });
  });
});
