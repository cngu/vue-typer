<template lang='pug'>
.app-layout
  slot(name='header')

  main.container
    section#playground.row
      h4.col-xs-12.text-xs-center VueTyper Playground

      #output-panel.card.col-xs-12.col-lg-6
        slot(name='main-playground-output')

      #text-panel.card.col-xs-12.col-lg-6
        slot(name='main-playground-text')

      #config-panel.card.col-xs-12.col-lg-6
        slot(name='main-playground-config')

      #code-panel.card.col-xs-12.col-lg-6
        slot(name='main-playground-code')

    section#style-showcase.row
      h4.col-xs-12.text-xs-center VueTyper is also stylable with CSS!
      .col-xs
        .row
          .card.col-xs-12.col-lg-4
            slot(name='style-showcase-panel-1')
          .card.col-xs-12.col-lg-4
            slot(name='style-showcase-panel-2')
          .card.col-xs-12.col-lg-4
            slot(name='style-showcase-panel-3')

  slot(name='footer')
</template>

<style scoped lang='scss'>
@import 'colors';

$section-vertical-spacer: 4rem;

.app-layout {
  main {
    margin-bottom: $section-vertical-spacer * 2;

    #playground {
      margin-bottom: $section-vertical-spacer;
    }

    h4 {
      height: 1.1em;
      margin-bottom: 1em;
      color: $vue-blue;
    }
    .card {
      padding: 1em;
      margin-bottom: initial;
    }
  }
}
</style>