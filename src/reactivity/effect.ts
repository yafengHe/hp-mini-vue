/*
 * @Author: Heyafeng
 * @Date: 2022-07-10 10:48:36
 * @LastEditors: Heyafeng
 * @LastEditTime: 2022-07-10 12:03:40
 * @Description: effect
 */
class ReactiveEffect {
  private _fn: any
  constructor(fn: Function) {
    this._fn = fn
  }

  run() {
    activeEffect = this
    this._fn()
  }
}

let targetMap = new Map()
export function track(target, key) {
  // 获取targetMap上的传入对象的值
  let depMap = targetMap.get(target)
  // 如果没有 则创建一个Map 并且设置当前传入的对象为键， 值为空map
  if (!depMap) {
    depMap = new Map()
    targetMap.set(target, depMap)
  }

  // 获取targetMap传入的属性的值
  let dep = targetMap.get(key)
  // 如果没有  则创建一个set 并且将上述的空对象里面设置值
  if (!dep) {
    dep = new Set()
    depMap.set(key, dep)
  }

  // 存放实例
  dep.add(activeEffect)
}

export function trigger(target, key) {
  // 通过传入的对象 找到dep
  let depMap = targetMap.get(target)
  // 通过dep找到实例
  let dep = depMap.get(key)

  // 遍历实例并运行run方法 以此更新数据
  for (const effect of dep) {
    effect.run()
  }
}

let activeEffect
export function effect(fn: Function) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}
