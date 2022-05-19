import { isFunction, isObject, isString, isNumber, isBoolean, isArray } from '@antv/util';
import {
  ILayer,
  ScaleConfig,
  ColorAttr,
  SizeAttr,
  ShapeAttr,
  RotateAttr,
  AnimateAttr,
  StateAttribute,
  TextureAttr,
  FilterAttr,
  ScaleAttr,
} from '../../types';

/**
 * 获得映射函数
 * @param mappingFields
 * @param callback
 */
export function getMappingFunction(mappingFields: string[], callback: (data: Record<string, any>) => any) {
  return (...args: any[]) => {
    const params: Record<string, any> = {};

    mappingFields.forEach((f: string, index: number) => {
      params[f] = args[index];
    });

    delete params['undefined'];

    return callback(params);
  };
}

export class MappingAttribute {
  static shape(layer: ILayer, shape: ShapeAttr<string>) {
    /**
     * shape 的几种情况
     * layer.shape('cicle');
     * layer.shape('shape', ['cicle', 'square']);
     * layer.shape('x', (x) => 'cicle');
     * layer.shape('x*y', (x, y) => 'cicle');
     */
    if (isString(shape)) {
      layer.shape(shape);
    } else if (isFunction(shape)) {
      // TODO: shape mappingFields
      const mappingFields = [];
      layer.shape(mappingFields.join('*'), getMappingFunction(mappingFields, shape));
    } else if (isObject(shape)) {
      const field = shape.field ? shape.field : '';
      if (isFunction(shape.value)) {
        const mappingFields = isArray(field) ? field : field.split('*');
        layer.shape(field, getMappingFunction(mappingFields, shape.value));
      } else {
        layer.shape(field, shape.value);
      }
      // scale
      if (isString(field) && shape.scale) {
        MappingAttribute.scale(layer, field, shape.scale);
      }
    }
  }

  static size(layer: ILayer, size: SizeAttr) {
    /**
     * size 的几种情况
     * layer.size(10);
     * layer.size('size', [10, 20]);
     * layer.size('x', (x) => 10);
     * layer.size('x*y', (x, y) => 10);
     */
    if (isNumber(size)) {
      layer.size(size);
    } else if (isArray(size)) {
      layer.size(size);
    } else if (isFunction(size)) {
      // TODO: size mappingFields
      const mappingFields = [];
      layer.size(mappingFields.join('*'), getMappingFunction(mappingFields, size));
    } else if (isObject(size)) {
      const field = size.field ? size.field : '';
      if (isFunction(size.value)) {
        const mappingFields = isArray(field) ? field : field.split('*');
        layer.size(field, getMappingFunction(mappingFields, size.value));
      } else {
        layer.size(field, size.value);
      }
      // scale
      if (isString(field) && size.scale) {
        MappingAttribute.scale(layer, field, size.scale);
      }
    }
  }

  static color(layer: ILayer, color: ColorAttr) {
    /**
     * color 的几种情况
     * layer.color('red');
     * layer.color('color', ['red', 'blue']);
     * layer.color('x', (x) => 'red');
     * layer.color('x*y', (x, y) => 'red');
     */
    if (isString(color)) {
      layer.color(color);
    } else if (isFunction(color)) {
      // TODO: color mappingFields
      const mappingFields = [];
      layer.color(mappingFields.join('*'), getMappingFunction(mappingFields, color));
    } else if (isObject(color)) {
      const field = color.field ? color.field : '';
      if (isFunction(color.value)) {
        const mappingFields = isArray(field) ? field : field.split('*');
        layer.color(field, getMappingFunction(mappingFields, color.value));
      } else {
        layer.color(field, color.value);
      }
      // scale
      if (isString(field) && color.scale) {
        MappingAttribute.scale(layer, field, color.scale);
      }
    }
  }

  static scale(layer: ILayer, field: string | ScaleAttr, cfg?: ScaleConfig) {
    /**
     * scale 的几种情况
     * layer.scale('name', {type: 'cat'});
     * layer.scale({name: {type: 'cat'}, value: {type: 'linear'}});
     */
    layer.scale(field, cfg);
  }

  static rotate(layer: ILayer, rotate: RotateAttr) {
    /**
     * rotate 的几种情况
     * layer.rotate(45);
     * layer.rotate('rotate', [45, 90]);
     * layer.rotate('x', (x) => 45);
     * layer.rotate('x*y', (x, y) => 45);
     */
    if (isString(rotate)) {
      // TODO: L7 rotate
      // layer.rotate(rotate);
    } else if (isFunction(rotate)) {
      // TODO: rotate isFunction
    } else if (isObject(rotate)) {
      // TODO: L7 rotate
    }
  }

  static texture(layer: ILayer, texture: TextureAttr) {
    /**
     * texture 的几种情况
     * layer.texture('plane');
     */
    if (isString(texture)) {
      layer.texture(texture);
    }
  }

  static animate(layer: ILayer, animate: AnimateAttr) {
    /**
     * animate 的几种情况
     * layer.animate(true);
     * layer.animate({rings: 10});
     */
    if (isBoolean(animate) || isObject(animate)) {
      layer.animate(animate);
    }
  }

  static filter(layer: ILayer, filter: FilterAttr) {
    /**
     * scale 的几种情况
     * layer.filter('name', ({ name }) => name === 'name');
     */
    const field = filter.field ? filter.field : '';
    const mappingFields = isArray(field) ? field : field.split('*');
    layer.filter(mappingFields.join('*'), getMappingFunction(mappingFields, filter.value));
  }

  static style(layer: ILayer, style: unknown) {
    style && layer.style(style);
  }

  static state(layer: ILayer, state: StateAttribute) {
    const { active, select } = state;
    active && layer.active(active);
    select && layer.select(select);
  }
}
