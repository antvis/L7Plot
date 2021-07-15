import { each } from '@antv/util';
import { createDiv, removeDom } from '../../helper/dom';
import { Legend } from '../../../src';

describe('legend customContent', () => {
  const div = createDiv('container');
  const items = [
    { value: '100', color: 'yellow' },
    { value: '200', color: 'blue' },
    { value: '300', color: 'red' },
  ];
  const legend = new Legend({
    parent: div,
    title: 'xx',
    items,
    customContent: (title: string, data: any[]) => {
      return `
        <div class="l7plot-legend custom-html-legend">
          <div class="l7plot-legend-title">Legend Title ${title}</div>
          <ul class="l7plot-legend-list">
            ${data
              .map(
                (item) => `
              <li class="l7plot-legend-list-item my-list-item">
                <span class="l7plot-tooltip-marker" style="background:${item.color}"></span>
                <span class="l7plot-legend-value">${item.value}</span>
              <li>`
              )
              .join('')}
          </ul>
        </div>
        `;
    },
    domStyles: {
      'l7plot-legend-list': { display: 'flex' },
      'l7plot-legend-list-item': { alignItems: 'flex-start', flexDirection: 'column', marginBottom: '0px' },
      'l7plot-tooltip-marker': { width: '40px', height: '20px', marginRight: '0px', marginBottom: '2px' },
    },
  });

  it('init', () => {
    const container = legend.getContainer();

    expect(Array.from(container.classList).includes('l7plot-legend')).toBe(true);
    expect(Array.from(container.classList).includes('custom-html-legend')).toBe(true);
  });

  it('render', () => {
    const container = legend.getContainer();

    expect(Array.from(container.classList).includes('l7plot-legend')).toBe(true);
    expect(Array.from(container.classList).includes('custom-html-legend')).toBe(true);

    const title = container.getElementsByClassName('l7plot-legend-title')[0] as HTMLElement;
    expect(title.innerText).toBe('Legend Title xx');

    const listItems = Array.from(container.getElementsByClassName('l7plot-legend-list-item')) as HTMLElement[];
    each(listItems, (listItem, index) => {
      expect(Array.from(listItem.classList).includes('my-list-item')).toBe(true);
      expect(listItem.getElementsByClassName('l7plot-legend-value')[0].innerText).toBe(`${items[index].value}`);
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
    expect(div.getElementsByClassName('custom-html-legend').length).toBe(1);
    legend.destroy();

    expect(div.getElementsByClassName('custom-html-legend').length).toBe(0);
    removeDom(div);
  });
});
