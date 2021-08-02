import { each } from '@antv/util';
import { createDiv, removeDom } from '../../../helper/dom';
import { CategoryLegend } from '../../../../src';
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

    expect(Array.from(container.classList).includes('l7plot-legend')).toBe(true);
  });

  it('render', () => {
    const container = legend.getContainer();

    const title = container.getElementsByClassName('l7plot-legend__title')[0] as HTMLElement;
    expect(title.innerText).toBe('my title');

    const listItems = Array.from(container.getElementsByClassName('l7plot-legend__list-item')) as HTMLElement[];
    each(listItems, (listItem, index) => {
      expect(listItem.getElementsByClassName('l7plot-legend__category-value')[0].innerText).toBe(items[index].value);
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
    expect(div.getElementsByClassName('l7plot-legend').length).toBe(1);
    legend.destroy();

    expect(div.getElementsByClassName('l7plot-legend').length).toBe(0);
    removeDom(div);
  });
});
