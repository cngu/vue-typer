<template lang='pug'>
span.caret
</template>

<script>
</script>

<style scoped lang='scss'>
@import 'colors';

span {
  display: inline-block;
  width: 1px;
  background-color: $default-caret-color;

  &:empty:before {
    content: '\200b'; // zero width space character
  }
}
</style>
