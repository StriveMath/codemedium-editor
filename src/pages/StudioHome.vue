<template lang="pug">
q-page(:style-fn='resizePage')
  CodePreview(ref='preview' :code='code' :class='{hidden: !studio.isRunning}')
  Workspace.studio-workspace.full-height(ref='workspace' :options='options' @updateCode='updateCode' :toolbox='toolbox' :blocks='[]' @change='workspaceEventHandler' :isRunning='studio.isRunning')
    q-item.q-mt-lg(@click='saveCodeblock' clickable)
      q-item-section(avatar)
        q-icon(color='secondary' name='fas fa-save')
      q-item-section.gt-sm
        q-badge(v-if='isUnsaved' color='negative' floating) Unsaved changes
        q-item-label.text-secondary Save Codeblock
    q-item.q-mb-lg(@click='showSettings' clickable)
      q-item-section(avatar)
        q-icon(name='fas fa-cogs')
      q-item-section.gt-sm
        q-item-label Codeblock Settings
    q-item(@click='dialog.confirmNew = true' clickable)
      q-item-section(avatar)
        q-icon(color='positive' name='fas fa-file')
      q-item-section.gt-sm
        q-item-label.text-positive New Codeblock
    q-item(@click='dialog.loadBlock = true' clickable)
      q-item-section(avatar)
        q-icon(color='positive' name='fas fa-folder-open')
      q-item-section.gt-sm
        q-item-label.text-positive Load Codeblock
    q-item.q-mb-lg(@click='dialog.remixConfirm = true' clickable)
      q-item-section(avatar)
        q-icon(color='positive' name='fas fa-copy')
      q-item-section.gt-sm
        q-item-label.text-positive Remix Codeblock
    q-item(@click='dialog.deleteConfirm = true' clickable)
      q-item-section(avatar)
        q-icon(color='negative' name='fas fa-trash')
      q-item-section.gt-sm
        q-item-label.text-negative Delete Codeblock

  //- Dialogs
  DialogConfirm(v-model='dialog.confirmNew'
    @accept='createNewCodeblock'
    icon='fas fa-file'
    title='Create new Codeblock?')
      p Are you sure you'd like to create a new Codeblock? Any unsaved changes will be lost.

  DialogConfirm(v-model='dialog.remixConfirm'
    @accept='remixCodeblock'
    icon='fas fa-copy'
    title='Remix this codeblock?')
      p Any unsaved changes to the current codeblock will be lost.
      p Are you sure you'd like to create a copy of this codeblock and open it?

  DialogConfirm(v-model='dialog.editSettings'
    @accept='updateSettings'
    bg='primary'
    icon='fas fa-cogs'
    title='Codeblock Settings'
    accept-label='Update')
      q-input.q-mb-md(ref='autofocus' label='Title' color='secondary' v-model='meta._title' filled)
      q-input(label='Description' color='secondary' v-model='meta._description' type='textarea' filled)
      
  DialogLoadCodeblock(v-model='dialog.loadBlock')

  DialogDeleteCodeblock(v-model='dialog.deleteConfirm' :codeblock='block')
</template>

<script>
import {throttle, cloneDeep, set, sortBy} from 'lodash'
import {mapState} from 'vuex'
import Workspace from '../components/Workspace'
import CodePreview from '../components/CodePreview'
import DialogLoadCodeblock from '../components/dialog/LoadCodeblock'
import DialogDeleteCodeblock from '../components/dialog/DeleteCodeblock'
import DialogConfirm from '../components/dialog/Confirm'
import store from 'store'
import Blockly from 'blockly'
import toolbox from '../assets/toolboxes/studio'
import {v4 as uuidv4} from 'uuid'
import getToolbox from '../mixins/getToolbox'

/**
 * @todo document
 */
