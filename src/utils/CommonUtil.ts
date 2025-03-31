/*
 * Copyright (c) 2024-2025.  Bubble
 */

import moment from 'moment'

/**
 * 生成一个随机整数（范围左闭右开）
 * @param min 最小值（包含）
 * @param max 最大值（不包含）
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * 深拷贝
 * @param obj 拷贝源对象
 */
export function deepCopy<T>(obj: T): T {
  if (obj === undefined || obj == null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T
  }

  if (obj instanceof Array) {
    const cloneArray: T[] = []
    obj.forEach(item => cloneArray.push(item))
    return cloneArray.map(value => deepCopy<T>(value)) as T
  }

  if (obj instanceof Object) {
    const result = { ...(obj as { [key: string]: T }) } as { [key: string]: T }
    for (const attr in obj) {
      if ((obj as object).hasOwnProperty(attr)) {
        result[attr] = deepCopy<T>(obj[attr] as T)
      }
    }
    return result as T
  }

  return obj
}


export function isEmptyString(str: string): boolean {
  return str == null || str === ''
}

export function formatCount(count: number): string {
  if (count == null) return ''
  // 1万以下直接显示详细数据
  if (count < 10000) return count.toString()

  // 1万以上保留一位小数概括性显示，如 2.3万、16.9万
  const left = (count / 10000).toFixed(0)
  const right = (count % 10000).toString().substring(0, 1)
  return `${left}.${right}万`

}

export function copyFieldValue<T extends object, R extends object>(source: T, target: R): R {
  if (source == null || typeof source !== 'object') return {} as R
  Object.keys(source).forEach(key => {
    if (key in target) {
      (target as Record<string, unknown>)[key] = source[key as keyof T]
    }
  })
  return target
}
