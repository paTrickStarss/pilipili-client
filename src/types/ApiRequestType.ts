/*
 * Copyright (c) 2025. Bubble
 */


/**
 * 分页查询请求参数
 */
export interface PageQueryReq {
  pageNo?: number;
  pageSize?: number;
}
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


/**
 * UpdateVideoInfoReq
 */
export interface UpdateVideoInfoReq {
  contentUrl?: string;
  coverUrl?: string;
  description?: string;
  duration?: number;
  primaryCategoryId?: number;
  publishTime?: Date;
  reprintPermit?: number;
  secondaryCategoryId?: number;
  sourceType?: number;
  status?: number;
  tag?: string;
  title?: string;
  vid?: number;
}
/**
 * CreateVideoInfoReq
 */
export interface CreateVideoInfoReq {
  contentUrl?: string;
  coverUrl?: string;
  description?: string;
  /**
   * 视频时长（秒）
   */
  duration: number;
  /**
   * 视频主分区ID
   */
  primaryCategoryId: number;
  /**
   * 发布时间（过审时间/定时发布时间）
   */
  publishTime?: Date;
  /**
   * 转载声明：0可自由转载 1未经许可不可转载
   */
  reprintPermit?: number;
  secondaryCategoryId?: number;
  /**
   * 类型：0自制 1转载
   */
  sourceType?: number;
  /**
   * 视频标签 多标签用半角逗号隔开
   */
  tag?: string;
  /**
   * 视频标题
   */
  title: string;
  /**
   * 投稿用户ID
   */
  uid: number;
  /**
   * 上传任务ID
   */
  taskId: string
}

/**
 * PageQueryVideoInfoReq
 */
export interface PageQueryVideoInfoReq extends PageQueryReq {
  keyword?: string;
  status?: number;
  publishDateEnd?: string;
  publishDateStart?: string;
  tag?: string;
  title?: string;
  uid: number;
}
/**
 * UpdateCollectionInfoReq
 */
export interface UpdateCollectionInfoReq {
  collectionId: number;
  description?: string;
  himitsu?: number;
  title?: string;
}
/**
 * SaveCollectionInfoReq
 */
export interface SaveCollectionInfoReq {
  description?: string;
  himitsu?: number;
  title: string;
  uid: number;
}
/**
 * ChangeCollectionVideoReq
 */
export interface ChangeCollectionVideoReq {
  collectionVideoList: CollectionVideo[];
}
/**
 * CollectionVideo
 */
export interface CollectionVideo {
  collectionId?: number;
  vid?: number;
}

/**
 * PageQueryCollectionInfoReq
 */
export interface PageQueryCollectionInfoReq extends PageQueryReq {
  uid: number;
}

/**
 * PageQueryCollectionVideoReq
 */
export interface PageQueryCollectionVideoReq extends PageQueryReq {
  collectionId: number;
}
/**
 * SaveDanmakuInfoReq
 */
export interface SaveDanmakuInfoReq {
  color?: string;
  content: string;
  danmakuType?: number;
  fontSize?: number;
  timing: number;
  uid: number;
  vid: number
}

/**
 * PageQueryVideoDanmakuReq
 */
export interface PageQueryVideoDanmakuReq extends PageQueryReq {
  danmakuId?: number;
  uid?: number;
  vid?: number;
}
/**
 * SaveCommentInfoReq
 */
export interface SaveCommentInfoReq {
  content: string;
  parentId?: number;
  parentRootId?: number;
  relaId: number;
  relaType: number;
  uid: number;
}

/**
 * PageQueryCommentReq
 */
export interface PageQueryCommentReq extends PageQueryReq {
  parentRootId?: number;
  relaId?: number;
  relaType?: number;
}
/**
 * SaveDynamicInfoReq
 */
export interface SaveDynamicInfoReq {
  attachList?: SaveDynamicAttachReq[];
  content: string;
  isRepost?: number;
  relaId?: number;
  relaType?: number;
  uid: number;
}
/**
 * UpdateDynamicInfoReq
 */
export interface UpdateDynamicInfoReq {
  attachList?: SaveDynamicAttachReq[];
  attachRemoveList?: SaveDynamicAttachReq[];
  content: string;
  did: number;
  isRepost?: number;
  relaId?: number;
  relaType?: number;
}
/**
 * SaveDynamicAttachReq
 */
export interface SaveDynamicAttachReq {
  attachType?: number;
  attachUrl?: string;
  attachUUID?: string;
  did?: number;
}

/**
 * PageQueryDynamicReq
 */
export interface PageQueryDynamicReq extends PageQueryReq {
  uid: number;
}

/**
 * PageQueryUserRelaReq
 */
export interface PageQueryUserRelaReq extends PageQueryReq {
  special?: boolean;
  uid?: number;
}
