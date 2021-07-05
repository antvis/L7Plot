import { BubbleMap } from '../../../../src';
import { createDiv } from '../../../helper/dom';
import data from '../../../data-set/point-temperature.json';

describe('point map', () => {
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
    expect(bubbleMap.pointLayer).toBeDefined();

    bubbleMap.destroy();
  });
});