export default {
  name: 'MainLayout',

  components: {CodePreview, Workspace, DialogConfirm, DialogLoadCodeblock, DialogDeleteCodeblock},

  computed: {
    ...mapState(['notifications', 'studio']),
    
    /**
     * Returns the data used for saving this view
     * @returns {Object} save data
     */
    saveData () {
      return {
        title: this.meta.title,
        description: this.meta.description,
        ...this.block,
        workspace: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.$refs.workspace.blockly))
      }
    }
  },

  mixins: [getToolbox],

  mounted () {
    set(window, 'app.$page', this)
  
    // Load workspace
    const currentStudio = store.get('currentStudio', {})
    if (currentStudio.workspace) {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(currentStudio.workspace),
        this.$refs.workspace.blockly
      )
    } else {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"></xml>'),
        this.$refs.workspace.blockly
      )
    }
    this.checkBookmarks()

    // Setup listeners
    this.$refs.workspace.blockly.addChangeListener(Blockly.Events.disableOrphans)
    this.$root.$on('studio.prevBookmark', this.prevBookmark)
    this.$root.$on('studio.nextBookmark', this.nextBookmark)
    for (let i = 0; i < 10; i++) {
      this.$mousetrap.bind(i.toString(), this.onNumberKeypress)
    }

    // Tutorials coming soon message
    // @todo Delete this once tutorials are in place
    if (!this.notifications.hasSeenTutorialsComingSoon) {
      this.$store.commit('persist', ['notifications.hasSeenTutorialsComingSoon', true])
      this.$q.notify({
        type: 'info',
        timeout: 5000,
        message: 'Tutorials coming soon!',
        actions: [
          {label: 'Join Newsletter', handler: () => {window.open('https://eepurl.com/hhD7S1')}}
        ]
      })
    }

    // Autosave with CTRL+S
    this.$mousetrap.bindGlobal('ctrl+s', ev => {
      ev.preventDefault()
      this.saveCodeblock()
    })
    this.$mousetrap.bindGlobal('ctrl+o', ev => {
      ev.preventDefault()
      this.dialog.loadBlock = true
    })

    // Handsfree
    // @fixme 9/1/21 - No longer using interpreter
    // document.addEventListener('handsfree-data', this.sendHandsfreeToInterpreter)
  },

  destroyed () {
    this.$mousetrap.unbind('ctrl+s')
    this.$mousetrap.unbind('ctrl+o')
    
    this.$root.$off('studio.prevBookmark', this.prevBookmark)
    this.$root.$off('studio.nextBookmark', this.nextBookmark)
    for (let i = 0; i < 10; i++) {
      this.$mousetrap.unbind(i.toString())
    }

    // @fixme 9/1/21 - No longer using interpreter
    // document.removeEventListener('handsfree-data', this.sendHandsfreeToInterpreter)
  },

  watch: {
    /**
     * Resize main splitter
     */
    splitter: throttle(function () {
      store.set('splitter', this.splitter)
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      })
    }, 50, {leading: true, trailing: true}),

    studio: {
      deep: true,
      handler (studio) {
        if (studio.isRunning) {
          this.$refs.workspace.restartCode(this.$refs.preview)
        }
      }
    }
  },
  
  data () {
    const currentStudio = store.get('currentStudio', {})

    return {
      // Whether the autosave has been saved to a codeblock or not
      isUnsaved: store.get('isStudioUnsaved'),
      
      hasLoaded: false,

      // The generated iframe code
      code: '',
      
      // Current bookmark index
      currentBookmark: -1,

      block: {
        uuid: currentStudio.uuid || uuidv4()
      },

      meta: {
        // What gets saved
        title: currentStudio.title || 'Untitled',
        // Intermediary step (value inside modal)
        _title: currentStudio.title || 'Untitled',
        
        description: currentStudio.description || '',
        _description: currentStudio.description || ''
      },

      // Models for dialogs
      dialog: {
        confirmNew: false,
        deleteConfirm: false,
        editSettings: false,
        loadBlock: false,
        remixConfirm: false
      },
      
      // Blockly options
      // @see https://developers.google.com/blockly/guides/configure/web/configuration_struct
      options: {},
      toolbox: this.getToolbox(toolbox),

      // Spliter width in pixels
      splitter: store.get('splitter', window.innerWidth / 3)
    }
  },

  methods: {
    /**
     * Save states
     */
    autosave () {
      store.set('currentStudio', this.saveData)
      store.set('isStudioUnsaved', true)
      this.isUnsaved = true
    },

    /**
     * Save the codeblock
     */
    saveCodeblock () {
      const codeblocks = store.get('codeblocks', {})
      codeblocks[this.block.uuid] = this.saveData
      store.set('codeblocks', codeblocks)
      store.set('isStudioUnsaved', false)
      this.$store.commit('set', ['codeblocks', codeblocks])
      this.isUnsaved = false

      this.$q.notify({
        type: 'positive',
        message: `Codeblock "${codeblocks[this.block.uuid].title}" saved`,
        timeout: 2000
      })
    },

    /**
     * Creates a new Codeblock
     */
    createNewCodeblock () {
      this.block.uuid = uuidv4()
      store.remove('currentStudio')
      this.$store.commit('tally', 'reloads')
      this.$store.commit('set', ['lastEvent', {log: 'New codeblock created'}])
    },

    /**
     * Create a clone of a Codeblock
     */
    remixCodeblock () {
      this.block.uuid = uuidv4()
      this.meta.title += ' [Remixed]'

      this.autosave()
      this.saveCodeblock()
      
      this.$store.commit('tally', 'reloads')
    },

    /**
     * Shows settings modal, reset its fields, focus element
     */
    showSettings () {
      this.meta._title = this.meta.title
      this.meta._description = this.meta.description
      this.dialog.editSettings = true
    },

    /**
     * Save and apply settings
     */
    updateSettings () {
      this.meta.title = this.meta._title
      this.meta.description = this.meta._description
      this.autosave()
    },

    /**
     * Start dragging the preview
     */
    updateCode (code) {
      this.code = code
      if (this.studio.isRunning) {
        this.$refs.preview.$el.contentWindow.postMessage({action: 'reload'}, '*')
      }
    },

    /**
     * Go to next bookmark
     */
    nextBookmark () {
      const bookmarks = this.getSortedBookmarks()
      
      // Wrap value
      let index = this.currentBookmark + 1
      if (index > bookmarks.length - 1) index = 0
      this.currentBookmark = index
      
      this.$refs.workspace.blockly.centerOnBlock(bookmarks[this.currentBookmark].id)
    },

    /**
     * Go to previous bookmark
     */
    prevBookmark () {
      const bookmarks = this.getSortedBookmarks()
      
      // Wrap value
      let index = this.currentBookmark - 1
      if (index < 0) index = bookmarks.length - 1
      this.currentBookmark = index
      
      this.$refs.workspace.blockly.centerOnBlock(bookmarks[this.currentBookmark].id)
    },

    /**
     * Triggers the loop inside the interpreter
     * @fixme 9/1/21 This is an oprhan method and no longer used...but keeping it because figuring this out was hard
     */
    sendHandsfreeToInterpreter (data) {
      if (this.studio.isRunning) {
        // Remap for better read
        // @fixme do this in Handsfree.js
        data.detail.face = data.detail?.weboji
        delete data.detail.weboji
        
        this.$refs.workspace.interpreter.appendCode(`triggerEvent('frame', '${JSON.stringify(data.detail)}')`)
        this.$refs.workspace.interpreter.run()
      }
    },

    /**
     * Navigates to the bookmark if it exists
     * @param {Event} ev
     */
    onNumberKeypress (ev) {
      const bookmarks = this.getSortedBookmarks()
      const key = +ev.key || 10
      
      if (key <= bookmarks.length) {
        this.$refs.workspace.blockly.centerOnBlock(bookmarks[key - 1].id)
        this.currentBookmark = key - 1
      }
    },

    /**
     * Returns a list of bookmarks, sorted by their $index
     * @return {Array} Sorted list of bookmark blocks
     */
    getSortedBookmarks () {
      return sortBy(this.$refs.workspace.blockly.getBlocksByType('bookmark'), [bookmark => bookmark.getFieldValue('index')])
    },

    /**
     * Use max height instead of max-height for page height
     */
    resizePage (offset) {
      return {height: offset ? `calc(100vh - ${offset}px)` : '100vh'}
    },

    /**
     * Handles Workspace events
     */
    workspaceEventHandler (ev) {
      switch (ev.type) {
        case Blockly.Events.FINISHED_LOADING:
          this.hasLoaded = true
        break
          
        case Blockly.Events.BLOCK_CREATE:
        case Blockly.Events.BLOCK_DELETE:
        case Blockly.Events.BLOCK_CHANGE:
        case Blockly.Events.BLOCK_MOVE:
        case Blockly.Events.VAR_CREATE:
        case Blockly.Events.VAR_DELETE:
        case Blockly.Events.VAR_RENAME:
          if (this.studio.isRunning) {
            this.$refs.workspace.restartCode(this.$refs.preview)
          }
          this.checkBookmarks()
          this.hasLoaded && this.autosave()
        break
      }
    },

    /**
     * Checks if there are bookmarks and toggles the pagers
     */
    checkBookmarks () {
      const bookmarks = this.$refs.workspace.blockly.getBlocksByType('bookmark')
      this.$store.commit('set', ['studio.hasBookmarks', !!bookmarks.length])
    }
  }
}
</script>

<style lang="sass">
.studio-workspace > div
  height: 100%
</style>