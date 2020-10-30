<template lang="pug">
q-page.full-height
  section.content
    h1.text-center Handsfree.js

    .row.q-col-gutter-md.justify-center
      .col-12.col-md-9
        q-card
          q-card-section
            CodeEditor(:value='code.setup.npm' :options='options' :extraOptions='extraOptions')
</template>

<script>
import CodeEditor from '../../../components/CodeEditor'
import {set} from 'lodash'

export default {
  name: 'DocsHandsfreeLanding',

  components: {
    CodeEditor
  },

  mounted () {
    set(window, 'app.$page', this)
  },

  data: () => ({
    code: {
      setup: {
        npm: require('!!raw-loader!./code/setup.npm.html').default,
      }
    },

    options: {
      readOnly: true
    },
    extraOptions: {
      language: 'html',
      autoheight: true
    }
  })
}
</script>