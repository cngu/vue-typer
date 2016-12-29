<template lang='pug'>
.demo
  header
    h1.title
      vue-typer.title-typer(text='VueTyper', :repeat='0', :pre-type-delay='1000', :type-delay='250', caret-animation='smooth')
    .links
      button Github circle
      button Documentation / API
      button Download circle
    .badges
      p Github stars(ghbtbs) | latest ver | num downloads | license badge

  main.container
    section#playground.row
      #output-panel.card.col-xs-12.col-lg-6
        h3.demo-typer-container.row.flex-items-xs-center.flex-items-xs-middle
          vue-typer.demo-typer(
            :text='text',
            :repeat='repeat',
            :shuffle='shuffle',
            :initial-action='initialAction',
            :pre-type-delay='preTypeDelay',
            :type-delay='typeDelay',
            :pre-erase-delay='preEraseDelay',
            :erase-delay='eraseDelay',
            :erase-style='eraseStyle',
            :erase-final-text='eraseFinalText',
            :caret-animation='caretAnimation')

      #text-panel.card.col-xs-12.col-lg-6
        .form-group
          label(for='text') List of words to type:
          textarea(id='text', v-model='textModel', placeholder='text', :rows='3')

      #config-panel.card.col-xs-12.col-lg-6
        .row
          #general-config.col-xs-12.col-lg-6
            .form-group.row.flex-items-xs-center
              label.col-form-label.col-xs-4.col-lg-4(for='repeat') repeat
              input.col-xs-4.col-lg-8(id='repeat', :min='0', v-model='repeatModel')

            .form-group.row.flex-items-xs-center
              label.col-xs-4.col-lg-6(for='shuffle') shuffle
              .col-xs-4.col-lg-6
                .form-check
                  label.form-check-label
                    input.form-check-input(type='checkbox', id='shuffle', v-model='shuffle')

            .form-group.row.flex-items-xs-center
              label.col-xs-4.col-lg-6(for='eraseFinalText') eraseFinalText
              .col-xs-4.col-lg-6
                .form-check
                  label.form-check-label
                    input.form-check-input(type='checkbox', id='eraseFinalText', v-model='eraseFinalText')

            .form-group.row.flex-items-xs-center
              label.col-xs-4.col-lg-5 initialAction
              .col-xs-4.col-lg-7
                .form-check
                  label.form-check-label
                    input.form-check-input(type='radio', value='typing', v-model='initialAction')
                    = " typing"
                .form-check
                  label.form-check-label
                    input.form-check-input(type='radio', value='erasing', v-model='initialAction')
                    = " erasing"

          #delay-config.col-xs-12.col-lg-6
            .form-group.row.flex-items-xs-center
              label.col-form-label.col-xs-4.col-lg-6(for='preTypeDelay') preTypeDelay
              input.col-xs-4.col-lg-6(id='preTypeDelay', :min='0', v-model.number='preTypeDelay')

            .form-group.row.flex-items-xs-center
              label.col-form-label.col-xs-4.col-lg-6(for='typeDelay') typeDelay
              input.col-xs-4.col-lg-6(id='typeDelay', :min='0', v-model.number='typeDelay')

            .form-group.row.flex-items-xs-center
              label.col-form-label.col-xs-4.col-lg-6(for='preEraseDelay') preEraseDelay
              input.col-xs-4.col-lg-6(id='preEraseDelay', :min='0', v-model.number='preEraseDelay')

            .form-group.row.flex-items-xs-center
              label.col-form-label.col-xs-4.col-lg-6(for='eraseDelay') eraseDelay
              input.col-xs-4.col-lg-6(id='eraseDelay', :min='0', v-model.number='eraseDelay')

          #erase-style-config.col-xs-12.col-lg-6
            .form-group.row.flex-items-xs-center
              label.col-xs-4.col-lg-5 eraseStyle
              .col-xs-4.col-lg-7
                .form-check
                  label.form-check-label
                    input.form-check-input(type='radio', id='backspace', value='backspace', v-model='eraseStyle')
                    = " backspace"
                .form-check
                  label.form-check-label
                    input.form-check-input(type='radio', id='select-back', value='select-back', v-model='eraseStyle')
                    = " select-back"
                .form-check
                  label.form-check-label
                    input.form-check-input(type='radio', id='select-all', value='select-all', v-model='eraseStyle')
                    = " select-all"
                .form-check
                  label.form-check-label
                    input.form-check-input(type='radio', id='clear', value='clear', v-model='eraseStyle')
                    = " clear"

          #caret-config.col-xs-12.col-lg-6
            .form-group.row.flex-items-xs-center
              label.col-xs-4.col-lg-6 caretAnimation
              .col-xs-4.col-lg-6
                .form-check
                  label.form-check-label
                    input.form-check-input(type='radio', id='solid', value='solid', v-model='caretAnimation')
                    = " solid"
                .form-check
                  label.form-check-label
                    input.form-check-input(type='radio', id='blink', value='blink', v-model='caretAnimation')
                    = " blink"
                .form-check
                  label.form-check-label
                    input.form-check-input(type='radio', id='smooth', value='smooth', v-model='caretAnimation')
                    = " smooth"
                .form-check
                  label.form-check-label
                    input.form-check-input(type='radio', id='phase', value='phase', v-model='caretAnimation')
                    = " phase"
                .form-check
                  label.form-check-label
                    input.form-check-input(type='radio', id='expand', value='expand', v-model='caretAnimation')
                    = " expand"

      #code-panel.card.col-xs-12.col-lg-6
        | TODO: CODE PANEL HERE

    section#style-showcase
      #color-demo-panel e
      #text-caret-demo-panel f
      #state-demo-panel g

  footer
    small
      | Released under the #[a(href='https://opensource.org/licenses/MIT') MIT License]
      br
      | Copyright &copy; 2016-#{new Date().getFullYear()} Chris Nguyen
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


