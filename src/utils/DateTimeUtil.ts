/*
 * Copyright (c) 2025.  Bubble
 */

import moment from 'moment'

export class DateTimeUtil {
  // 单例模式
  private static _instance: DateTimeUtil

  private constructor() {}

  public static get instance() {
    if (!DateTimeUtil._instance) {
      DateTimeUtil._instance = new DateTimeUtil()
    }
    return DateTimeUtil._instance
  }

  /**
   * 获取日期字符串
   * @param dateTime
   */
  public getDate(dateTime?: string): string {
    return this.getDateTime(dateTime, 'YYYY-MM-DD')
  }

  /**
   * 获取日期时间字符串
   * @param dateTime
   * @param format
   */
  public getDateTime(dateTime?: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    let time
    if (dateTime) {
      time = moment(dateTime)
    } else {
      time = moment()
    }
    return time.format(format)
  }

  /**
   * 获取日期时间书面化输出
   * @param dateTime
   */
  public getDateTimeString(dateTime: string): string {
    const time = moment(dateTime)
    if (Math.abs(moment().diff(time, 'days')) > 7) {
      return time.format('YYYY-MM-DD')
    }
    return time.fromNow()
  }
}
