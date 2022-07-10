import { track, trigger } from './effect'

/*
 * @Author: Heyafeng
 * @Date: 2022-07-10 10:00:27
 * @LastEditors: Heyafeng
 * @LastEditTime: 2022-07-10 11:56:10
 * @Description: 实现reactive
 */
export function reactive(raw: any) {
  return new Proxy(raw, {
    get(target, key) {
      const res = Reflect.get(target, key)

      // 依赖收集
      track(target, key)
      return res
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value)

      // 触发更新机制
      trigger(target, key)
      return res
    },
  })
}
