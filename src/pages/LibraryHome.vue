<template lang="pug">
q-page.full-height
  section.content
    h1 Library

    h4 CodeBlocks
    CodeblocksTable

    h4 Building blocks
    BlocksGrid
</template>

<script>
import BlocksGrid from '../components/library/BlocksGrid'
import CodeblocksTable from '../components/library/CodeblocksTable'
import {mapState} from 'vuex'
import {set} from 'lodash'

export default {
  name: 'LibraryHome',

  components: {BlocksGrid, CodeblocksTable},

  mounted () {
    set(window, 'app.$page', this)
  }
}
</script>