import VueTyperComponent from './components/VueTyper.vue'

export const VueTyper = VueTyperComponent

export default {
  install(Vue) {
    Vue.component('vue-typer', VueTyperComponent)
  }
}
