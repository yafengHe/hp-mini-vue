import { reactive } from '../reactive'

describe('reactive', () => {
  it('happy path', () => {
    const original = { foo: 1 }
    const observer = reactive(original)
    expect(observer).not.toBe(original)
    expect(original.foo).toBe(1)
  })
})
