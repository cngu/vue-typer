<template lang='pug'>
.form-group.row.flex-items-xs-center
  label.col-xs-4.col-md-3.col-lg-6.flex-xs-middle.shift-up(:for='label') {{label}}
  .col-xs-4.col-md-3.col-lg-6
    .form-check
      label.form-check-label
        input.form-check-input(
          :id='label',
          type='checkbox',
          :value='value',
          @change='$emit("input", $event.target.checked)'
        )
</template>

<script>
export default {
  props: {
    value: Boolean,
    label: String
  }
}
</script>

<style scoped lang='scss'>
.shift-up {
  margin-top: -2px;
}
</style>
