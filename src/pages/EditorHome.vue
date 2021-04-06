<template lang="pug">
q-page
  .min-height-inherit.q-pt-appbar
    CodeEditor.min-height-inherit(ref='code' :cursor='{lineNumber: currentEditor.cursor.lineNumber || 6, column: currentEditor.cursor.column || 9}' @onCodeChange='onCodeChange' :value='code' :extraOptions='{language: "javascript"}')
</template>

<script>
import CodeEditor from '../components/CodeEditor'
import {set} from 'lodash'
import store from 'store'

/**
 * @todo document
 */
export default {
  name: 'FactoryHome',

  components: {CodeEditor},

  data () {
    const currentEditor = store.get('currentEditor', {})
    
    return {
      currentEditor: {
        code: '',
        cursor: {
          column: currentEditor.code ? 1 : 9,
          lineNumber: currentEditor.code ? 1 : 6
        }
      },
      
      code: currentEditor.code || `(function () {
  handsfree.use('custom', {
    onFrame ({hands, weboji, pose, handpose, facemesh}) {
      if (!data || !data?.hands) return
      try {
        

      } catch (err) {
        console.error(err)
      }
    }
  })
})()`
    }
  },

  mounted () {
    set(window, 'app.$page', this)

    this.$mousetrap.bindGlobal('ctrl+`', ev => {
      ev.preventDefault()
      this.runCode()
    })

    this.$root.$on('editor.runCode', this.runCode)
  },

  destroyed () {
    this.$mousetrap.unbind('ctrl+`')
    this.$root.$off('editor.runCode', this.runCode)
  }, 

  methods: {
    autosave () {
      store.set('currentEditor', this.currentEditor)
    },
    
    /**
     * Handles code editor changes
     */
    onCodeChange (code) {
      this.currentEditor.code = code
      this.autosave()
    },

    /**
     * Runs the code in the parent frame (or current frame if there is no parent)
     */
    runCode () {
      window.parent?.postMessage({
        action: 'pixelfelt.editor.runCode',
        code: this.code
      })
    }
  }
}
</script>
