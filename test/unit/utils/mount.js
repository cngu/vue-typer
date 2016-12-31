import Vue from 'vue'

export default function mount(componentOptions, propsData) {
  const Ctor = Vue.extend(componentOptions)
  const vm = new Ctor({ propsData })
  return vm.$mount()
}
