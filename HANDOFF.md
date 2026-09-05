# PiliPili Client 重构交接文档

> 更新时间：2026-09-05
> 工作目录：`/Users/cecilia/dev/project/pilipili-client`
> 当前分支：`codex/refactor-layout`
> 当前 HEAD：`4a52730 Fix homepage responsive layout`

## 1. 任务背景与目标

本轮重构起因是首页只能在浏览器 175% 缩放下正常显示。目标是系统处理整个 Vue 3 + TypeScript 客户端的布局、响应式、请求状态、播放器、上传流程和工程质量问题。

本轮采用“桌面端优先，同时兼容窄屏”的策略。验收重点是页面在正常浏览器缩放下可用，不依靠固定最小宽度、负边距或隐藏整页溢出来维持布局。

## 2. 当前 Git 与工作区状态

- 当前所有大规模重构改动都还在工作区，尚未提交。
- 分支头仍是最初的首页响应式修复提交。
- 最近核对时有 68 个修改文件、260 个删除文件和多项新增文件；大量删除来自字体精简。
- 不要执行 `git reset --hard`、`git checkout -- .` 或其他会丢弃工作区的操作。
- 新会话开始后应先运行 `git status --short` 和 `git diff --stat`，确认没有用户新增改动。

## 3. 已实施的主要改动

### 3.1 全局布局与响应式基础

- 新增 `src/assets/layout.css`，统一页面容器、间距、Header 高度、侧栏宽度和层级变量。
- 重写 `src/views/index/IndexView.vue`，移除重复的 `id="app"`、页面级负边距和固定最小宽度。
- `src/assets/main.css` 接入新的布局基础样式。
- 首页推荐区改为响应式网格，按视口使用 2、3、4、5、6 列。
- 调整轮播比例、顶部导航、搜索栏和频道导航的伸缩与换行行为。
- 视频详情页改为弹性双栏，1099px 以下切换为单栏。
- 个人空间取消多层 1100px 最小宽度，窄屏下将侧栏排列到主内容下方。
- 创作中心改为统一侧栏布局，1023px 以下允许收起侧栏。
- 上传表单、审核卡片和错误页面取消主要固定宽度。

### 3.2 请求、类型、状态和路由

- 重构 `src/api/axios.ts`：
  - 统一业务响应解包。
  - 安全处理无 `response` 的断网和超时异常。
  - 区分网络、登录和业务错误。
  - 401 时同步清理 token 与用户状态。
- 新增 `src/utils/requestError.ts`，集中解析和验证请求错误。
- API 模块统一使用泛型业务响应与分页响应，不再混用 `AxiosResponse`。
- 重写 `src/stores/user.ts`，处理游客状态、并发请求、过期响应和永不结束的等待问题。
- 新增 `src/composables/useAsyncResource.ts`，统一 loading、error、retry 和过期请求保护。
- 首页、视频详情、个人空间视频/收藏和审核页已加入加载、失败、空数据和重试状态。
- 启用路由守卫：
  - 创作中心需要登录。
  - 审核页需要管理员权限。
  - 登录成功后可安全返回原路径。
  - 增加 404 路由和创作中心默认重定向。
- 移除入口顶层 `await`，将加密初始化推迟到登录时，并允许失败后重试。

### 3.3 播放器

- 新增 `src/composables/useHlsPlayer.ts`：
  - 明确销毁 HLS 实例。
  - 支持浏览器原生 HLS 回退。
  - 使用实际清晰度列表。
  - 增加播放错误和重试状态。
- 清理播放器全屏、媒体和键盘事件监听。
- 快捷键会忽略输入框等可编辑元素。
- `play()` Promise 失败得到处理。
- 控制栏和弹幕发送区已增加响应式样式。
- 修复损坏的投币图标组件和空字幕控制组件。

### 3.4 上传可靠性

- 一次只保留一个选中文件，选择新文件时会取消旧请求。
- 校验视频 MIME 类型。
- 上传进度在服务端确认前最多显示 99%。
- 支持失败重试、取消状态和错误展示。
- 提交时防止重复请求，并按顺序处理封面上传和稿件保存。
- 校验 WebSocket JSON、任务 ID 和连接状态。
- 卸载组件时取消请求、关闭 WebSocket、释放对象 URL 和媒体事件。
- 添加 `beforeunload` 与路由离开提醒，避免未保存内容丢失。
- 投稿成功后跳转到当前用户空间。

