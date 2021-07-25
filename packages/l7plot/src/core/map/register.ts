import { IImage } from '../../types';

/**
 * 自定义添加图片资源
 */
export const IMAGES_CACHE = new Map<string, IImage>();

export function registerImage(id: string, image: IImage) {
  IMAGES_CACHE.set(id, image);
}

export function registerImages(images: { id: string; image: IImage }[]) {
  images.forEach((iconFont) => {
    IMAGES_CACHE.set(iconFont.id, iconFont.image);
  });
}

export function getImage(id: string) {
  return IMAGES_CACHE.get(id);
}

export function hasImage(id: string) {
  return IMAGES_CACHE.has(id);
}

export function unregisterImage(id: string) {
  return IMAGES_CACHE.delete(id);
}

/**
 * 自定义添加第三方字体
 */
export const FONT_FACE_CACHE = new Map<string, string>();

export function registerFontFace(fontFamily: string, fontPath: string) {
  FONT_FACE_CACHE.set(fontFamily, fontPath);
}

export function unregisterFontFace(fontFamily: string) {
  return FONT_FACE_CACHE.delete(fontFamily);
}

/**
 * 自定义添加 iconfont
 */
export const ICON_FONT_CACHE = new Map<string, string>();

export function registerIconFont(name: string, fontUnicode: string) {
  ICON_FONT_CACHE.set(name, fontUnicode);
}

export function registerIconFonts(iconFonts: { name: string; fontUnicode: string }[]) {
  iconFonts.forEach((iconFont) => {
    ICON_FONT_CACHE.set(iconFont.name, iconFont.fontUnicode);
  });
}

export function unregisterIconFont(name) {
  return ICON_FONT_CACHE.delete(name);
}
