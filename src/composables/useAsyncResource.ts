import { onScopeDispose, ref, shallowRef } from 'vue'

/** Ignore stale results after another request starts or the page unmounts. */
export function useAsyncResource<T>(load: () => Promise<T>) {
  const data = shallowRef<T>()
  const loading = ref(false)
  const error = ref('')
  let version = 0

  async function execute() {
    const current = ++version
    loading.value = true
    error.value = ''
    try {
      const result = await load()
      if (current === version) data.value = result
    } catch (cause) {
      if (current === version) error.value = cause instanceof Error ? cause.message : '加载失败，请重试'
    } finally {
      if (current === version) loading.value = false
    }
  }

  onScopeDispose(() => { version++ })
  return { data, loading, error, execute }
}
