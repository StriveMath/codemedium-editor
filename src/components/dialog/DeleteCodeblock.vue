<template lang="pug">
DialogConfirm(:value='value' @input='$emit("input", $event)'
  @accept='deleteCodeblock'
  bg='negative'
  icon='fas fa-trash'
  title='Delete codeblock?')
    p Are you sure you want to delete this codeblock? This cannot be undone!
</template>

<script>
import DialogConfirm from './Confirm'
import {mapState} from 'vuex'
import store from 'store'

export default {
  name: 'DialogDeleteCodeblock',

  components: {DialogConfirm},

  computed: {
    ...mapState(['codeblocks'])
  },

  props: ['value', 'codeblock'],

  methods: {
    /**
     * Deletes the block and creates a new one
     */
    deleteCodeblock () {
      let title = this.codeblocks[this.codeblock.uuid].title
      let codeblocks = Object.assign({}, this.codeblocks)
      let currentStudio = store.get('currentStudio', {})

      // Delete codeblock
      delete codeblocks[this.codeblock.uuid]
      this.$store.commit('set', ['codeblocks', codeblocks])
      store.set('codeblocks', codeblocks)

      // Reset Studio
      if (this.codeblock.uuid === currentStudio.uuid) {
        store.remove('currentStudio')
      }

      // Notifications
      this.$q.notify({
        type: 'positive',
        message: `Codeblock "${title}" deleted`,
        timeout: 2000
      })
      this.$store.commit('set', ['lastEvent', {log: `Codeblock "${title}" deleted`}])

      // Reroute
      if (this.$route.name === 'Studio') {
        this.$store.commit('tally', 'reloads')
      }
    }
  }
}
</script>