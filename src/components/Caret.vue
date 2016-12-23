<template lang='pug'>
span.caret
</template>

<script>
</script>

<style scoped lang='scss'>
.caret-container {
  display: inline-block;
  /* TODO: everything below here should be customizable thru props and bound as a style object */
  width: 1px;
  background-color: orange;

  &:empty:before {
    content: '\200b'; // zero width space character
  }
}
</style>
