import { each } from '@antv/util';
import { createDiv, removeDom } from '../../helper/dom';
import { Tooltip } from '../../../src';
import * as Constants from '../../../src/tooltip/constants';
import Theme from '../../../src/tooltip/theme';

describe('tooltip', () => {
  const div = createDiv('container');
  const items = [
    { name: 'china', value: '100', color: 'yellow' },
    { name: 'india', value: '200', color: 'blue' },
    { name: 'england', value: '500', color: 'red' },
  ];
  const tooltip = new Tooltip({
    parent: div,
    title: 'my title',
    items,
  });

  it('init', () => {
    const container = tooltip.getContainer();

    expect(Array.from(container.classList).includes('l7plot-tooltip')).toBe(true);
    each(Theme[Constants.CONTAINER_CLASS], (val, key) => {
      if (!['transition', 'boxShadow', 'fontFamily', 'padding'].includes(key)) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(container.style[key] + '').toBe(val + '');
      }
    });
  });

  it('render', () => {
    const container = tooltip.getContainer();

    expect(Array.from(container.classList).includes('l7plot-tooltip')).toBe(true);
    const title = container.getElementsByClassName('l7plot-tooltip__title')[0] as HTMLElement;
    expect(title.innerText).toBe('my title');

    const listItems = Array.from(container.getElementsByClassName('l7plot-tooltip__list-item')) as HTMLElement[];
    each(listItems, (listItem, index) => {
      expect(listItem.getElementsByClassName('l7plot-tooltip__value')[0].innerText).toBe(items[index].value);
    });

    each(Theme[Constants.CONTAINER_CLASS], (val, key) => {
      if (!['transition', 'boxShadow', 'fontFamily', 'padding'].includes(key)) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(container.style[key] + '').toBe(val + '');
      }
    });

    each(Theme, (val, key) => {
      const elements = container.getElementsByClassName(key);
      each(elements, (element) => {
        each(val, (cssVal, cssKey) => {
          if (!['transition', 'boxShadow', 'fontFamily', 'padding'].includes(cssKey)) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(element.style[cssKey] + '').toBe(cssVal + '');
          }
        });
      });
    });
  });

  it('hide/show', () => {
    tooltip.hide();
    const container = tooltip.getContainer();

    expect(container.style.visibility).toBe('hidden');
    tooltip.show();
    expect(container.style.visibility).toBe('visible');
  });

  it('destroy', () => {
    expect(div.getElementsByClassName('l7plot-tooltip').length).toBe(1);
    tooltip.destroy();

    expect(div.getElementsByClassName('l7plot-tooltip').length).toBe(0);
    removeDom(div);
  });
});
