import './styles/demo.css'
import Vue from 'vue'
import Demo from './Demo.vue'

// eslint-disable-next-line no-new
new Vue({
  el: '#demo',
  render: createElement => createElement(Demo)
})
