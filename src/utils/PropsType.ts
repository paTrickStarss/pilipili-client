/*
 * Copyright (c) 2024. Bubble
 */
export interface MenuItemType {
  id: number
  label: string
  url: string
  desc?: string
}

export interface MenuItemProps {
  menuItems: MenuItemType[]
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
  username: string
  /**
   * 个人空间URL
   */
  spaceUrl: string
  /**
   * 个人介绍
   */
  desc?: string
}

/**
 * 视频详情页信息
 */
export interface VideoInfoType {
  /**
   * 视频VID
   */
  vid: number
  /**
   * 视频内容URL
   */
  contentUrl: string
  /**
   * 视频标题
   */
  title: string
  /**
   * 视频简介
   */
  desc?: string
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
}

/**
 * 视频卡片信息
 */
export interface VideoCardInfoType {
  /**
   * ID
   */
  id: number
  /**
   * 封面URL
   */
  coverUrl: string
  /**
   * 详情页URL
   */
  linkUrl: string
  /**
   * 标题
   */
  title: string
  /**
   * 作者名称
   */
  authorName: string
  /**
   * 作者个人空间URL
   */
  authorSpaceUrl: string
  /**
   * 发布日期
   */
  date: string
}

export interface VideoCardFlowInfoType {
  /**
   * 视频卡片信息
   */
  videoCardInfo: VideoCardInfoType
  /**
   * ID
   */
  id: number
  /**
   * 是否正在加载
   */
  loading: boolean
}

/**
 * 轮播图信息
 */
export interface CarouselInfoType {
  id: number
  imageUrl: string
  linkUrl: string
  desc?: string
}
