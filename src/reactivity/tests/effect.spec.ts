/*
 * @Author: Heyafeng
 * @Date: 2022-07-10 09:56:14
 * @LastEditors: Heyafeng
 * @LastEditTime: 2022-07-10 12:35:33
 * @Description: 测试effect
 */
import { effect } from '../effect'
import { reactive } from '../reactive'
describe('effect', () => {
  it('happy path', () => {
    const user = reactive({
      age: 10,
    })

    let nextAge
    effect(() => {
      nextAge = user.age + 1
    })
    expect(nextAge).toBe(11)

    // 触发更新
    user.age++
    expect(nextAge).toBe(12)
  })

  it('测试effect的返回', () => {
    let foo = 0
    const runner = effect(() => {
      foo++
      return foo
    })
    expect(foo).toBe(1)
    runner()
    expect(foo).toBe(2)
  })

  it('测试scheduler', () => {
    let dummy
    let run: any
    const obj = reactive({ foo: 1 })

    const scheduler = jest.fn(() => {
      run = runner
    })

    const runner = effect(
      () => {
        dummy = obj.foo
      },
      { scheduler }
    )

    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)

    obj.foo++
    expect(scheduler).toHaveBeenCalledTimes(1)
    expect(dummy).toBe(1)
    run()
    expect(dummy).toBe(2)
  })
})
