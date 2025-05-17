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
  admin: boolean
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
  /**
   * 关注数
   */
  followerCount: number
  /**
   * 粉丝数
   */
  fansCount: number
  /**
   * 动态数
   */
  dynamicCount: number
}

/**
 * 用户关注关系信息
 */
export interface UserRelaInfoType {
  /**
   * 关注发起者uid
   */
  fromUid: number
  /**
   * 被关注者uid
   */
  toUid: number
  /**
   * 关注
   */
  isFollow: boolean
  /**
   * 特别关注
   */
  isSpecial: boolean
  /**
   * 互相关注
   */
  isMutual: boolean
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
   * 作者用户昵称
   */
  nickname: string
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
  tagList: string[]
  /**
   * 视频状态：0审核中 1审核通过 2审核不通过 3下架
   */
  status: number
  /**
   * 发布时间
   */
  publishTime: string
  /**
   * 投稿时间
   */
  uploadTime: string
  /**
   * 最后一次更新时间
   */
  updateTime: string
  /**
   * 视频分区主ID
   */
  primaryCategoryId: number
  /**
   * 视频分区子ID
   */
  secondaryCategoryId: number

  /**
   * 播放数
   */
  viewCount: number
  /**
   * 弹幕数
   */
  danmakuCount: number
  /**
   * 评论数
   */
  commentCount: number
  /**
   * 点赞数
   */
  favorCount: number
  /**
   * 投币数
   */
  coinCount: number
  /**
   * 收藏数
   */
  collectCount: number
  /**
   * 转发数
   */
  repostCount: number
  /**
   * 点踩数
   */
  dewCount: number

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

/**
 * SimpleResponse
 */
export interface SimpleResponse {
  code?: number;
  data?: unknown;
  msg?: string;
  success?: boolean;
}
/**
 * PageResponse
 */
export interface PageResponse {
  code?: number;
  data?: unknown;
  msg?: string;
  pageNo: number;
  pageSize: number;
  total: number;
}

/**
 * QueryUserInfoDTO
 */
export interface QueryUserInfoDTO {
  authority?: number;
  authorityDesc?: string;
  avatarUrl?: string;
  backgroundUrl?: string;
  createTime?: Date;
  description?: string;
  email?: string;
  exp?: number;
  fansCount?: number;
  followerCount?: number;
  gender?: number;
  hcoin?: number;
  level?: number;
  nickname?: string;
  pcoin?: number;
  role?: number;
  uid?: number;
  updateTime?: Date;
  uuid?: string;
  validStatus?: number;
  vipStatus?: number;
}

/**
 * 视频分区列表
 */
export interface QueryCategoryListDTO {
  id: number
  name: string
}

/**
 * 上传任务消息（WebSocket通讯用）
 */
export interface UploadTaskMessage {
  /**
   * 上传任务ID（UUID）
   */
  taskId: string
  /**
   * 上传用户ID
   */
  username: string
  /**
   * 任务状态 0已创建未开始 1上传中 2上传完成 3错误
   */
  status: number
  /**
   * 当前上传进度 0~100 %
   */
  progress: number
  /**
   * 备注消息
   */
  msg: string
  /**
   * 消息发送时间戳
   */
  msgTime: number;
}
