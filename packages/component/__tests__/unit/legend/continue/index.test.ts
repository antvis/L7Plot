import { each } from '@antv/util';
import { createDiv, removeDom } from '../../../helper/dom';
import { ContinueLegend } from '../../../../src';
import Theme from '../../../../src/legend/continue/theme';

describe('continue-legend', () => {
  const div = createDiv('container');
  const min = 5;
  const max = 45;
  const legend = new ContinueLegend({
    parent: div,
    title: 'my title',
    min,
    max,
    colors: ['#35E0CC', '#31C4DC', '#44A2E4', '#3976E2', '#204CCF'],
  });

  it('init', () => {
    const container = legend.getContainer();

    expect(Array.from(container.classList).includes('l7plot-legend')).toBe(true);
  });

  it('render', () => {
    const container = legend.getContainer();

    expect(Array.from(container.classList).includes('l7plot-legend')).toBe(true);
    const title = container.getElementsByClassName('l7plot-legend__title')[0] as HTMLElement;
    expect(title.innerText).toBe('my title');

    const ranges = Array.from(container.getElementsByClassName('l7plot-legend__value-range')) as HTMLElement[];

    expect(ranges[0].innerText).toBe(min + '');
    expect(ranges[1].innerText).toBe(max + '');

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
