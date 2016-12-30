<template lang='pug'>
.form-group.row.flex-items-xs-center
  label.col-xs-4.col-lg-5 {{label}}
  .col-xs-4.col-lg-7
    .form-check(v-for='option of options')
      label.form-check-label
        input.form-check-input(
          type='radio',
          :value='option',
          @change='$emit("input", $event.target.value)',
          v-model='localModel'
        )
        | {{" " + option}}
</template>

<script>
export default {
  props: {
    value: String,
    label: String,
    options: Array,
    model: String
  },
  computed: {
    localModel() {
      return this.model
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
