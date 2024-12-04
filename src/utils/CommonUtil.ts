/*
 * Copyright (c) 2024. Bubble
 */

/**
 * 在新标签页打开链接
 * @param url 链接
 */
export function openLink(url: string): void {
  window.open(url, "_blank");
}

/**
 * 生成一个随机整数（范围左闭右开）
 * @param min 最小值（包含）
 * @param max 最大值（不包含）
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 深拷贝
 * @param obj 拷贝源对象
 */
export function deepCopy<T>(obj: T): T {
  if (obj === undefined || obj == null || typeof obj !== "object") {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    const cloneArray: T[] = []
    obj.forEach(item => cloneArray.push(item));
    return cloneArray.map(value => deepCopy<T>(value)) as T;
  }

  if (obj instanceof Object) {
    const result = {...(obj as {[key: string]: T})} as {[key: string]: T};
    for (const attr in obj) {
      if ((obj as object).hasOwnProperty(attr)) {
        result[attr] = deepCopy<T>(obj[attr] as T);
      }
    }
    return result as T;
  }

  return obj;
}
