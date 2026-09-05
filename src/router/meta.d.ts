import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    transition?: string
    requiresAuth?: boolean
    requiresAdmin?: boolean
  }
}
