import { isPressing } from '../../utils';

/**
 * 是否开启手动（鼠标加快捷键）控制多选
 */
export const isGestureMultiSelect = (enabledMultiSelect?: boolean, triggerMultiSelectKey?: KeyboardEvent['key']) => {
  const isMultiSelect = enabledMultiSelect && triggerMultiSelectKey ? isPressing(triggerMultiSelectKey) : true;

  return isMultiSelect;
};
