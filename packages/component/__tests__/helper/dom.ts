/**
 * 创建一个 div 节点，并放到 container，默认放到 body 上
 */
export const createDiv = (id: string) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  div.id = id;

  return div;
};

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
