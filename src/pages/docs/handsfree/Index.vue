<template lang="pug">
q-page.full-height
  section.content
    h1.text-center Handsfree.js

    prism-editor.height-300(v-model='code.setup.npm' :highlight='highlighter' lineNumbers readonly)
</template>

<script>
import {PrismEditor} from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import {highlight, languages} from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'

export default {
  name: 'DocsHandsfreeLanding',

  components: {
    PrismEditor
  },

  data: () => ({
    code: {
      setup: {
        npm: require('!!raw-loader!./code/setup.npm.html').default,
      }
    }
  }),

  methods: {
    /**
     * Highlights the passed code
     */
    highlighter (code) {
      return highlight(code, languages.html)
    }
  }
}
</script>