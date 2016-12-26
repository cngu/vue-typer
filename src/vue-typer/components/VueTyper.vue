<template lang='pug'>
//- Ideally we'd just have span.left and span.right contain all the chars to the left and
//- right of the cursor, but line-wrapping becomes tricky on some browsers (FF/IE/Edge).
//- Until we can find a solution for this, we just create one span per character.
span.vue-typer
  span.left
    span.char.custom.typed(v-for='l in numLeftChars') {{ currentTextArray[l-1] }}
  caret(:class='caretClasses', :animation='caretAnimation')
  span.right
    span.char.custom(v-for='r in numRightChars', :class='rightCharClasses') {{ currentTextArray[numLeftChars + r-1] }}
</template>

<script>
import Caret from './Caret'
import shuffle from '../utils/shuffle'

const STATE = {
  IDLE: 'idle',
  TYPING: 'typing',
  ERASING: 'erasing',
  COMPLETE: 'complete'
}

const ERASE_STYLE = {
  BACKSPACE: 'backspace',
  SELECT_BACK: 'select-back',
  SELECT_ALL: 'select-all',
  CLEAR: 'clear'
}

export default {
  components: {
    Caret
  },
  props: {
    text: {
      type: [String, Array],
      required: true,
      validator(value) {
        if (typeof value === 'string') {
          return value.length > 0
        }
        return value.every(item => typeof item === 'string' && item.length > 0)
      }
    },
    repeat: {
      type: Number,
      default: Infinity,
      validator: value => value >= 0
    },
    shuffle: {
      type: Boolean,
      default: false
    },
    initialAction: {
      type: String,
      default: STATE.TYPING,
      validator: value => !!value.match(`^${STATE.TYPING}|${STATE.ERASING}$`)
    },
    typeDelay: {
      type: Number,
      default: 70,
      validator: value => value >= 0
    },
    preTypeDelay: {
      type: Number,
      default: 70,
      validator: value => value >= 0
    },
    eraseDelay: {
      type: Number,
      default: 250,
      validator: value => value >= 0
    },
    preEraseDelay: {
      type: Number,
      default: 2000,
      validator: value => value >= 0
    },
    eraseStyle: {
      type: String,
      default: ERASE_STYLE.SELECT_ALL,
      validator: value => Object.keys(ERASE_STYLE).some(item => ERASE_STYLE[item] === value)
    },
    eraseFinalText: {
      type: Boolean,
      default: false
    },
    caretAnimation: String
  },
  data() {
    return {
      state: STATE.IDLE,
      repeatCounter: 0,
      actionTimeout: 0,
      actionInterval: 0,

      spool: [],
      spoolIndex: -1,
      previousTextIndex: -1,
      currentTextIndex: -1
    }
  },
  computed: {
    caretClasses() {
      return {
        idle: this.state === STATE.IDLE,
        typing: this.state === STATE.TYPING,
        selecting: this.state === STATE.ERASING && this.isSelectionBasedEraseStyle,
        erasing: this.state === STATE.ERASING && !this.isSelectionBasedEraseStyle,
        complete: this.state === STATE.COMPLETE
      }
    },
    rightCharClasses() {
      return {
        selected: this.state === STATE.ERASING && this.isSelectionBasedEraseStyle,
        erased: this.state !== STATE.ERASING ||
                this.state === STATE.ERASING && !this.isSelectionBasedEraseStyle
      }
    },
    isSelectionBasedEraseStyle() {
      return !!this.eraseStyle.match(`^${ERASE_STYLE.SELECT_BACK}|${ERASE_STYLE.SELECT_ALL}$`)
    },
    isEraseAllStyle() {
      return !!this.eraseStyle.match(`^${ERASE_STYLE.CLEAR}|${ERASE_STYLE.SELECT_ALL}$`)
    },
    isDoneTyping() {
      return this.currentTextIndex >= this.currentText.length
    },
    isDoneErasing() {
      // Selection-based erase styles must stay in the highlight stage for one iteration before erasing is finished.
      if (this.isSelectionBasedEraseStyle) {
        return this.currentTextIndex <= 0 && this.previousTextIndex <= 0
      }
      return this.currentTextIndex <= 0
    },
    onLastWord() {
      return this.spoolIndex === this.spool.length - 1
    },
    shouldRepeat() {
      return this.repeatCounter < this.repeat
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
        this.spool = textCopy
      }

      this.repeatCounter = 0
      this.resetSpool()

      if (this.initialAction === STATE.TYPING) {
        this.startTyping()
      } else if (this.initialAction === STATE.ERASING) {
        // This is a special case when we start off in erasing mode. The first text is already considered typed, and
        // it may even be the only text in the spool. So don't jump directly into erasing mode (in-case 'repeat' and
        // 'eraseFinalText' are configured to false), and instead jump to the "we just finished typing a word" phase.
        this.moveCursorToEnd()
        this.onTyped()
      }
    },
    reset() {
      this.cancelCurrentAction()
      this.init()
    },
    resetSpool() {
      this.spoolIndex = 0
      if (this.shuffle && this.spool.length > 1) {
        shuffle(this.spool)
      }
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
    shiftCursor(delta) {
      this.previousTextIndex = this.currentTextIndex
      const newCursorIndex = this.currentTextIndex + delta
      this.currentTextIndex = Math.min(Math.max(newCursorIndex, 0), this.currentText.length)
    },
    moveCursorToStart() {
      this.previousTextIndex = this.currentTextIndex
      this.currentTextIndex = 0
    },
    moveCursorToEnd() {
      this.previousTextIndex = this.currentTextIndex
      this.currentTextIndex = this.currentText.length
    },
    typeStep() {
      if (!this.isDoneTyping) {
        this.shiftCursor(1)
      }

      if (this.isDoneTyping) {
        this.cancelCurrentAction()
        // Ensure the last typed character is rendered before proceeding
        // Note that $nextTick is not required after typing the previous characters due to setInterval
        this.$nextTick(this.onTyped)
      }
    },
    eraseStep() {
      if (!this.isDoneErasing) {
        if (this.isEraseAllStyle) {
          this.moveCursorToStart()
        } else {
          this.shiftCursor(-1)
        }
      }

      if (this.isDoneErasing) {
        this.cancelCurrentAction()
        // Ensure every last character is 'erased' in the DOM before proceeding
        this.$nextTick(this.onErased)
      }
    },
    startTyping() {
      if (this.actionTimeout || this.actionInterval) {
        return
      }

      this.moveCursorToStart()

      this.state = STATE.IDLE
      this.actionTimeout = setTimeout(() => {
        this.state = STATE.TYPING
        this.typeStep()
        if (!this.isDoneTyping) {
          this.actionInterval = setInterval(this.typeStep, this.typeDelay)
        }
      }, this.preTypeDelay)
    },
    startErasing() {
      if (this.actionTimeout || this.actionInterval) {
        return
      }

      this.moveCursorToEnd()

      this.state = STATE.IDLE
      this.actionTimeout = setTimeout(() => {
        this.state = STATE.ERASING
        this.eraseStep()
        if (!this.isDoneErasing) {
          this.actionInterval = setInterval(this.eraseStep, this.eraseDelay)
        }
      }, this.preEraseDelay)
    },
    onTyped() {
      this.$emit('typed', this.currentText)

      if (this.onLastWord) {
        if (this.eraseFinalText || this.shouldRepeat) {
          this.startErasing()
        } else {
          this.onComplete()
        }
      } else {
        this.startErasing()
      }
    },
    onErased() {
      this.$emit('erased', this.currentText)

      if (this.onLastWord) {
        if (this.shouldRepeat) {
          this.repeatCounter++
          this.resetSpool()
          this.startTyping()
        } else {
          this.onComplete()
        }
      } else {
        this.spoolIndex++
        this.startTyping()
      }
    },
    onComplete() {
      this.state = STATE.COMPLETE
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

<style scoped lang='scss'>
@import 'typer-colors';

span.vue-typer {
  word-break: break-all;

  span.char {
    white-space: pre-wrap;
  }

  span.left, span.right {
    display: inline;
  }
}

/* Keep the following .custom.char styles as low-specificity as possible so they are more easily overridden */
span {
  display: inline-block;
}

.typed {
  color: $char-typed-color;
  background-color: $char-typed-background-color;
}

.selected {
  color: $char-selected-color;
  background-color: $char-selected-background-color;
}

.erased {
  display: none;
}
</style>
