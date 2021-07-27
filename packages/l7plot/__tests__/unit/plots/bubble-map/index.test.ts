import { BubbleMap } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/bubble-map/constants';
import { createDiv } from '../../../helper/dom';
import data from '../../../data-set/point-temperature.json';

describe('bubble map', () => {
  it('defaultOptions', () => {
    expect(BubbleMap.DefaultOptions).toEqual(DEFAULT_OPTIONS);
  });

  it('source', () => {
    const bubbleMap = new BubbleMap(createDiv(), {
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
      label: {
        field: 't',
        style: {
          fill: '#fff',
          opacity: 0.6,
          fontSize: 12,
        },
      },
    });

    expect(bubbleMap.type).toEqual('bubble');
    expect(bubbleMap.bubbleLayer).toBeDefined();
    expect(bubbleMap.labelLayer).toBeDefined();

    bubbleMap.on('loaded', () => setTimeout(() => bubbleMap.destroy(), 0));
  });

  it('event', () => {
    const bubbleMap = new BubbleMap(createDiv(), {
      source: {
        data: [{ y: 19.1, t: 24.6, s: '海南', x: 108.6167 }],
        parser: { type: 'json' },
      },
    });

    return new Promise<void>((resolve, reject) => {
      bubbleMap.on('bubbleLayer:add', () => {
        try {
          expect(bubbleMap.bubbleLayer?.inited).toBeTruthy();
          expect(bubbleMap.getLayerByName('bubbleLayer')).toBeDefined();
          resolve();
        } catch (err) {
          reject(err);
        }
        setTimeout(() => bubbleMap.destroy(), 0);
      });
    });
  });
});
