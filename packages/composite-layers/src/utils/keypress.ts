const KeyPressMap: Record<string, boolean> = {};

window.addEventListener('keydown', (event) => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event
  if (event.isComposing || event.keyCode === 229) {
    return;
  }
  KeyPressMap[event.key] = true;
});

window.addEventListener('keyup', (e) => {
  KeyPressMap[e.key] = false;
});

/**
 * 是否按下键盘物理按键 Key
 * https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key
 */
export const isPressing = (key: string) => {
  return !!KeyPressMap[key];
};
