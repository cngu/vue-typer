<template lang='pug'>
//-
  Ideally we'd just have span.left and span.right contain all the chars to the left and
  right of the caret, but line-wrapping becomes tricky on some browsers (FF/IE/Edge).
  Until we can find a solution for this, we just create one span per character.
span.vue-typer
  span.left
    char.custom.typed(v-for='l in numLeftChars',
                      :val="currentTextArray[l-1]")
  caret(:class='caretClasses', :animation='caretAnimation')
  span.right
    char.custom(v-for='r in numRightChars',
                :val="currentTextArray[numLeftChars + r-1]",
                :class='rightCharClasses')
</template>

<script>
import Caret from './Caret'
import Char from './Char'
import shallowEquals from '../utils/shallow-equals'
import shuffle from '../utils/shuffle'
import split from 'lodash.split'

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
  name: 'VueTyper',
  components: { Caret, Char },

  props: {
    /**
     * Text(s) to type.
     */
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
    /**
     * Number of extra times to type 'text' after the first time.
     * 0 will type 'text' once, 1 will type twice, Infinity will type forever.
     */
    repeat: {
      type: Number,
      default: Infinity,
      validator: value => value >= 0
    },
    /**
     * Randomly shuffles 'text' (using Fisher-Yates algorithm) before typing it.
     * If 'repeat' > 0, 'text' will be shuffled again before each repetition.
     */
    shuffle: {
      type: Boolean,
      default: false
    },
    /**
     * 'typing'  - starts VueTyper off as a blank space and begins to type the first word.
     * 'erasing' - starts VueTyper off with the first word already typed, and begins to erase.
     */
    initialAction: {
      type: String,
      default: STATE.TYPING,
      validator: value => !!value.match(`^${STATE.TYPING}|${STATE.ERASING}$`)
    },
    /**
     * Milliseconds to wait before typing the first character.
     */
    preTypeDelay: {
      type: Number,
      default: 70,
      validator: value => value >= 0
    },
    /**
     * Milliseconds to wait after typing a character, until the next character is typed.
     */
    typeDelay: {
      type: Number,
      default: 70,
      validator: value => value >= 0
    },
    /**
     * Milliseconds to wait before performing the first erase action (backspace, highlight, etc.).
     */
    preEraseDelay: {
      type: Number,
      default: 2000,
      validator: value => value >= 0
    },
    /**
     * Milliseconds to wait after performing an erase action (backspace, highlight, etc.),
     * until the next erase action can start.
     */
    eraseDelay: {
      type: Number,
      default: 250,
      validator: value => value >= 0
    },
    /**
     * 'backspace'   - Erase one character at a time, like pressing backspace.
     * 'select-back' - Highlight back one character at a time; erase once all characters are highlighted.
     * 'select-all'  - Highlight all characters at once; erase afterwards.
     * 'clear'       - Immediately erases everything; text simply disappears.
     */
    eraseStyle: {
      type: String,
      default: ERASE_STYLE.SELECT_ALL,
      validator: value => Object.keys(ERASE_STYLE).some(item => ERASE_STYLE[item] === value)
    },
    /**
     * Flag to erase everything once VueTyper is finished typing. Set to false to leave the last word visible.
     */
    eraseOnComplete: {
      type: Boolean,
      default: false
    },
    /**
     * Caret animation style. See Caret.vue.
     */
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
      return this.currentTextIndex >= this.currentTextLength
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
      return split(this.currentText, '')
    },
    currentTextLength() {
      // NOTE: Using currentText.length will count each individual codepoint as a
      // separate character, which is likely not what you want. currentTextLength will
      // count Unicode characters made up of multiple codepoints as a single character.
      return this.currentTextArray.length
    },
    numLeftChars() {
      return this.currentTextIndex < 0 ? 0 : this.currentTextIndex
    },
    numRightChars() {
      return this.currentTextLength - this.numLeftChars
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
        textCopy = textCopy.filter(textToType => textToType.length > 0)
        this.spool = textCopy
      }

      this.repeatCounter = 0
      this.resetSpool()

      if (this.initialAction === STATE.TYPING) {
        this.startTyping()
      } else if (this.initialAction === STATE.ERASING) {
        // This is a special case when we start off in erasing mode. The first text is already considered typed, and
        // it may even be the only text in the spool. So don't jump directly into erasing mode (in-case 'repeat' and
        // 'eraseOnComplete' are configured to false), and instead jump to the "we just finished typing a word" phase.
        this.moveCaretToEnd()
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
    shiftCaret(delta) {
      this.previousTextIndex = this.currentTextIndex
      const newCaretIndex = this.currentTextIndex + delta
      this.currentTextIndex = Math.min(Math.max(newCaretIndex, 0), this.currentTextLength)
    },
    moveCaretToStart() {
      this.previousTextIndex = this.currentTextIndex
      this.currentTextIndex = 0
    },
    moveCaretToEnd() {
      this.previousTextIndex = this.currentTextIndex
      this.currentTextIndex = this.currentTextLength
    },
    typeStep() {
      if (!this.isDoneTyping) {
        this.shiftCaret(1)
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
          this.moveCaretToStart()
        } else {
          this.shiftCaret(-1)
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

      this.moveCaretToStart()

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

      this.moveCaretToEnd()

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
        if (this.eraseOnComplete || this.shouldRepeat) {
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
      this.$emit('completed')
    }
  },
  watch: {
    text(newText, oldText) {
      if (newText === oldText || shallowEquals(newText, oldText)) {
        return
      }
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
span.vue-typer {
  cursor: default;
  user-select: none;

  span.left, span.right {
    display: inline;
  }
}
</style>
