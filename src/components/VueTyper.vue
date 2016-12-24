<template lang='pug'>
span.vue-typer
  //- Ideally we'd just use 2 spans to contain the characters to the left and right
  //- of the cursor, but line-wrapping becomes tricky on some browsers (FF/IE/Edge).
  //- Until we can find a solution for this, we just create one span per character.
  span.char(v-for='l in numLeftChars') {{ currentTextArray[l-1] }}
  caret(v-if='showCaret')
  span.char(v-for='r in numRightChars', :class='characterClassObject') {{ currentTextArray[numLeftChars + r-1] }}
</template>

<script>
import Caret from './Caret'
import shuffle from 'utils/shuffle'
import { nonNegativeNumberValidator,
         stringArrayValidator } from 'utils/validators'

const STATE = {
  IDLE: 'idle',
  TYPING: 'typing',
  ERASING: 'erasing'
}

const ERASE_STYLE = {
  BACKSPACE: 'backspace',
  SELECT_BACK: 'select-back',
  SELECT_ALL: 'select-all',
  DISAPPEAR: 'disappear'
}

export default {
  components: {
    Caret
  },
  props: {
    /* GENERAL */
    text: {
      type: [String, Array],
      required: true,
      validator(value) {
        if (typeof value === 'string') {
          return value.length
        }
        return stringArrayValidator(value)
      }
    },
    repeat: {
      type: Number,
      default: 0,
      validator: nonNegativeNumberValidator
    },
    shuffle: {
      type: Boolean,
      default: false
    },
    initialAction: {
      type: String,
      default: STATE.TYPING,
      validator(value) {
        return value === STATE.TYPING || value === STATE.ERASING
      }
    },
    /* TYPE */
    typeDelay: {
      type: Number,
      default: 75,
      validator: nonNegativeNumberValidator
    },
    startTypeDelay: {
      type: Number,
      default: 0,
      validator: nonNegativeNumberValidator
    },
    /* ERASE */
    eraseDelay: {
      type: Number,
      default: 250,
      validator: nonNegativeNumberValidator
    },
    startEraseDelay: {
      type: Number,
      default: 1750,
      validator: nonNegativeNumberValidator
    },
    eraseStyle: {
      type: String,
      default: ERASE_STYLE.BACKSPACE
    },
    eraseFinalText: {
      type: Boolean,
      default: false
    },
    /*
    CARET
    caretAnimation: String ('blink', 'smooth', 'phase', 'expand' and 'solid')
    caretColor: String
    selectionBgColor: String
    selectionFgColor: String
    */
    showCaretType: {
      type: Boolean,
      default: true
    },
    showCaretSelect: {
      type: Boolean,
      default: false
    },
    showCaretErase: {
      type: Boolean,
      default: true
    },
    showCaretOnComplete: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      state: STATE.IDLE,
      repeatCounter: 0,
      actionTimeout: 0,
      actionInterval: 0,

      spool: [],
      spoolIndex: -1,
      currentTextIndex: -1,

      showCaret: true
    }
  },
  computed: {
    isSelectionBasedEraseStyle() {
      return this.eraseStyle.match(`^${ERASE_STYLE.SELECT_BACK}|${ERASE_STYLE.SELECT_ALL}$`)
    },
    isEraseAllStyle() {
      return this.eraseStyle.match(`^${ERASE_STYLE.DISAPPEAR}|${ERASE_STYLE.SELECT_ALL}$`)
    },
    onLastWord() {
      return this.spoolIndex === this.spool.length - 1
    },
    shouldRepeat() {
      return this.repeatCounter < this.repeat
    },
    characterClassObject() {
      return {
        delete: this.state === STATE.IDLE ||
                this.state === STATE.TYPING ||
                this.state === STATE.ERASING && !this.isSelectionBasedEraseStyle,
        select: this.state === STATE.ERASING && this.isSelectionBasedEraseStyle
      }
    },
    currentText() {
      if (this.spoolIndex >= 0 && this.spoolIndex < this.spool.length) {
        return this.spool[this.spoolIndex]
      }
      return ''
    },
    currentTextArray() {
      return this.currentText.split('')
    },
    numLeftChars() {
      return this.currentTextIndex < 0 ? 0 : this.currentTextIndex
    },
    numRightChars() {
      return this.currentText.length - this.numLeftChars
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.cancelCurrentAction()
  },
  methods: {
    init() {
      // Process the 'text' prop into a typing spool
      if (typeof this.text === 'string') {
        this.spool = [this.text]
      } else {
        // Don't violate one-way binding, make a copy! Vue doesn't make a copy for us to keep things reactive
        let textCopy = this.text.slice()

        textCopy = textCopy.filter(textToType => textToType.length)

        if (this.shuffle && textCopy.length > 1) {
          shuffle(textCopy)
        }

        this.spool = textCopy
      }

      this.spoolIndex = 0
      this.repeatCounter = 0

      if (this.initialAction === STATE.TYPING) {
        this.transitionTo(STATE.TYPING)
      } else if (this.initialAction === STATE.ERASING) {
        // This is a special case when we start off in erasing mode. The first text is already considered typed, and
        // it may even be the only text in the spool. So don't jump directly into erasing mode (in-case 'repeat' and
        // 'eraseFinalText' are configured to false), and instead jump to the "we just finished typing a word" phase.
        this.currentTextIndex = this.currentText.length
        this.onTyped()
      }
    },
    reset() {
      this.cancelCurrentAction()
      this.init()
    },
    transitionTo(state) {
      this.state = state
      switch (this.state) {
        case STATE.TYPING:
          this.startTyping()
          break
        case STATE.ERASING:
          this.startErasing()
          break
      }
    },
    startDelayedRepeatingAction(action, delay, repeatInterval) {
      if (this.actionTimeout || this.actionInterval) {
        return
      }
      this.actionTimeout = setTimeout(() => {
        this.actionInterval = setInterval(() => {
          action()
        }, repeatInterval)
      }, delay)
    },
    cancelCurrentAction() {
      if (this.actionInterval) {
        clearInterval(this.actionInterval)
        this.actionInterval = 0
      }
      if (this.actionTimeout) {
        clearTimeout(this.actionTimeout)
        this.actionTimeout = 0
      }
    },
    startTyping() {
      this.currentTextIndex = 0
      this.showCaret = this.isSelectionBasedEraseStyle ? this.showCaretSelect : this.showCaretErase

      this.startDelayedRepeatingAction(() => {
        if (this.currentTextIndex < this.currentText.length) {
          this.currentTextIndex++
        }
        this.showCaret = this.showCaretType

        if (this.currentTextIndex >= this.currentText.length) {
          this.cancelCurrentAction()
          this.onTyped()
        }
      }, this.startTypeDelay, this.typeDelay)
    },
    startErasing() {
      this.currentTextIndex = this.currentText.length
      this.showCaret = this.showCaretType

      this.startDelayedRepeatingAction(() => {
        const previousTextIndex = this.currentTextIndex
        if (this.currentTextIndex > 0) {
          if (this.isEraseAllStyle) {
            this.currentTextIndex = 0
          } else {
            this.currentTextIndex--
          }
        }
        this.showCaret = this.isSelectionBasedEraseStyle ? this.showCaretSelect : this.showCaretErase

        // Selection-based erase styles stop one iteration later because there's a highlight step before erasing happens.
        // We use previousTextIndex for checking simply because we shouldn't decrement currentTextIndex below 0.
        const finalPreviousTextIndex = this.isSelectionBasedEraseStyle ? 0 : 1
        if (previousTextIndex <= finalPreviousTextIndex) {
          this.cancelCurrentAction()
          this.onErased()
        }
      }, this.startEraseDelay, this.eraseDelay)
    },
    onTyped() {
      this.$emit('typed', this.currentText)

      if (this.onLastWord) {
        if (this.eraseFinalText || this.shouldRepeat) {
          this.transitionTo(STATE.ERASING)
        } else {
          this.onComplete()
        }
      } else {
        this.transitionTo(STATE.ERASING)
      }
    },
    onErased() {
      this.$emit('erased', this.currentText)

      if (this.onLastWord) {
        if (this.shouldRepeat) {
          this.repeatCounter++
          this.spoolIndex = 0
          this.transitionTo(STATE.TYPING)
        } else {
          this.onComplete()
        }
      } else {
        this.spoolIndex++
        this.transitionTo(STATE.TYPING)
      }
    },
    onComplete() {
      this.showCaret = this.showCaretOnComplete
      this.transitionTo(STATE.IDLE)
      this.$emit('complete')
    }
  },
  watch: {
    text() {
      this.reset()
    },
    repeat() {
      this.reset()
    },
    shuffle() {
      this.reset()
    }
  }
}
</script>

<style lang='scss'>
.vue-typer {
  word-break: break-all;

  .char {
    display: inline-block;
    white-space: pre-wrap;

    &.delete {
      display: none;
    }
    &.select {
      background-color: #ACCEF7;
    }
  }
}
</style>
