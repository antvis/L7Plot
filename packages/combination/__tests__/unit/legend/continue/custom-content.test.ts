import { createDiv, removeDom } from '../../../helper/dom';
import { ContinueLegend } from '../../../../src';

describe('category legend customContent', () => {
  const div = createDiv('container');
  const min = 5;
  const max = 45;
  const legend = new ContinueLegend({
    parent: div,
    title: 'xx',
    min,
    max,
    colors: ['#35E0CC', '#31C4DC', '#44A2E4', '#3976E2', '#204CCF'],
    customContent: (title: string, min: number, max: number, colors: string[]) => {
      return `
        <div class="l7plot-legend custom-html-legend">
          <div class="l7plot-legend-title">Legend Title ${title}</div>
          <div class="l7plot-legend__range">${min}</div>
          <div style="width: 20px; height: 130px; background-image: linear-gradient(${colors.join(', ')})"></div>
          <div class="l7plot-legend__range">${max}</div>
        </div>
        `;
    },
    domStyles: {
      'l7plot-legend__range': { width: '20px', textAlign: 'center' },
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

    const ranges = Array.from(container.getElementsByClassName('l7plot-legend__range')) as HTMLElement[];
    expect(ranges[0].innerText).toBe(min + '');
    expect(ranges[1].innerText).toBe(max + '');
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
