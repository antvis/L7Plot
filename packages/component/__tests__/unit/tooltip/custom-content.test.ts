import { each } from '@antv/util';
import { createDiv, removeDom } from '../../helper/dom';
import { Tooltip } from '../../../src';

describe('tooltip customContent', () => {
  const div = createDiv('container');
  const items = [
    { name: 'china', value: '100' },
    { name: 'india', value: '200' },
    { name: 'england', value: '500' },
  ];
  const tooltip = new Tooltip({
    parent: div,
    title: 'xx',
    items,
    customContent: (title: string, data: any[]) => {
      return `
        <div class="l7plot-tooltip custom-html-tooltip">
          <div class="l7plot-tooltip-title">My Title ${title}</div>
          <ul class="l7plot-tooltip-list">
            ${data
              .map((item) => `<li class="l7plot-tooltip-list-item my-list-item">My Value: ${item.value}<li>`)
              .join('')}
          </ul>
        </div>
        `;
    },
  });

  it('init', () => {
    const container = tooltip.getContainer();

    expect(Array.from(container.classList).includes('l7plot-tooltip')).toBe(true);
    expect(Array.from(container.classList).includes('custom-html-tooltip')).toBe(true);
  });

  it('render', () => {
    tooltip.render();
    const container = tooltip.getContainer();

    expect(Array.from(container.classList).includes('l7plot-tooltip')).toBe(true);
    expect(Array.from(container.classList).includes('custom-html-tooltip')).toBe(true);

    const title = container.getElementsByClassName('l7plot-tooltip-title')[0] as HTMLElement;
    expect(title.innerText).toBe('My Title xx');

    const listItems = Array.from(container.getElementsByClassName('l7plot-tooltip-list-item')) as HTMLElement[];
    each(listItems, (listItem, index) => {
      expect(Array.from(listItem.classList).includes('my-list-item')).toBe(true);
      expect(listItem.innerText).toBe(`My Value: ${items[index].value}`);
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
    expect(div.getElementsByClassName('custom-html-tooltip').length).toBe(1);
    tooltip.destroy();

    expect(div.getElementsByClassName('custom-html-tooltip').length).toBe(0);
    removeDom(div);
  });
});