<style scoped lang='scss'>
@import 'colors';

.demo {
  header {
    display: flex;
    flex-direction: column;
    align-items: center;

    color: white;
    background: $vue-blue;

    .title {

    }
    .links {

    }
    .badges {

    }
  }

  main {
    #playground {
      #output-panel {
        .demo-typer-container {
          height: 100%;
        }
      }
      #text-panel {
        textarea {
          width: 100%;
        }
      }

      .form-group {
        margin-bottom: initial;
      }
    }
    .card {
      padding: 15px;
      margin-bottom: initial;
    }
  }

  footer {
    color: white;
    background: $vue-green;
    text-align: center;

    a {
      color: white;
      font-weight: 700;
      text-decoration: none;
    }
  }
}
</style>

<style lang='scss'>
header {
  .title-typer {
    font-weight: 300;

    .custom.char {
      color: white;
    }
    .custom.caret {
      background-color: white;
      &.complete {
        display: inline-block;
      }
    }
  }
}

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

/* TODO: Include in README */
.vue-typer {
  font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  user-select: none;
  cursor: default;

  // .custom.char {
  //   color: purple;

  //   &.typed {
  //     color: white;
  //     background-color: lightgreen;
  //   }
  //   &.selected {
  //     background-color: lightblue;
  //     text-decoration: line-through;
  //   }
  //   &.erased {
  //     display: initial;
  //     color: white;
  //     background-color: lightred;
  //   }
  // }

  // .custom.caret {
  //   // animation: test-smooth 0.5s ease-in-out 0s infinite alternate;
  //   width: 10px;

  //   &.idle {
  //     background-color: black;
  //   }
  //   &.typing {
  //     background-color: green;
  //   }
  //   &.selecting {
  //     display: inline-block;
  //     background-color: blue;
  //   }
  //   &.erasing {
  //     background-color: red;
  //     // animation: test-expand 0.5s ease-in-out 0s infinite alternate;
  //   }
  //   &.complete {
  //     background-color: purple;
  //   }
  // }
}
</style>
