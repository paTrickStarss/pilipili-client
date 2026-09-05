import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getRequestError, RequestError, validateResponse } from '../requestError'

test('network failures without a response are reported without a secondary crash', () => {
  for (const input of [null, undefined, new Error('Network Error'), { code: 'ERR_NETWORK' }]) {
    const error = getRequestError(input)
    assert.equal(error.status, undefined)
    assert.match(error.message, /网络/)
  }
})

test('timeouts and HTTP authorization failures remain distinguishable', () => {
  assert.match(getRequestError({ code: 'ECONNABORTED' }).message, /超时/)
  assert.equal(getRequestError({ response: { status: 401 } }).status, 401)
  assert.match(getRequestError({ response: { status: 403 } }).message, /权限/)
})

test('business errors preserve their message and status; successful envelopes pass', () => {
  const original = new RequestError('测试业务错误', 409)
  assert.equal(getRequestError(original), original)
  assert.throws(() => validateResponse({ code: 401, msg: '会话失效' }), { message: '会话失效', status: 401 })
  assert.throws(() => validateResponse({ success: false, msg: '保存失败' }), /保存失败/)
  assert.doesNotThrow(() => validateResponse({ code: 200, success: true }))
  assert.doesNotThrow(() => validateResponse({ code: 0 }))
})
