import Vue from 'vue'
import VueTyper from '../../../src/vue-typer/components/VueTyper'

console.log(Vue)
console.log(VueTyper)

describe('VueTyper.vue', () => {
  it('should have a name so it is identifiable in the Vue debugger', () => {
    expect(VueTyper.name).to.equal('VueTyper')
  })
})
