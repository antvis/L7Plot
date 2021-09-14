import { Dot, registerImages } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/dot/constants';
import { createDiv } from '../../../helper/dom';
import data from '../../../data-set/point-temperature.json';

describe('point', () => {
  it('defaultOptions', () => {
    expect(Dot.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const images = [
      { id: '01', image: 'https://gw.alipayobjects.com/zos/basement_prod/604b5e7f-309e-40db-b95b-4fac746c5153.svg' },
    ];
    registerImages(images);
    const dotMap = new Dot(createDiv(), {
      source: {
        data: data.list,
        parser: { type: 'json', x: 'j', y: 'w' },
      },
      color: {
        field: 't',
        value: ['#34B6B7', '#4AC5AF', '#5FD3A6', '#7BE39E', '#A1EDB8', '#CEF8D6'],
      },
      size: {
        field: 't',
        value: [0, 20],
      },
      style: {
        opacity: 0.5,
        strokeWidth: 0,
      },
      label: {
        field: 't',
        style: {
          fill: '#fff',
          opacity: 0.6,
          fontSize: 12,
        },
      },
    });

    expect(dotMap.type).toEqual('dot');
    expect(dotMap.dotLayer).toBeDefined();
    expect(dotMap.labelLayer).toBeDefined();

    dotMap.on('loaded', () => setTimeout(() => dotMap.destroy(), 0));
  });

  it('event', () => {
    const dotMap = new Dot(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });

    return new Promise<void>((resolve, reject) => {
      dotMap.on('pointLayer:add', () => {
        try {
          expect(dotMap.dotLayer?.layer.inited).toBeTruthy();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => dotMap.destroy(), 0);
      });
    });
  });

  it('legend', () => {
    const dotMap = new Dot(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
      color: {
        field: 't',
        value: ['#34B6B7', '#4AC5AF', '#5FD3A6', '#7BE39E', '#A1EDB8', '#CEF8D6'],
      },
      legend: { position: 'bottomleft' },
    });

    return new Promise<void>((resolve, reject) => {
      dotMap.on('loaded', () => {
        try {
          expect(dotMap.legendControl).toBeDefined();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => dotMap.destroy(), 0);
      });
    });
  });
});
