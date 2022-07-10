/*
 * @Author: Heyafeng
 * @Date: 2022-07-10 09:56:14
 * @LastEditors: Heyafeng
 * @LastEditTime: 2022-07-10 10:55:55
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
})
