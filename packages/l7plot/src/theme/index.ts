import { get, lowerCase } from '@antv/util';

import { createTheme } from './util';

const defaultTheme = createTheme({});

// 所有已经存在的主题
const Themes: Record<string, Record<string, any>> = {
  default: defaultTheme,
};

/**
 * 获取主题配置信息。
 */
export function getTheme(theme: string): Record<string, any> {
  return get(Themes, lowerCase(theme), Themes['default']);
}

/**
 * 注册新的主题配置信息。
 */
export function registerTheme(theme: string, value: Record<string, any>) {
  Themes[lowerCase(theme)] = createTheme(value);
}
