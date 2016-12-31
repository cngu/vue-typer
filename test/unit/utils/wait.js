import Vue from 'vue'

export function waitUntilRendered(next) {
  Vue.nextTick(next)
}

export function wait(clock, ms, next) {
  clock.tick(ms)
  waitUntilRendered(next)
}
