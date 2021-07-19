export function hasClass(elements: HTMLElement, cName: string) {
  return !!elements.className.match(new RegExp(`(\\s|^)${cName}(\\s|$)`));
}

export function clearDom(container: HTMLElement) {
  const children = container.childNodes;
  const length = children.length;
  for (let i = length - 1; i >= 0; i--) {
    container.removeChild(children[i]);
  }
}
