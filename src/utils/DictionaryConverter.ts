/*
 * Copyright (c) 2024. Bubble
 */

/**
 * 字典转化类
 * @author Bubble
 */
export class DictionaryConverter {
  // 单例模式
  private static _instance: DictionaryConverter

  private constructor() {}

  public static get instance() {
    if (!DictionaryConverter._instance) {
      DictionaryConverter._instance = new DictionaryConverter()
    }
    return DictionaryConverter._instance
  }

  /**
   * 获取 视频来源类型 文本
   * @param sourceType
   */
  public getSourceTypeName(sourceType: number): string {
    let name = ''
    switch (sourceType) {
      case 0:
        name = '自制'
        break
      case 1:
        name = '转载'
        break
      default:
        break
    }

    return name
  }

  /**
   * 获取 转载声明 文本
   * @param reprintPermit
   */
  public getReprintPermitMsg(reprintPermit: number): string {
    let msg = ''
    switch (reprintPermit) {
      case 0:
        msg = '可自由转载'
        break
      case 1:
        msg = '未经许可不可转载'
        break
      default:
        break
    }
    return msg
  }
}
