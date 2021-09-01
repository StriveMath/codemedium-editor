<template lang="pug">
div
  q-table.codeblocks-table(:data='codeblockValues' :columns='columns' row-key='uuid')
    template(v-slot:body-cell-actions='props')
      q-td(:props='props')
        q-btn.q-mr-lg(size='sm' color='secondary' @click='loadCodeblock(props)' icon='fas fa-folder-open') Load
        q-btn.q-mr-lg(size='sm' color='tertiary' @click='remixCodeblock(props)' icon='fas fa-copy') Remix
        q-btn(size='sm' color='negative' @click='deleteCodeblock(props)' icon='fas fa-trash') Delete
  DialogDeleteCodeblock(v-model='dialog.deleteCodeblock' :Codeblock='dialogCodeblock')
</template>

<script>
import store from 'store'
import {mapState} from 'vuex'
import DialogDeleteCodeblock from '../dialog/DeleteCodeblock'
import {v4 as uuidv4} from 'uuid'

/**
 * Displays a table containing all available codeblocks
 */
export default {
  name: 'CodeblocksTable',

  components: {DialogDeleteCodeblock},

  computed: {
    ...mapState(['codeblocks']),

    codeblockValues () {
      return Object.values(this.codeblocks)
    }
  },

  data () {
    return {
      // The Codeblock to use inside a dialog
      dialogCodeblock: null,
      
      // Dialog models
      dialog: {
        deleteCodeblock: false
      },
      
      // Table columns
      columns: [
        {
          label: 'Title',
          field: 'title',
          name: 'title',
          sortable: true,
          align: 'left'
        },
        {
          label: 'Description',
          field: 'description',
          name: 'description',
          sortable: true,
          align: 'left'
        },
        {
          label: 'Actions',
          name: 'actions',
          align: 'left'
        }
      ]
    }
  },

  methods: {
    /**
     * Loads the Codeblock
     */
    loadCodeblock (props) {
      const codeblock = this.codeblocks[props.key]
      
      // Load block
      store.set('currentStudio', codeblock)
      this.$q.notify({
        type: 'positive',
        message: `Midilock "${codeblock.title}" loaded!`,
        timeout: 3000
      })

      // Reroute
      if (this.$route.name === 'Studio') {
        this.$store.commit('tally', 'reloads')
      } else {
        this.$router.push({name: 'Studio'})
      }
    },

    /**
     * Delete the codeblock
     */
    deleteCodeblock (props) {
      this.dialogCodeblock = this.codeblocks[props.key]
      this.dialog.deleteCodeblock = true
    },

    /**
     * Remix a Codeblock
     */
    remixCodeblock (props) {
      const block = Object.assign({}, this.codeblocks[props.key])
      block.uuid = uuidv4()
      block.title += ' [Remixed]'

      this.$store.commit('set', [`codeblocks["${block.uuid}"]`, block])
      store.set('currentStudio', block)
      store.set('isStudioUnsaved', false)
      store.set('codeblocks', this.codeblocks)
      this.$q.notify({
        type: 'positive',
        message: `Midilock "${block.title}" remixed!`,
        timeout: 3000
      })

      // Reroute
      if (this.$route.name === 'Studio') {
        this.$store.commit('tally', 'reloads')
      } else {
        this.$router.push({name: 'Studio'})
      }
    }
  }
}
</script>

<style lang="sass">
.codeblocks-table tbody tr td:nth-child(1)
  font-size: 1.25em
  font-weight: bold
.codeblocks-table tbody tr td:nth-child(2)
  white-space: pre-wrap
</style>