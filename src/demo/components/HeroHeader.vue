<template lang='pug'>
header.jumbotron.jumbotron-fluid
  h1.display-4
    vue-typer.title-typer(text='VueTyper', :repeat='0', :pre-type-delay='1000', :type-delay='400', caret-animation='smooth')
  link-bar
  //- badge-bar
</template>

<script>
import { VueTyper } from '../../vue-typer'
import LinkBar from './LinkBar'
import BadgeBar from './BadgeBar'

export default {
  components: {
    VueTyper, LinkBar, BadgeBar
  }
}
</script>

<style scoped lang='scss'>
@import 'colors';

header {
  display: flex;
  flex-direction: column;
  align-items: center;

  color: white;
  background: $vue-blue;

  .badges {

  }
}
</style>

<style lang='scss'>
header {
  h1 {
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
}
</style>