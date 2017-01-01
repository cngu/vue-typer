<template lang='pug'>
a(:href='href', target='_blank')
  slot
</template>

<script>
export default {
  props: {
    href: String
  }
}
</script>

<style scoped lang='scss'>
a {
  position: relative;
  display: inline-block;
  margin: 15px 30px;
  cursor: pointer;
  user-select: none;

  border-radius: 50%;
  transition: box-shadow 0.2s;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;

    border-radius: 50%;
    box-shadow: 0 0 0 2px white;
    transition: transform 0.2s, opacity 0.2s;
  }

  &:hover {
    box-shadow: 0 0 0 4px white;
  }

  &:hover:after {
    transform: scale(0.8);
    opacity: 0.5;
  }
}
</style>
