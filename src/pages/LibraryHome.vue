<template lang="pug">
q-page.full-height
  section.content
    h1 Library

    h4 Midiblocks
    MidiblocksTable

    h4 Building blocks
    BlocksGrid
</template>

<script>
import BlocksGrid from '../components/library/BlocksGrid'
import MidiblocksTable from '../components/library/MidiblocksTable'
import {mapState} from 'vuex'
import {set} from 'lodash'

export default {
  name: 'LibraryHome',

  components: {BlocksGrid, MidiblocksTable},

  mounted () {
    set(window, 'app.$page', this)
  }
}
</script>