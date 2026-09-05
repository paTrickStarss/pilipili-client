# PiliPili Client

PiliPili 的 Vue 3 + TypeScript 单页客户端，使用 Vite、Vue Router、Pinia、Axios 和 Ant Design Vue。

## 本地开发

需要 Node.js 20 或更新版本。安装依赖后启动开发服务器：

```sh
npm install
npm run dev
```

开发服务器默认监听 `http://localhost:9999`，并将请求代理到：

- API 与认证：`localhost:8000`
- WebSocket：`localhost:8600`
- 本地 HLS：`localhost:80`

相关服务地址可在 [`vite.config.ts`](vite.config.ts) 中调整。

## 工程校验

```sh
npm run type-check  # Vue 与 TypeScript 类型检查
npm run lint        # ESLint
npm test            # 请求错误和异步竞态测试
npm run build       # 类型检查并生成生产包
npm run check       # 依次执行以上全部校验
```

项目暂未配置通用组件测试框架。涉及页面交互的改动还应在本地后端环境中手动验证。

## 固定数据布局回归

启动开发服务器后访问：

```text
http://127.0.0.1:9999/tests/fixtures/index.html
```

fixture 不依赖真实后端，也不会执行写请求。可使用查询参数组合测试：

- `route`：页面路径，例如 `/video/42`、`/space/42`、`/creativity/upload`
- `mode`：`normal`、`slow`、`error` 或 `empty`
- `session=guest`：模拟游客状态

例如：

```text
http://127.0.0.1:9999/tests/fixtures/index.html?route=/video/42&mode=error
```

## 目录约定

- `src/views/`：路由级页面
- `src/components/`：按功能组织的可复用组件
- `src/api/`：后端领域 API，统一使用 `src/api/axios.ts`
- `src/stores/`：Pinia 状态
- `src/composables/`：通用组合式逻辑
- `src/types/`、`src/utils/`：共享类型与工具
- `src/assets/`：参与构建的样式、字体和图片
- `public/`：原样提供的静态资源

当前重构进度、已知风险和验证记录见 [`HANDOFF.md`](HANDOFF.md)。
