import type { App } from 'vue'
import { Avatar, Button, Form, Input, Pagination, Typography } from 'ant-design-vue'

export function installUi(app: App) {
  app.use(Avatar).use(Button).use(Form).use(Input).use(Pagination).use(Typography)
}
