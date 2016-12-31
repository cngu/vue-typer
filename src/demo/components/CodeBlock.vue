<template lang='pug'>
pre.code-block
  code(ref='codeBlock', :class='languageClass')
</template>

<script>
import Prism from '../lib/prism'

const PRISM_LANGUAGE_MAP = {
  'html': 'markup',
  'css': 'css'
}

export default {
  props: {
    code: String,
    language: String
  },
  computed: {
    languageClass() {
      return 'language-' + PRISM_LANGUAGE_MAP[this.language]
    }
  },
  mounted() {
    this.highlightCode()
  },
  methods: {
    highlightCode() {
      const codeBlockEl = this.$refs.codeBlock
      if (codeBlockEl) {
        codeBlockEl.innerHTML = ''
        codeBlockEl.appendChild(document.createTextNode(this.code))
        Prism.highlightElement(codeBlockEl)
      }
    }
  },
  watch: {
    code() {
      this.highlightCode()
    }
  }
}
</script>

<style scoped lang='scss'>
</style>