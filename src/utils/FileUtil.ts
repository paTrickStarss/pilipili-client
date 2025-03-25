/*
 * Copyright (c) 2025.  Bubble
 */

export default {

  /**
   * 将Bytes单位转为MB
   * @param size
   */
  getFileSizeInMegabytes(size: number): number {
    return size / (1024 * 1024)
  },

  /**
   * 去除文件后缀名
   * @param fileName
   */
  sliceOffExtension(fileName: string): string {
    return fileName.replace(/\.[^/.]+$/, '');
  }
}
