<template lang='pug'>
app-layout.demo
  hero-header(slot='header')

  template(slot='main-playground-output')
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

  template(slot='main-playground-text')
    .form-group
      label(for='text') List of words to type:
      textarea(id='text', v-model='textModel', placeholder='text', :rows='3')

  template(slot='main-playground-config')
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

  template(slot='main-playground-code')
    code-block(:code='playgroundDemoCode', language='html')

  template(slot='style-showcase-panel-1')
    h4.text-xs-center
      vue-typer.state-typer(
        text='Katniss Everdeen',
        :pre-type-delay='1000',
        :type-delay='160',
        :pre-erase-delay='2000',
        :erase-delay='80',
        erase-style='select-back',
        caret-animation='solid'
      )
    code-block(:code='stateDemoStyleCode', language='css')

  template(slot='style-showcase-panel-2')
    h4.text-xs-center
      vue-typer.code-typer(
        text='Katniss Everdeen',
        :pre-type-delay='1000',
        :type-delay='160',
        :pre-erase-delay='2000',
        :erase-delay='1280',
        erase-style='select-all',
        caret-animation='blink'
      )
    code-block(:code='codeDemoStyleCode', language='css')

  template(slot='style-showcase-panel-3')
    h4.card-title.text-xs-center
      vue-typer.ghost-typer(
        text='Katniss Everdeen',
        :pre-type-delay='1000',
        :type-delay='160',
        :pre-erase-delay='2000',
        :erase-delay='80',
        erase-style='select-back'
      )
    code-block(:code='ghostDemoStyleCode', language='css')

  copyright-footer(slot='footer')
</template>

<script>
import { VueTyper } from '../vue-typer'
import AppLayout from './components/AppLayout'
import HeroHeader from './components/HeroHeader'
import CopyrightFooter from './components/CopyrightFooter'
import FormCheck from './components/FormCheck'
import FormInput from './components/FormInput'
import FormRadio from './components/FormRadio'
import CodeBlock from './components/CodeBlock'

export default {
  components: { VueTyper, AppLayout, HeroHeader, CopyrightFooter, FormCheck, FormInput, FormRadio, CodeBlock },
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
    },
    playgroundDemoCode() {
      const printableTextArray = '[' + this.text.map(word => `"${word}"`) + ']'
      return `
        <vue-typer
          :text='${printableTextArray}'
          :repeat='${this.repeat}'
          :shuffle='${this.shuffle}'
          initial-action='${this.initialAction}'
          :pre-type-delay='${this.preTypeDelay}'
          :type-delay='${this.typeDelay}'
          :pre-erase-delay='${this.preEraseDelay}'
          :erase-delay='${this.eraseDelay}'
          erase-style='${this.eraseStyle}'
          :erase-final-text='${this.eraseFinalText}'
          caret-animation='${this.caretAnimation}'
        ></vue-typer>
      `
    },
    stateDemoStyleCode() {
      return `
        @keyframes rocking {
          0%,100% {transform: rotateZ(-10deg);},
          50%     {transform: rotateZ(10deg);}
        }

        .vue-typer {
          font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        }
        .vue-typer .custom.char.typed {
          color: #009688;
        }
        .vue-typer .custom.char.selected {
          color: #E91E63;
        }

        .vue-typer .custom.caret {
          animation: rocking 1s ease-in-out 0s infinite;
        }
        .vue-typer .custom.caret.typing {
          background-color: #009688;
        }
        .vue-typer .custom.caret.selecting {
          display: inline-block;
          background-color: #E91E63;
        }
      `
    },
    codeDemoStyleCode() {
      return `
        .vue-typer {
          font-family: monospace;
        }

        .vue-typer .custom.char {
          color: #D4D4BD;
          background-color: #1E1E1E;
        }
        .vue-typer .custom.char.selected {
          background-color: #264F78;
        }

        .vue-typer .custom.caret {
          width: 10px;
          background-color: #3F51B5;
        }
      `
    },
    ghostDemoStyleCode() {
      return `
        .vue-typer {
          font-family: Copperplate, 'Copperplate Gothic Light', fantasy;
        }

        .vue-typer .custom.char.typed {
          color: #607D8B;
        }
        .vue-typer .custom.char.selected {
          color: #607D8B;
          background-color: transparent;
          text-decoration: line-through;
        }

        .vue-typer .custom.caret {
          display: none;
        }
      `
    }
  }
}
</script>

<style scoped lang='scss'>
.demo {
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
</style>

<style lang='scss'>
@keyframes rocking {
  0%, 100% { transform: rotateZ(-10deg); },
  50%      { transform: rotateZ(10deg); }
}

main {
  .state-typer {
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;

    .custom.char {
      &.typed {
        color: #009688;
      }
      &.selected {
        color: #E91E63;
      }
    }
    .custom.caret {
      animation: rocking 1s ease-in-out 0s infinite;

      &.typing {
        background-color: #009688;
      }
      &.selecting {
        display: inline-block;
        background-color: #E91E63;
      }
    }
  }

  .code-typer {
    font-family: monospace;

    .custom.char {
      color: #D4D4BD;
      background-color: #1E1E1E;

      &.selected {
        background-color: #264F78;
      }
    }
    .custom.caret {
      width: 10px;
      background-color: #3F51B5;
    }
  }

  .ghost-typer {
    font-family: Copperplate, 'Copperplate Gothic Light', fantasy;

    .custom.char {
      &.typed {
        color: #607D8B;
      }
      &.selected {
        color: #607D8B;
        background-color: transparent;
        text-decoration: line-through;
      }
    }
    .custom.caret {
      display: none;
    }
  }
}

/* TODO: Include in README */
.vue-typer {
  font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;

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
