import './styles/demo.scss'
import './lib/bootstrap/bootstrap-flex.min.css'

import Vue from 'vue'
import Demo from './Demo'

// eslint-disable-next-line no-new
new Vue({
  el: '#demo',
  render: createElement => createElement(Demo)
})
