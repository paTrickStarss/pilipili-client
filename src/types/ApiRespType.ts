/*
 * Copyright (c) 2024. Bubble
 */

/**
 * 请求响应数据类型
 */

/**
 * 登录信息
 */
export interface LoginInfoType {
  username: string
  accessToken: string
  expires: number
}

/**
 * 用户信息
 */
export interface UserInfoType {
  /**
   * 用户ID
   */
  uid: number
  /**
   * UUID
   */
  uuid: string
  /**
   * 用户名
   */
  nickname: string
  /**
   * 性别 1男 2女 0未知
   */
  gender: number
  /**
   * 头像URL
   */
  avatarUrl: string
  /**
   * 背景图URL
   */
  backgroundUrl: string
  /**
   * 邮箱
   */
  email: string
  /**
   * 个人介绍
   */
  description: string
  /**
   * 会员状态：0普通用户 1月度大会员 2季度大会员 3年度大会员 4云视听月度大会员 5云视听季度大会员 6云视听年度大会员
   */
  vipStatus: number
  /**
   * 小闪电认证：0无认证 1名人认证 2机构认证
   */
  authority: number
  /**
   * 小闪电认证说明
   */
  authorityDesc: string
  /**
   * 账号状态：0已注销 1正常 2封禁中
   */
  validStatus: number
  /**
   * 账号类型：0普通账号 1管理员账号
   */
  role: number
  /**
   * 等级经验值
   */
  exp: number
  /**
   * 硬币（普通代币）
   */
  hcoin: number
  /**
   * P币（充值代币）
   */
  pcoin: number
  /**
   * 用户等级
   */
  level: number
}

/**
 * 视频详情信息
 */
export interface VideoDTOType {
  /**
   * 视频VID
   */
  vid: number
  /**
   * 作者UID
   */
  uid: number
  /**
   * 视频标题
   */
  title: string
  /**
   * 视频简介
   */
  description: string
  /**
   * 封面URL
   */
  coverUrl: string
  /**
   * 视频内容URL
   */
  contentUrl: string
  /**
   * 时长
   */
  duration: number
  /**
   * 视频来源 0自制 1转载
   */
  sourceType: number
  /**
   * 转载声明：0可自由转载 1未经许可不可转载
   */
  reprintPermit: number
  /**
   * 视频标签
   */
  tag: string[]
  /**
   * 视频状态：0审核中 1审核通过 2审核不通过 3下架
   */
  status: number
  /**
   * 发布时间
   */
  publishDate: string
}

/**
 * 视频统计信息
 */
export interface VideoStatisticsDTOType {
  vid: number
  /**
   * 点赞数
   */
  favor: number
  /**
   * 投币数
   */
  coin: number
  /**
   * 收藏数
   */
  collect: number
  /**
   * 转发数
   */
  repost: number
}

export interface CommentDTOType {
  /**
   * 评论ID
   */
  id: number
  /**
   * 回复评论ID
   */
  toId: number
  /**
   * 评论用户UID
   */
  uid: number
  /**
   * 评论用户名
   */
  username: string
  /**
   * 评论视频VID
   */
  vid: number
  /**
   * 评论内容
   */
  content: string
  /**
   * 点赞数
   */
  like: number
  /**
   * 创建日期
   */
  createDate: string
}
