import VueTyper from '../../../src/vue-typer/components/VueTyper'
import _mount from '../utils/mount'
import { waitUntilRendered, wait as _wait } from '../utils/wait'

describe('VueTyper.vue', function() {
  let clock

  function mount(propsData) {
    return _mount(VueTyper, propsData)
  }

  function wait(ms, next) {
    _wait(clock, ms, next)
  }

  beforeEach(function() {
    clock = sinon.useFakeTimers()
  })
  afterEach(function() {
    clock.restore()
  })

  it('should have a name so it is identifiable in the Vue debugger', function() {
    expect(VueTyper.name).to.equal('VueTyper')
  })

  describe('Repeat and EraseFinalText', function() {
    // eslint-disable-next-line
    const preTypeDelay = 1, preEraseDelay = 1, typeDelay = 1, eraseDelay = 1
    let vm
    function createOptions(repeat, eraseFinalText) {
      return { text: 'a', repeat, eraseFinalText, preTypeDelay, typeDelay, preEraseDelay, eraseDelay }
    }

    it('should not repeat and should not erase final text', function(done) {
      vm = mount(createOptions(0, false))
      wait(preTypeDelay, () => {
        expect(vm.state).to.equal('complete')
        done()
      })
    })

    it('should not repeat and should erase final text', function(done) {
      vm = mount(createOptions(0, true))
      wait(preTypeDelay, () => {
        // assert that we're not done yet, we still have to erase the final text!
        expect(vm.state).not.to.equal('complete')

        // preEraseDelay = select-all, eraseDelay = actual erase
        wait(preEraseDelay + eraseDelay, () => {
          expect(vm.state).to.equal('complete')
          done()
        })
      })
    })

    it('should repeat as many times as specified and should not erase final text', function(done) {
      vm = mount(createOptions(1, false))

      // type first time
      wait(preTypeDelay, () => {
        // select-all and erase first time
        wait(preEraseDelay + eraseDelay, () => {
          // assert that we're not done yet, we still have to repeat one more time!
          expect(vm.state).not.to.equal('complete')

          // type second time
          wait(preTypeDelay, () => {
            // assert that we're not done yet, we still have to erase the final text!
            expect(vm.state).to.equal('complete')
            done()
          })
        })
      })
    })

    it('should repeat as many times as specified and erase final text', function(done) {
      vm = mount(createOptions(1, true))

      // type first time
      wait(preTypeDelay, () => {
        // select-all and erase first time
        wait(preEraseDelay + eraseDelay, () => {
          // assert that we're not done yet, we still have to repeat one more time!
          expect(vm.state).not.to.equal('complete')

          // type second time
          wait(preTypeDelay, () => {
            // assert that we're not done yet, we still have to erase the final text!
            expect(vm.state).not.to.equal('complete')

            // select-all and erase second time
            wait(preEraseDelay + eraseDelay, () => {
              expect(vm.state).to.equal('complete')
              done()
            })
          })
        })
      })
    })
  })

  describe('Caret', function() {
    it('should have the correct animation class', function() {
      let vm = mount({ text: 'abc', caretAnimation: 'solid' })
      let caret = vm.$el.querySelector('.caret')
      expect(caret.classList.contains('vue-typer-caret-solid')).to.be.true

      vm = mount({ text: 'abc', caretAnimation: 'blink' })
      caret = vm.$el.querySelector('.caret')
      expect(caret.classList.contains('vue-typer-caret-blink')).to.be.true

      vm = mount({ text: 'abc', caretAnimation: 'smooth' })
      caret = vm.$el.querySelector('.caret')
      expect(caret.classList.contains('vue-typer-caret-smooth')).to.be.true

      vm = mount({ text: 'abc', caretAnimation: 'phase' })
      caret = vm.$el.querySelector('.caret')
      expect(caret.classList.contains('vue-typer-caret-phase')).to.be.true

      vm = mount({ text: 'abc', caretAnimation: 'expand' })
      caret = vm.$el.querySelector('.caret')
      expect(caret.classList.contains('vue-typer-caret-expand')).to.be.true
    })
    it('should be positionable to the beginning', function() {
      const vm = mount({ text: 'abc' })
      vm.moveCaretToStart()
      expect(vm.currentTextIndex).to.equal(0)
    })
    it('should be positionable to the end', function() {
      const vm = mount({ text: 'abc' })
      vm.moveCaretToEnd()
      expect(vm.currentTextIndex).to.equal(3)
    })
    it('should be shiftable', function() {
      const vm = mount({ text: 'abc' })
      vm.moveCaretToStart()
      vm.shiftCaret(2)
      expect(vm.currentTextIndex).to.equal(2)
    })
  })

  describe('Events', function() {
    const text = 'abc'
    let vm
    beforeEach(function() {
      vm = mount({ text })
    })
    it('should emit \'typed\' event after a word is typed', function(done) {
      vm.$on('typed', (word) => {
        expect(word).to.equal(text)
        done()
      })
      vm.onTyped()
    })
    it('should emit \'erased\' event after a word is erased', function(done) {
      vm.$on('erased', (word) => {
        expect(word).to.equal(text)
        done()
      })
      vm.onErased()
    })
    it('should emit \'completed\' event after all words are typed/erased', function(done) {
      vm.$on('completed', (word) => {
        done()
      })
      vm.onComplete()
    })
  })

  describe('Typing and Erasing', function() {
    function expectText(vm, side, expectedText, expectedCharClass) {
      const container = vm.$el.querySelector('.' + side)
      expect(container.classList.contains(side)).to.be.true
      expect(container.childElementCount).to.equal(expectedText.length)

      let child
      for (let i = 0; i < expectedText.length; i++) {
        child = container.children[i]
        if (expectedCharClass) {
          expect(child.classList.contains(expectedCharClass))
        }
        expect(child.textContent).to.equal(expectedText.charAt(i))
      }
    }
    function expectLeftText(vm, expectedText) {
      expectText(vm, 'left', expectedText, 'typed')
    }
    function expectRightText(vm, expectedText, expectedCharClass) {
      expectText(vm, 'right', expectedText, expectedCharClass)
    }

    describe('Initial Action', function() {
      it('should initialize to typing state', function(done) {
        const vm = mount({
          text: 'abc',
          initialAction: 'typing'
        })

        waitUntilRendered(() => {
          expectLeftText(vm, '')
          expectRightText(vm, 'abc')
          done()
        })
      })

      it('should initialize to erasing state', function(done) {
        const vm = mount({
          text: 'abc',
          initialAction: 'erasing'
        })

        waitUntilRendered(() => {
          expectLeftText(vm, 'abc')
          expectRightText(vm, '')
          done()
        })
      })
    })

    describe('Typing Delay', function() {
      const preTypeDelay = 100
      const typeDelay = 50
      let vm
      beforeEach(function() {
        vm = mount({
          text: 'abc',
          typeDelay,
          preTypeDelay
        })
      })

      it('should wait \'preTypeDelay\' before typing the first character', function(done) {
        wait(preTypeDelay, () => {
          expectLeftText(vm, 'a')
          expectRightText(vm, 'bc')
          done()
        })
      })

      it('should wait \'typeDelay\' before typing the second character', function(done) {
        wait(preTypeDelay + typeDelay, () => {
          expectLeftText(vm, 'ab')
          expectRightText(vm, 'c')
          done()
        })
      })
    })

    describe('Erasing Delay', function() {
      const preEraseDelay = 100
      const eraseDelay = 50
      let vm

      function createBeforeEach(eraseStyle) {
        return function() {
          vm = mount({
            text: 'abc',
            initialAction: 'erasing',
            eraseStyle,
            eraseDelay,
            preEraseDelay
          })
        }
      }

      describe('backspace', function() {
        beforeEach(createBeforeEach('backspace'))
        it('should wait \'preEraseDelay\' before erasing the first character', function(done) {
          wait(preEraseDelay, () => {
            expectLeftText(vm, 'ab')
            expectRightText(vm, 'c', 'erased')
            done()
          })
        })
        it('should wait \'eraseDelay\' before erasing the second character', function(done) {
          wait(preEraseDelay + eraseDelay, () => {
            expectLeftText(vm, 'a')
            expectRightText(vm, 'bc', 'erased')
            done()
          })
        })
      })

      describe('select-back', function() {
        beforeEach(createBeforeEach('select-back'))
        it('should wait \'preEraseDelay\' before selecting the first character', function(done) {
          wait(preEraseDelay, () => {
            expectLeftText(vm, 'ab')
            expectRightText(vm, 'c', 'erased')
            done()
          })
        })
        it('should wait \'eraseDelay\' before selecting the second character', function(done) {
          wait(preEraseDelay + eraseDelay, () => {
            expectLeftText(vm, 'a')
            expectRightText(vm, 'bc', 'selected')
            done()
          })
        })
      })

      describe('select-all', function() {
        beforeEach(createBeforeEach('select-all'))
        it('should wait \'preEraseDelay\' before selecting all characters', function(done) {
          wait(preEraseDelay, () => {
            expectLeftText(vm, '')
            expectRightText(vm, 'abc', 'selected')
            done()
          })
        })
        it('should wait \'eraseDelay\' before erasing the entire selection', function(done) {
          wait(preEraseDelay + eraseDelay, () => {
            expectLeftText(vm, '')
            expectRightText(vm, 'abc', 'erased')
            done()
          })
        })
      })

      describe('clear', function() {
        beforeEach(createBeforeEach('clear'))
        it('should wait \'preEraseDelay\' before clearing all characters', function(done) {
          wait(preEraseDelay, () => {
            expectLeftText(vm, '')
            expectRightText(vm, 'abc', 'erased')
            done()
          })
        })
      })
    })
  })
})
