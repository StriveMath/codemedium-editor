<template lang="pug">
  MonacoEditor(ref='editor' v-model='code' :language='extraOptions.language' :options='settings' @editorDidMount='editorDidMount' theme='shadesofpurple')
</template>

<script>
import MonacoEditor from 'vue-monaco'
import {defaultsDeep} from 'lodash'

/**
 * A Monaco (VSCode) editor
 * 
 * @prop value {String} The initial code to use
 * @emits onCodeChange [{STR} code]
 */
export default {
  name: 'PageCode',

  components: {MonacoEditor},
  props: {
    // @see https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
    options: {default: () => {}},
    // Extra options that aren't part of the options object
    extraOptions: {default: () => {
      language: 'javascript'
    }},
    value: {default: ''},
    prefix: {default: ''}
  },

  watch: {
    code (code) {
      this.$emit('onCodeChange', code)
    },

    /**
     * Appends code at the beginning of the document
     */
    prefix (newPrefix, oldPrefix) {
      if (oldPrefix) {
        this.code = newPrefix + '\n' + this.code.replace(oldPrefix + '\n', '') 
      }
    }
  },
  
  data () {
    return {
      code: this.$props.value,
      
      settings: defaultsDeep(this.$props.options, {
        theme: 'shadesofpurple',
        automaticLayout: true,
        minimap: {enabled: false}
      })
    }
  },

  methods: {
    /**
     * Setup the editor
     * - Theme
     * - Set options
     * - Autoheight if extraOptions.autoheight
     */
    editorDidMount (editor) {
      const monaco = this.$refs.editor.monaco
      this.$refs.editor.getMonaco().getModel().updateOptions({tabSize: 2})
  
      monaco.editor.defineTheme('shadesofpurple', {
          base: 'vs-dark',
          inherit: true,
          rules: [
            { token: '', foreground: '9EFFFF', background: '9EFFFF' },
            // { token: 'invalid', foreground: 'ff0000' },
            { token: 'emphasis', fontStyle: 'italic' },
            { token: 'strong', fontStyle: 'bold' },

            { token: 'variable', foreground: 'ff0000' },
            // { token: 'variable.predefined', foreground: 'ff0000' },
            { token: 'variable.parameter', foreground: '9EFFFF' },
            // { token: 'constant', foreground: 'ff0000' },
            { token: 'comment', foreground: 'B362FF' },
            { token: 'number', foreground: 'FF628C' },
            { token: 'number.hex', foreground: 'FF628C' },
            { token: 'regexp', foreground: 'FB94FF' },
            // { token: 'annotation', foreground: 'ff0000' },
            { token: 'type', foreground: '9EFFFF' },

            { token: 'delimiter', foreground: 'ffffff' },

            { token: 'attribute.name', foreground: 'ff0000' },
            { token: 'attribute.value', foreground: 'ff0000' },

            { token: 'string', foreground: 'A5FF90' },

            { token: 'keyword', foreground: 'FF9D00' }
          ],

          // @see https://code.visualstudio.com/api/references/theme-color
          colors: {
            'editorIndentGuide.background': '#A599E90F',
            'editorIndentGuide.activeBackground': '#A599E942',
            'editor.background': '#2d2b55',
            'editor.foreground': '#ffffff',
            'editor.selectionBackground': '#7448af',
            'editor.lineHighlightBackground': '#1f1f41',
            'editorCursor.foreground': '#fad000',
            'editorWhitespace.foreground': 'red'
          }
      })
      monaco.editor.setTheme('shadesofpurple')

      // Autoheight
      if (this.$props.extraOptions.autoheight) {
        this.updateHeight()
        this.$refs.editor.editor.onDidContentSizeChange(this.updateHeight)
      }
    },

    /**
     * Autoresize
     */
    updateHeight () {
      const contentHeight = Math.min(1000, this.$refs.editor.editor.getContentHeight()) + 20

      this.$refs.editor.$el.style.height = `${contentHeight}px`
      this.$refs.editor.editor.layout({ height: contentHeight })
    }
  }
}
</script>