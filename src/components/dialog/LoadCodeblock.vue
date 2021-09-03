<template lang="pug">
q-dialog(:value='value' maximized @input='$emit("input", $event)')
  q-card.full-height.flex.column
    q-card-section(style='flex: 0 0 auto')
      .text-h6
        i.fas.fa-folder-open
        span.q-ml-md Load Codeblock
    q-card-section.overflow-auto
      CodeblocksTable(:codeblocks='codeblocks')
    q-card-actions(style='flex: 0 0 auto')
      q-btn.full-width(color='negative' @click='$emit("input", $event.target.value)') Cancel
</template>

<script>
import CodeblocksTable from '../library/CodeblocksTable'
import store from 'store'
import {mapState} from 'vuex'

/**
 * Displays a dialog box for grabbing a Codeblock
 */
export default {
  name: 'DialogLoadBlock',

  props: ['value', 'type'],

  components: {CodeblocksTable},

  computed: {
    ...mapState(['codeblocks'])
  },
}
</script>