### 3.5 弹窗与浮层

- `GlobalDialog` 和 `GlobalPopover` 使用 Teleport 挂载到 `body`。
- 增加视口边界、内部滚动、遮罩层级、Escape 关闭、焦点管理和页面滚动锁定。
- 用户信息卡片浮层增加视口约束和计时器清理。

### 3.6 工程、测试和资源

- 删除 `src/deprecated/`、旧视频详情页、示例 Counter Store、旧本地存储工具和无用 Axios 类型声明。
- 字体目录从约 453MB 精简到约 25MB，删除约 428MB；保留六个简体中文 WOFF2 字重和图标字体。
- Ant Design Vue 改为只注册实际使用的组件。
- 登录弹窗改为懒加载。
- Vite 增加动态静态资源复制和 WebSocket 代理配置。
- 新增：
  - `scripts/test.mjs`
  - `.github/workflows/check.yml`
  - 请求错误与异步竞态测试
  - `tests/fixtures/` 浏览器 API 模拟环境
- `package.json` 增加 `test`、`check`、`lint:fix` 等脚本。

## 4. 原重构清单完成情况

状态统计：15 项中 6 项完成、6 项基本完成、3 项部分完成。

| 优先级 | 目标 | 状态 | 当前结论 |
| --- | --- | --- | --- |
| P0 | 恢复类型检查与构建 | 完成 | 类型检查、Lint、测试和生产构建均通过；顶层 `await` 已移除。 |
| P0 | 统一全局布局基础 | 完成 | 唯一应用根节点、统一页面壳、容器、间距和层级已建立。 |
| P0 | 统一响应式策略 | 基本完成 | 核心页面已在 390、768、1440、1920px 验证无整页横向溢出。 |
| P0 | 修复请求异常处理 | 完成 | 网络、超时、401 和业务错误已区分，页面支持提示和重试。 |
| P1 | 首页与公共导航 | 基本完成 | 390、768、1440、1920px 已验证；还需真实后端回归。 |
| P1 | 视频详情与播放器布局 | 基本完成 | 外层、播放器和互动工具栏均已适配窄屏；仍需真实播放流回归。 |
| P1 | 个人空间布局 | 部分完成 | 主页、投稿、收藏已调整；动态、列表、追番和设置仍为占位页。 |
| P1 | 创作中心布局 | 基本完成 | 上传与审核页已完成多视口布局验收，仍需真实接口端到端验证。 |
| P1 | 弹窗与浮层 | 基本完成 | 旧百分比定位规则已清理；登录弹窗窄屏与游客跳转已回归。 |
| P1 | 统一接口类型与状态 | 完成 | API 已统一泛型响应，未发现遗留 `AxiosResponse` 声明。 |
| P1 | 登录与路由行为 | 完成 | 登录、管理员守卫、状态清理和登录后返回路径已实现。 |
| P1 | 播放器与上传可靠性 | 基本完成 | 生命周期与恢复流程已实现，尚缺真实后端端到端验证。 |
| P2 | 组件职责与样式整理 | 部分完成 | 已抽出通用逻辑，但上传页、个人空间和播放器控制仍然过大。 |
| P2 | 历史代码与资源清理 | 完成 | 废弃代码与冗余字体已清理。 |
| P2 | 回归测试与文档 | 部分完成 | 单元测试、CI、fixture 和 README 已增加；仍缺自动化布局断言。 |

## 5. 已知问题与风险

### 5.1 视频页窄屏横向溢出（已解决）

- 620px 以下四个互动项现使用等宽网格，固定宽度和多余间距已移除。
- 390px fixture 实测工具栏内容宽 358px，四项各 89.5px，页面 `scrollWidth === clientWidth`。

### 5.2 GlobalPopover 遗留定位规则（已解决）

已确认调用方没有注入旧定位 class，并删除 `.position-top`、`.position-bottom`、`.position-left` 和 `.position-right` 规则。

### 5.3 个人空间占位路由

以下组件仍只是简单文字：

- `SpaceDynamicFrag.vue`
- `SpaceListFrag.vue`
- `SpaceBangumiFrag.vue`
- `SpaceSettingsFrag.vue`

