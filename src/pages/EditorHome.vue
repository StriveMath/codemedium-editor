<template lang="pug">
q-page
  .min-height-inherit.q-pt-appbar
    CodeEditor.min-height-inherit(ref='code' :cursor='{lineNumber: 6, column: 9}' @onCodeChange='onCodeChange' :value='code' :extraOptions='{language: "javascript"}')
</template>

<script>
import CodeEditor from '../components/CodeEditor'
import {set} from 'lodash'

/**
 * @todo document
 */
export default {
  name: 'FactoryHome',

  components: {CodeEditor},

  data () {
    return {
      code: `(function () {
  handsfree.use('custom', {
    onFrame ({hands, weboji, pose, handpose, facemesh}) {
      if (!data || !data?.hands) return
      try {
        

      } catch (err) {
        console.error(err)
      }
    }
  })
})()`,
      splitter: 50
    }
  },

  mounted () {
    set(window, 'app.$page', this)
  },

  methods: {
    /**
     * Handles code editor changes
     */
    onCodeChange () {
      // this.autosave()
      console.log('autosave')
    },
  }
}
</script>

<style lang="sass" scoped>
table
  height: 100%
  width: 100%
</style>

<style lang="sass">
#preview
  display: flex
  flex-direction: column

  .injectionDiv
    flex: 1 !important

    .blocklySvg
      height: 100%
</style>