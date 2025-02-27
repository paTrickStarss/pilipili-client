/*
 * Copyright (c) 2025. Bubble
 */

/**
 * 登录请求体
 */
export interface LoginReq {
  username: string
  password: string
  signature?: string
}

/**
 * 注册请求体
 */
export interface RegisterReq {
  /**
   * 昵称
   */
  nickname?: string
  /**
   * 密码（加密）
   */
  password: string
  signature?: string
  /**
   * 电子邮箱
   */
  email?: string
}

/**
 * 更新用户信息请求体
 */
export interface UpdateUserInfoReq {
  /**
   * 用户ID
   */
  uid: number
  /**
   * UUID
   */
  uuid?: string
  /**
   * 昵称
   */
  nickname?: string
  /**
   * 密码（加密）
   */
  password?: string
  /**
   * 性别 0未知 1男 2女
   */
  gender?: number
  /**
   * 头像URL
   */
  avatarUrl?: string
  /**
   * 背景图URL
   */
  backgroundUrl?: string
  /**
   * 电子邮箱
   */
  email?: string
  /**
   * 个人介绍
   */
  description?: string
  /**
   * 会员状态：0普通用户 1月度大会员 2季度大会员 3年度大会员 4云视听月度大会员 5云视听季度大会员 6云视听年度大会员
   */
  vipStatus?: number
  /**
   * 小闪电认证：0无认证 1名人认证 2机构认证
   */
  authority?: number
  /**
   * 小闪电认证说明
   */
  authorityDesc?: string
  /**
   * 账号状态：0已注销 1正常 2封禁中
   */
  validStatus?: number
  /**
   * 账号类型：0普通账号 1管理员账号
   */
  role?: number
  /**
   * 等级经验值
   */
  exp?: number
  /**
   * 硬币（普通代币）
   */
  hCoin?: number
  /**
   * P币（充值代币）
   */
  pCoin?: number
}
