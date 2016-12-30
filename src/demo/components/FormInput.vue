<template lang='pug'>
.form-group.row.flex-items-xs-center
  label.col-form-label.col-xs-4.col-lg-6(:for='label') {{label}}
  .col-xs-4.col-lg-6
    input.form-control(
      :id='label',
      :type='type',
      :value='value',
      @input='$emit("input", $event.target.value)'
    )
</template>

<script>
export default {
  props: {
    value: {},
    label: String,
    type: String
  }
}
</script>

<style scoped lang='scss'>
.col-form-label {
  padding-top: 0.4rem;
}
</style>
