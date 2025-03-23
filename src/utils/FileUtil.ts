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
  }
}
