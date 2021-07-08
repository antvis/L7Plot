type DivOptions = { title: string; container: HTMLElement; id?: string; style?: string };

/**
 * 创建一个 div 节点，并放到 container，默认放到 body 上
 */
export function createDiv(
  { title, container, id, style }: DivOptions = {
    title: '',
    container: document.body,
    style: 'position: relative; height: 400px;',
  }
): HTMLDivElement {
  const div = document.createElement('div');
  if (id) {
    div.id = id;
  }
  if (style) {
    div.setAttribute('style', style);
  }
  if (title) {
    const titleDiv = document.createElement('div').appendChild(document.createTextNode(title));
    container.appendChild(titleDiv);
  }

  container.appendChild(div);

  return div;
}

/**
 * 移除 dom 元素
 * @param dom
 */
export function removeDom(dom: HTMLElement) {
  const parent = dom.parentNode;

  if (parent) {
    parent.removeChild(dom);
  }
}
