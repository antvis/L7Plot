// 最大比对层级
const MAX_MIX_LEVEL = 5;

const toString = new Object().toString;

const isType = (value: unknown, type: string): boolean => toString.call(value) === '[object ' + type + ']';

const isArray = (value: unknown): boolean => {
  return isType(value, 'Array');
};

const isObjectLike = (value: unknown): boolean => {
  /**
   * isObjectLike({}) => true
   * isObjectLike([1, 2, 3]) => true
   * isObjectLike(Function) => false
   */
  return typeof value === 'object' && value !== null;
};

const isPlainObject = (value: unknown): boolean => {
  /**
   * isObjectLike(new Foo) => false
   * isObjectLike([1, 2, 3]) => false
   * isObjectLike({ x: 0, y: 0 }) => true
   */
  if (!isObjectLike(value) || !isType(value, 'Object')) {
    return false;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
};

const deep = (target: Record<string, any>, source: Record<string, any>, level?: number, maxLevel?: number) => {
  level = level || 0;
  maxLevel = maxLevel || MAX_MIX_LEVEL;
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const value = source[key];
      if (!value) {
        // null 、 undefined 等情况直接赋值
        target[key] = value;
      } else {
        if (isPlainObject(value)) {
          if (!isPlainObject(target[key])) {
            target[key] = {};
          }
          if (level < maxLevel) {
            deep(target[key], value, level + 1, maxLevel);
          } else {
            // 层级过深直接赋值，性能问题
            target[key] = source[key];
          }
        } else if (isArray(value)) {
          target[key] = [];
          target[key] = target[key].concat(value);
        } else {
          target[key] = value;
        }
      }
    }
  }
};

/**
 * deepAssign 对象深度合并
 * deepAssign 功能类似 deepMix
 * 不同点在于 deepAssign 会将 null undefined 等类型直接覆盖给 source
 */
export const deepAssign = (target: Record<string, any>, ...sources: Record<string, any>[]): any => {
  for (let i = 0; i < sources.length; i += 1) {
    deep(target, sources[i]);
  }
  return target;
};
