<template lang='pug'>
span.caret
</template>

<script>
</script>

<style scoped lang='scss'>
@import 'colors';

.caret {
  &:empty:before {
    content: '\200b'; // zero width space character
  }
}

/* Keep the following styles as low-specificity as possible so they are more easily overridden */
span {
  display: inline-block;
  width: 10px;
}

.idle {
  background-color: $caret-idle-color;
}

.typing {
  background-color: $caret-typing-color;
}

.selecting {
  display: none;
}

.erasing {
  background-color: $caret-erasing-color;
}

.complete {
  background-color: $caret-complete-color;
}
</style>
