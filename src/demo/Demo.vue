<template lang='pug'>
.demo
  .vue-typer-container
    vue-typer(
      :text='text',
      :repeat='repeat',
      :shuffle='shuffle',
      :initial-action='initialAction',

      :type-delay='typeDelay',
      :pre-type-delay='preTypeDelay',
      :erase-delay='eraseDelay',
      :pre-erase-delay='preEraseDelay',
      :erase-style='eraseStyle',
      :erase-final-text='eraseFinalText',

      :caret-animation='caretAnimation')

  .props
    .section
      h1 General Props

      | text
      br
      textarea(v-model='textModel', placeholder='add multiple lines')
      br

      label(for='repeat') repeat
      input(id='repeat', :min='0', v-model='repeatModel')
      br

      label(for='shuffle') shuffle
      input(type='checkbox', id='shuffle', v-model='shuffle')
      br

      | initialAction
      br
      input(type='radio', id='typing', value='typing', v-model='initialAction')
      label(for='typing') typing
      br
      input(type='radio', id='erasing', value='erasing', v-model='initialAction')
      label(for='erasing') erasing
      br

    .section
      h1 Typing/Erasing

      label(for='typeDelay') typeDelay
      input(type='number', id='typeDelay', :min='0', v-model.number='typeDelay')
      br

      label(for='preTypeDelay') preTypeDelay
      input(type='number', id='preTypeDelay', :min='0', v-model.number='preTypeDelay')
      br

      label(for='eraseDelay') eraseDelay
      input(type='number', id='eraseDelay', :min='0', v-model.number='eraseDelay')
      br

      label(for='preEraseDelay') preEraseDelay
      input(type='number', id='preEraseDelay', :min='0', v-model.number='preEraseDelay')
      br

      | eraseStyle
      br
      input(type='radio', id='backspace', value='backspace', v-model='eraseStyle')
      label(for='backspace') backspace
      br
      input(type='radio', id='select-back', value='select-back', v-model='eraseStyle')
      label(for='select-back') select-back
      br
      input(type='radio', id='select-all', value='select-all', v-model='eraseStyle')
      label(for='select-all') select-all
      br
      input(type='radio', id='clear', value='clear', v-model='eraseStyle')
      label(for='clear') clear
      br

      label(for='eraseFinalText') eraseFinalText
      input(type='checkbox', id='eraseFinalText', v-model='eraseFinalText')
      br

    .section
      h1 Caret

      | caretAnimation
      br
      input(type='radio', id='solid', value='solid', v-model='caretAnimation')
      label(for='solid') solid
      br
      input(type='radio', id='blink', value='blink', v-model='caretAnimation')
      label(for='blink') blink
      br
      input(type='radio', id='smooth', value='smooth', v-model='caretAnimation')
      label(for='smooth') smooth
      br
      input(type='radio', id='phase', value='phase', v-model='caretAnimation')
      label(for='phase') phase
      br
      input(type='radio', id='expand', value='expand', v-model='caretAnimation')
      label(for='expand') expand

</template>

<script>
import { VueTyper } from '../vue-typer'

export default {
  components: {
    VueTyper
  },
  data() {
    const initialText = ['web applications', 'user interfaces', 'landing pages', 'corporate websites']

    return {
      textModel: initialText.join('\n'),
      repeatModel: Infinity,
      shuffle: false,
      initialAction: 'typing',

      typeDelay: 70,
      preTypeDelay: 70,
      eraseDelay: 250,
      preEraseDelay: 2000,

      eraseStyle: 'select-all',
      eraseFinalText: false,

      caretAnimation: 'blink'
    }
  },
  computed: {
    text() {
      return this.textModel.split('\n')
    },
    repeat() {
      const repeatValue = parseInt(this.repeatModel)
      return Number.isNaN(repeatValue) ? Infinity : repeatValue
    }
  }
}
</script>

<style lang='scss'>
@keyframes test-expand {
	0%,
	20% {
		transform: scaleY(1);
	}
	80%,
	100% {
		transform: scaleY(0);
	}
}

@keyframes test-smooth {
	0%,
	20% {
		opacity: 1;
	}
	60%,
	100% {
		opacity: 0;
	}
}

.demo {
  .vue-typer-container {
    height: 50px;
  }
}

/* TODO: Include in README */
.vue-typer {
  font-size: 30px;
  font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  user-select: none;
  cursor: default;

  .custom.char {
    color: purple;

    &.typed {
      color: white;
      background-color: lightgreen;
    }
    &.selected {
      background-color: lightblue;
      text-decoration: line-through;
    }
    &.erased {
      display: initial;
      color: white;
      background-color: lightred;
    }
  }

  .custom.caret {
    // animation: test-smooth 0.5s ease-in-out 0s infinite alternate;
    width: 10px;

    &.idle {
      background-color: black;
    }
    &.typing {
      background-color: green;
    }
    &.selecting {
      display: inline-block;
      background-color: blue;
    }
    &.erasing {
      background-color: red;
      // animation: test-expand 0.5s ease-in-out 0s infinite alternate;
    }
    &.complete {
      background-color: purple;
    }
  }
}
</style>
