<template lang='pug'>
.link-bar
  circle-link(href='https://github.com/cngu/vue-typer')
    img(src='../assets/images/github-mark-light.png')
  circle-link(href='https://github.com/cngu/vue-typer/blob/master/README.md#getting-started')
    img(src='../assets/images/documentation-light.png')
  circle-link(href='https://api.github.com/repos/cngu/vue-typer/zipball')
    img(src='../assets/images/download-light.png')
</template>

<script>
import CircleLink from './CircleLink'

export default {
  components: {
    CircleLink
  }
}
</script>

<style scoped lang='scss'>
.link-bar {
  img {
    width: 50px;
    height: 50px;
    padding: 8px;
  }
}
</style>