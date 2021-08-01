import { each } from '@antv/util';
import { createDiv, removeDom } from '../../../helper/dom';
import { CategoryLegend } from '../../../../src';
import * as Constants from '../../../../src/legend/category/constants';
import Theme from '../../../../src/legend/category/theme';

describe('category-legend', () => {
  const div = createDiv('container');
  const items = [
    { value: '100-200', color: 'yellow' },
    { value: '200-300', color: 'blue' },
    { value: '300-500', color: 'red' },
  ];
  const legend = new CategoryLegend({
    parent: div,
    title: 'my title',
    items,
  });

  it('init', () => {
    const container = legend.getContainer();

    expect(Array.from(container.classList).includes('l7plot-category-legend')).toBe(true);
    each(Theme[Constants.CONTAINER_CLASS], (val, key) => {
      if (!['boxShadow', 'fontFamily', 'padding'].includes(key)) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(container.style[key] + '').toBe(val + '');
      }
    });
  });

  it('render', () => {
    const container = legend.getContainer();

    expect(Array.from(container.classList).includes('l7plot-category-legend')).toBe(true);
    const title = container.getElementsByClassName('l7plot-category-legend-title')[0] as HTMLElement;
    expect(title.innerText).toBe('my title');

    const listItems = Array.from(container.getElementsByClassName('l7plot-category-legend-list-item')) as HTMLElement[];
    each(listItems, (listItem, index) => {
      expect(listItem.getElementsByClassName('l7plot-category-legend-value')[0].innerText).toBe(items[index].value);
    });

    each(Theme[Constants.CONTAINER_CLASS], (val, key) => {
      if (!['boxShadow', 'fontFamily', 'padding'].includes(key)) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(container.style[key] + '').toBe(val + '');
      }
    });

    each(Theme, (val, key) => {
      const elements = container.getElementsByClassName(key);
      each(elements, (element) => {
        each(val, (cssVal, cssKey) => {
          if (!['boxShadow', 'fontFamily', 'padding'].includes(cssKey)) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(element.style[cssKey] + '').toBe(cssVal + '');
          }
        });
      });
    });
  });

  it('hide/show', () => {
    legend.hide();
    const container = legend.getContainer();

    expect(container.style.visibility).toBe('hidden');
    legend.show();
    expect(container.style.visibility).toBe('visible');
  });

  it('destroy', () => {
    expect(div.getElementsByClassName('l7plot-category-legend').length).toBe(1);
    legend.destroy();

    expect(div.getElementsByClassName('l7plot-category-legend').length).toBe(0);
    removeDom(div);
  });
});
