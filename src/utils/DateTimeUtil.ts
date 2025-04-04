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

  private timeRegexHourMinutesSeconds: RegExp = /^([0-9]|[01][0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/
  private timeRegexMinutesSeconds: RegExp = /^([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/
  private timeRegexSeconds: RegExp = /^([0-9]|[0-5][0-9])$/

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

  /**
   * 从秒数转为时间字符串
   * @param seconds
   */
  public getFormatTextFromSeconds(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const remainingSeconds = seconds % 3600
    const minutes = Math.floor(remainingSeconds / 60)
    const remainingSecondsAfterMinutes = remainingSeconds % 60

    const paddedHours = hours.toFixed(0).padStart(2, '0')
    const paddedMinutes = minutes.toFixed(0).padStart(2, '0')
    const paddedSeconds = remainingSecondsAfterMinutes.toFixed(0).padStart(2, '0')

    if (hours > 0) {
      return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`
    }
    return `${paddedMinutes}:${paddedSeconds}`
  }

  /**
   * 从时间字符串转为秒数
   * @param time
   */
  public getSecondsFromText(time: string): number | undefined {
    if (this.timeRegexHourMinutesSeconds.test(time)) {
      const splitArr = time.split(':')
      const hours = Number(splitArr[0])
      const minutes = Number(splitArr[1])
      const seconds = Number(splitArr[2])
      return (hours*3600 + minutes*60 + seconds)
    }
    if (this.timeRegexMinutesSeconds.test(time)) {
      const splitArr = time.split(':')
      const minutes = Number(splitArr[0])
      const seconds = Number(splitArr[1])
      return (minutes*60 + seconds)
    }
    if (this.timeRegexSeconds.test(time)) {
      return Number(time)
    }
    return undefined
  }
}
