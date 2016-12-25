import VueTyperComponent from './components/VueTyper'

export const VueTyper = VueTyperComponent

export default {
  install(Vue) {
    Vue.component('vue-typer', VueTyperComponent)
  }
}
