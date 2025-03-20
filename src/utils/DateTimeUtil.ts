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

  public getDate(): string {
    const now = moment()
    return now.format('YYYY-MM-DD')
  }

  public getDateTimeString(dateTime: string): string {
    const time = moment(dateTime)
    if (Math.abs(moment().diff(time, 'days')) > 7) {
      return time.format('YYYY-MM-DD')
    }
    return time.fromNow()
  }
}
