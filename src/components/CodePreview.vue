<template lang="pug">
  iframe#code-preview(ref='iframe' sandbox='allow-scripts' src='/preview.html')
</template>

<script>
export default {
  props: ['code'],
  
  mounted () {
    this.$refs.iframe.onload = this.onLoad
  },

  methods: {
    refresh () {
      this.$refs.iframe.reload()
    },
    
    onLoad () {
      this.$refs.iframe.contentWindow.postMessage({action: 'runCode', code: this.code}, '*')
    }
  }
}
</script>

<style lang="sass">
#code-preview
  position: absolute
  height: 400px
  width: 400px
  top: 0
  right: 0
  z-index: 10
  background: #fff
  box-shadow: -3px 3px 3px rgba(0,0,0,0.35)
  border: none
</style>