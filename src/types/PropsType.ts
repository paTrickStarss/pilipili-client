/*
 * Copyright (c) 2024. Bubble
 */

/**
 * 组件属性类型
 */

import type { CommentDTOType } from '@/types/ApiRespType'

/**
 * 导航栏菜单配置信息
 */
export interface MenuItemType {
  id: number
  label: string
  routePath: string
  url?: string
  desc?: string
}

/**
 * 菜单组件传递属性
 */
export interface MenuItemProps {
  menuItems: MenuItemType[]
}

/**
 * 收藏夹信息
 */
export interface CollectionInfoType {
  id: number
  name: string
  size: number
  desc?: string
}

/**
 * 视频卡片信息
 */
// export interface VideoCardInfoType {
//   /**
//    * ID
//    */
//   id: number
//   /**
//    * 封面URL
//    */
//   coverUrl: string
//   /**
//    * 详情页URL
//    */
//   linkUrl: string
//   /**
//    * 标题
//    */
//   title: string
//   /**
//    * 作者名称
//    */
//   authorName: string
//   /**
//    * 发布日期
//    */
//   date: string
// }

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
 * 视频页信息
 */
export interface VideoPageInfoType {
  vid: number
  uid: number
  title?: string
  coverUrl?: string
  contentUrl?: string
  desc?: string
}

export interface VideoPageInfoProps {
  videoInfo: VideoPageInfoType
}

/**
 * 评论卡片组件参数
 */
export interface CommentCardInfoType {
  commentInfo: CommentDTOType
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

/**
 * Tab图标样式
 */
export interface NavTabItemType {
  id: number
  label: string
  linkUrl: string
  styleClass: string
  color: string
  countShow?: boolean
  countNum?: number
}

export interface RadioListType {
  id: number
  label: string
}

/**
 * 视频卡片信息
 */
export interface VideoCardInfoType {
  id: number
  coverUrl: string
  linkUrl: string
  title: string
  duration: string
  date: string
  playCount: number
  danmakuCount: number
  progress: number
}

/**
 * 侧边导航栏项信息
 */
export interface NavSliderBarItemProps {
  id: number
  label: string
  /**
   * 自动打开第一个链接
   */
  autoOpen: boolean
  groupItem: NavSliderGroupItemProps[]
  route?: string
}
/**
 * 侧边导航栏分组子项信息
 */
export interface NavSliderGroupItemProps {
  id: number
  label: string
  route: string
}

/**
 * 视频上传信息
 */
export interface VideoUploadingItemProps {
  id: number
  fileName: string
  fileSize: number
  progress: number
  speed: number
  eta: number
  paused: boolean
}

/**
 * 单选按钮信息
 */
export interface RadioInfoProps {
  key: number;
  label: string;
}

/**
 * 下拉选择框信息
 */
export interface SelectorInfoProps {
  key: number
  label: string
}


