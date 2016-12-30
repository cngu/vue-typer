<template lang='pug'>
.demo
  header
    h1.title
      vue-typer.title-typer(text='VueTyper', :repeat='0', :pre-type-delay='1000', :type-delay='400', caret-animation='smooth')
    .links
      button Github circle
      button Documentation / API
      button Download circle
    .badges
      p Github stars(ghbtbs) | latest ver | num downloads | license badge

  main.container
    section#playground.row
      h4.col-xs-12.text-xs-center VueTyper Playground

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
            form-input(v-model='repeatModel', label='repeat')
            form-check(v-model='shuffle', label='shuffle')
            form-check.shrink-text(v-model='eraseFinalText', label='eraseOnComplete')
            form-radio(v-model='initialAction', :model='initialAction', label='initialAction',
              :options='["typing", "erasing"]')

          #delay-config.col-xs-12.col-lg-6
            form-input(v-model.number='preTypeDelay', label='preTypeDelay', type='number')
            form-input(v-model.number='typeDelay', label='typeDelay', type='number')
            form-input(v-model.number='preEraseDelay', label='preEraseDelay', type='number')
            form-input(v-model.number='eraseDelay', label='eraseDelay', type='number')

          #erase-style-config.col-xs-12.col-lg-6
            form-radio(v-model='eraseStyle', :model='eraseStyle', label='eraseStyle',
              :options='["backspace", "select-back", "select-all", "clear"]')

          #caret-config.col-xs-12.col-lg-6
            form-radio(v-model='caretAnimation', :model='caretAnimation', label='caretAnimation',
              :options='["solid", "blink", "smooth", "phase", "expand"]')

      #code-panel.card.col-xs-12.col-lg-6
        | TODO: CODE PANEL HERE

    section#style-showcase.row
      h4.col-xs-12.text-xs-center VueTyper is also fully stylable with CSS!
      p.col-xs-12.text-xs-center Here are some examples. See the documentationTODOLINK for details.
      .col-xs
        .row
          #color-demo-panel.card.col-xs-12.col-lg
            h4.text-xs-center
              vue-typer.code-typer(text='Katniss Everdeen', caret-animation='blink')
            | #[br]CSS HERE
          #text-caret-demo-panel.card.col-xs-12.col-lg
            h4.card-title.text-xs-center
              vue-typer.strikethrough-typer(text='Katniss Everdeen')
            | #[br]CSS HERE
          #state-demo-panel.card.col-xs-12.col-lg
            h4.text-xs-center
              vue-typer.state-typer(text='Katniss Everdeen', caret-animation='solid')
            | #[br]CSS HERE

  footer
    small
      | Released under the #[a(href='https://opensource.org/licenses/MIT') MIT License]
      br
      | Copyright &copy; 2016-#{new Date().getFullYear()} Chris Nguyen
</template>

<script>
import { VueTyper } from '../vue-typer'
import FormCheck from './components/FormCheck'
import FormInput from './components/FormInput'
import FormRadio from './components/FormRadio'

export default {
  components: {
    VueTyper,
    FormCheck,
    FormInput,
    FormRadio
  },
  data() {
    return {
      textModel: ['Arya Stark', 'Jon Snow', 'Daenerys Targaryen', 'Melisandre', 'Tyrion Lannister'].join('\n'),
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

$section-vertical-spacer: 50px;

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
    margin-top: $section-vertical-spacer;
    margin-bottom: $section-vertical-spacer * 2;

    #playground {
      margin-bottom: $section-vertical-spacer;

      #output-panel {
        .demo-typer-container {
          height: 100%;
        }
      }
      #text-panel {
        .form-group {
          margin-bottom: initial;

          textarea {
            width: 100%;
          }
        }
      }
      .shrink-text {
       font-size: 0.9rem;
      }
    }

    .card {
      padding: 15px;
      margin-bottom: initial;
    }

    h4 {
      margin-bottom: 20px;
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