这些页面属于尚未设计接口与交互的业务功能，不在本轮布局/可靠性重构中臆造实现。投稿与收藏页面已经接入实际内容组件；后续应作为独立功能任务补全。

### 5.4 组件仍偏大

以下文件仍承担过多逻辑或样式：

- `src/components/creativity/upload/VideoUploadFrag.vue`
- `src/views/space/UserSpaceView.vue`
- `src/components/video/player/video-area/control/VideoPlayerControl.vue`

建议在布局问题和浏览器回归稳定后再拆分，避免同时扩大行为变更面。

### 5.5 构建体积

生产构建成功，但 Vite 提示部分 chunk 超过 500kB：

- 主入口约 842kB，gzip 后约 271kB。
- 播放器约 671kB，gzip 后约 191kB。
- 登录弹窗约 368kB，gzip 后约 104kB。

六个 HarmonyOS 简体中文字体仍各约 4.2–4.4MB。后续可考虑只保留实际字重、字体子集化或改用系统字体。

## 6. 验证记录

2026-09-05 已执行：

```bash
npm run check
git diff --check
```

结果：

- `vue-tsc --build --force` 通过。
- ESLint 通过。
- 7 个测试全部通过。
- Vite 生产构建通过。
- `git diff --check` 通过。

浏览器 fixture：

```text
http://127.0.0.1:9999/tests/fixtures/index.html
```

fixture 支持使用 `route`、`mode` 和 `session` 查询参数模拟页面路由、正常/慢速/错误/空数据以及用户状态。

已验证：

- 首页 1440px：布局正常，无横向溢出。
- 首页约 390px：两列卡片、Header 换行和频道网格基本正常，无整页横向溢出。
- 视频页约 390px：播放器、正文和互动工具栏适配正常，无横向溢出。
- 首页、视频详情、个人空间、上传、审核在 390、768、1440、1920px 下均无整页横向溢出。
- 首页、视频详情、个人空间和审核页的 `slow`、`error`、`empty` fixture 状态已回归。
- 游客访问 `/creativity/upload` 会打开登录弹窗并保留安全返回路径。

尚未完整验证：

- 真实后端下的登录、播放、上传、审核流程
- 成功登录后实际返回受保护页面的完整接口流程
- 上传中取消、离页提醒和断线重试的真实浏览器流程
- 各 Header 浮层的鼠标/键盘交互细节

## 7. 下一会话建议执行顺序

1. 运行 `git status --short`，确认并保护当前工作区。
2. 在真实后端下回归登录、视频播放、上传、审核和取消请求流程。
3. 拆分上传页、个人空间和播放器控制三个大型组件，保持行为不变。
4. 为核心布局增加可重复的浏览器自动化断言。
5. 评估主入口、播放器和登录弹窗的分包策略。
6. 评估改用系统字体或进一步子集化 HarmonyOS 字体。
7. 最终运行：

   ```bash
   npm run check
   git diff --check
   ```

8. 审查字体删除和所有未跟踪文件，按主题分批提交。

## 8. 关键文件索引

- 全局布局：`src/assets/layout.css`
- 页面壳：`src/views/index/IndexView.vue`
- 首页：`src/views/main/MainPageView.vue`
- 视频页：`src/views/video/VideoPageView.vue`
- 视频工具栏：`src/components/video/toolbar/VideoToolbar.vue`
- 播放器生命周期：`src/composables/useHlsPlayer.ts`
- 个人空间：`src/views/space/UserSpaceView.vue`
- 创作中心：`src/views/creativity/CreativityCenterView.vue`
- 上传流程：`src/components/creativity/upload/VideoUploadFrag.vue`
- Dialog：`src/components/global/GlobalDialog.vue`
- Popover：`src/components/global/GlobalPopover.vue`
- 请求封装：`src/api/axios.ts`
- 请求错误：`src/utils/requestError.ts`
- 异步状态：`src/composables/useAsyncResource.ts`
- 用户状态：`src/stores/user.ts`
- 路由：`src/router/index.ts`
- 测试入口：`scripts/test.mjs`
- 浏览器 fixture：`tests/fixtures/index.html`、`tests/fixtures/main.js`
- CI：`.github/workflows/check.yml`
