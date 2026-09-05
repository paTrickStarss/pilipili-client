import { test } from 'node:test'
import assert from 'node:assert/strict'
import { effectScope } from 'vue'
import { useAsyncResource } from '../useAsyncResource'

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (error: Error) => void
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no })
  return { promise, resolve, reject }
}

test('a late old request cannot overwrite the new result', async () => {
  const first = deferred<string>()
  const second = deferred<string>()
  let count = 0
  const scope = effectScope()
  const resource = scope.run(() => useAsyncResource(() => count++ === 0 ? first.promise : second.promise))!
  const pending1 = resource.execute()
  const pending2 = resource.execute()
  second.resolve('new')
  await pending2
  first.resolve('old')
  await pending1
  assert.equal(resource.data.value, 'new')
  assert.equal(resource.loading.value, false)
  scope.stop()
})

test('old failures do not dismiss the loading state or error of a current request', async () => {
  const first = deferred<string>()
  const second = deferred<string>()
  let count = 0
  const scope = effectScope()
  const resource = scope.run(() => useAsyncResource(() => count++ === 0 ? first.promise : second.promise))!
  const old = resource.execute()
  const current = resource.execute()
  first.reject(new Error('old failure'))
  await old
  assert.equal(resource.loading.value, true)
  assert.equal(resource.error.value, '')
  second.reject(new Error('current failure'))
  await current
  assert.equal(resource.error.value, 'current failure')
  assert.equal(resource.loading.value, false)
  scope.stop()
})

test('retry clears error and accepts an empty successful result', async () => {
  let fail = true
  const scope = effectScope()
  const resource = scope.run(() => useAsyncResource(async () => { if (fail) throw new Error('offline'); return [] }))!
  await resource.execute()
  assert.equal(resource.error.value, 'offline')
  fail = false
  await resource.execute()
  assert.equal(resource.error.value, '')
  assert.deepEqual(resource.data.value, [])
  scope.stop()
})

test('unmount prevents a pending request from publishing data', async () => {
  const pending = deferred<string>()
  const scope = effectScope()
  const resource = scope.run(() => useAsyncResource(() => pending.promise))!
  const request = resource.execute()
  scope.stop()
  pending.resolve('stale')
  await request
  assert.equal(resource.data.value, undefined)
})
