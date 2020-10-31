<template lang="pug">
q-page
  section.content.flex.flex-center
    .row.q-col-gutter-lg
      .col-12.col-md-6
        q-card
          q-card-section.text-center
            img.q-mt-lg.max-width-100(src='~assets/logo-title.png')
            p.text-subtitle2.q-mt-lg A platform for <span class="text-negative">doing</span> things <span class="text-info">handsfree</span>
            div.text-subtitle1 
              strong 📅 This project is a work in progress.
              div Please check back on around <span class="text-negative">11/8</span> for beta!
          
          q-card-section
            q-card.bg-inactive
              q-card-section
                p
                ul.text-left.text-subtitle2
                  li Map <span class="text-info">face gestures</span> to the <span class="text-negative">mouse</span> and <span class="text-negative">keyboard</span>
                  li Play <span class="text-negative">Steam games</span> and more <span class="text-info">handsfree</span>
                  li Create <span class="text-info">gesture-driven automations</span> for <span class="text-negative">desktop</span>, <span class="text-negative">devices</span>, <span class="text-negative">robots</span>, and <span class="text-negative">more</span>
                  li <span class="text-info">Voice</span>, <span class="text-info">hand tracking</span>, <span class="text-info">pose estimation</span>, and <span class="text-info">mind control</span> coming soon!

          q-card-section
            p.text-center
              small <a href="https://github.com/midiblocks/midiblocks">GitHub</a> &middot; <a href="https://twitter.com/midiblocks">Twitter</a> &middot; <a href="https://www.youtube.com/channel/UCDzb8yXGOm6ZYd0Jf_FYKWA">YouTube</a> &middot; <a href="https://www.reddit.com/r/SideProject/comments/jipnqe/midiblocks_a_web_based_handsfree_visual_coding/">About</a>
      .col-12.col-md-6
        q-card
          q-card-section.text-subtitle1
            q-img.q-mb-md(:ratio='16/9' src='https://media0.giphy.com/media/tfd78t11fomshP1eq6/giphy.gif')
            p <span class="text-negative">Midiblocks</span> are little apps that help you do different things with <span class="text-info">gestures</span>. By default, you get a <span class="text-negative">Face Pointer</span> that you can control with <span class="text-info">your face </span> <small>(and soon other methods too)</small>.
            p But that's just to get you started! You can add more functionality with the handsfree visual code in the <router-link :to='{name: "Studio"}'>Midiblocks Studio</router-link>.

  section.content.q-mt-xl
    .row.q-col-gutter-lg.justify-center
      .col-12.col-md-6
        q-card
          q-card-section.text-subtitle1
            h2 About <span class='text-negative'>Face Pointers</span>
            q-img.q-mb-md(:ratio='16/9' src='https://media0.giphy.com/media/Iv2aSMS0QTy2P5JNCX/giphy.gif')
            p A <span class="text-negative">Face Pointer</span> is a pointer that is controlled with <span class="text-info">head movements</span> and <span class="text-info">face gestures</span> through a <span class="text-negative">webcam</span>. By default, the <span class="text-negative">Face Pointer</span> that comes with <span class="text-negative">Midiblocks</span> has the following features:
            ul.tight
              li (<span class="text-negative">Web only</span>) <span class="text-info">Move</span> the <span class="text-negative">Face Pointer</span> above or below a scroll area to scroll in that direction (see below)
              li <span class="text-negative">Click</span> by <span class="text-info">smiling</span> or <span class="text-info">smirking to either side</span>
            p <span class="text-negative">Midiblock's </span> <span class="text-info">Face Pointer</span> is powered by our gesture library, <router-link :to='{name: "DocsHandsfreeLanding"}'>Handsfree.js</router-link>
          q-card-actions
            q-btn.bg-secondary.full-width(:disabled='settings.isFacePointerActive' @click='$store.dispatch("toggleHandsfree")') Try it, enable Handsfree mode

  section.content.q-mt-xl
    .row.q-col-gutter-lg.justify-center
      .col-12
        q-card
          q-card-section.text-subtitle1
            h2 Mapping <span class='text-info'>face gestures</span> to the <span class='text-negative'>keyboard</span> and <span class='text-negative'>mouse</span>
            .row.q-col-gutter-lg
              .col-12.col-md-6
                q-card.bg-inactive
                  q-card-section
                    h3 Try it!
                    p <span class='text-info'>Snap</span> these <span class='text-negative'>two blocks</span> together to create a small <span class='text-negative'>Midiblock</span> that <span class='text-info'>responds</span> to the <span class='text-info'>selected event</span> by emitting the <span class='text-negative'>selected key</span>.
              .col-12.col-md-6
                q-card.bg-inactive
                  q-card-section(style='height: 300px')
                    Workspace.full-height(:toolbox='toolbox' :autoload='workspaces.simpleDemo' :blocks='[]' :options='workspaces.options')
</template>

<script>
import Blockly from 'blockly'
import {set, cloneDeep} from 'lodash'
import {mapState} from 'vuex'
import Workspace from '../components/Workspace'
import toolbox from '../assets/toolboxes/studio'
import store from 'store'

export default {
  name: 'PageHome',

  components: {
    Workspace
  },

  computed: {
    ...mapState(['settings'])
  },

  data () {
    return {
      toolbox: this.getToolbox(),
      workspaces: {
        options: {hideToolbox: true},
        simpleDemo: '<xml xmlns="https://developers.google.com/blockly/xml"><block type="handsfree_gesture" id="QoTbk/,sPtuU1-TT0k2m" x="225" y="125"><field name="gesture">right_eyebrow</field></block><block type="keyboardtapkey" id="S9]!S21$c%0~kooT[$Pn" disabled="true" x="577" y="129"><field name="key">space</field></block></xml>'
      }
    }
  },

  mounted () {
    set(window, 'app.$page', this)
  },

  methods: {
    /**
     * Gets an organized Blockly toolbox JSON, which consists of core blocks and custom blocks
     * @todo Refactor this into a file and reuse for StudioHome
     */
    getToolbox () {
      const categories = cloneDeep(toolbox)
      const customBlocks = store.get('blocks', {})

      // Map categories to indexes
      const coreBlockCats = categories.map(block => {
        return block.category || ''
      })

      // Add custom block to appropriate category
      Object.keys(customBlocks).forEach(id => {
        const customBlock = customBlocks[id]
        const catIndex = coreBlockCats.indexOf(customBlock.category)

        if (categories[catIndex]) {
          categories[catIndex].children.push({
            tag: 'block',
            type: customBlock.json.type
          })

          // Create block...
          Blockly.Blocks[customBlock.json.type] = {
            init: function() {
              this.jsonInit(customBlock.json)
            }
          }
          // ...and generator
          Blockly.JavaScript[customBlock.json.type] = function (block) {
            let code = []

            customBlock.variables.forEach(variable => {
              // Fields
              if (variable.type === 'field') {
                switch (variable.field) {
                  case 'variable':
                    code.push(`var $${variable.name} = ${JSON.stringify(Blockly.JavaScript.variableDB_.getName(block.getFieldValue(variable.name), Blockly.Variables.NAME_TYPE))}`)
                  break
                  case 'angle':
                    code.push(`var $${variable.name} = ${block.getFieldValue(variable.name)}`)
                  break
                  case 'colour':
                    code.push(`var $${variable.name} = ${JSON.stringify(block.getFieldValue(variable.name))}`)
                  break
                  case 'checkbox':
                    code.push(`var $${variable.name} = ${block.getFieldValue(variable.name) === 'TRUE' ? 'true' : 'false'}`)
                  break
                  case 'dropdown':
                    code.push(`var $${variable.name} = ${JSON.stringify(block.getFieldValue(variable.name))}`)
                  break
                  case 'number':
                    code.push(`var $${variable.name} = ${block.getFieldValue(variable.name)}`)
                  break
                  case 'text':
                    code.push(`var $${variable.name} = ${JSON.stringify(block.getFieldValue(variable.name))}`)
                  break
                }
              // Inputs
              } else {
                switch (variable.input) {
                  case 'value':
                    code.push(`var $${variable.name} = ${JSON.stringify(Blockly.JavaScript.valueToCode(block, variable.name, Blockly.JavaScript.ORDER_ATOMIC))}`)
                  break
                  case 'statements':
                    const statement = Blockly.JavaScript.statementToCode(block, variable.name)
                    code.push(`var $${variable.name} = function () {\n${statement}\n}`)
                  break
                }
              }
            })
            
            code = code.join(';\n')
            code += ';\n' + (customBlock.code || '')

            // Return code
            if (block.outputConnection) {
              return [code, Blockly.JavaScript.ORDER_NONE]
            } else {
              return code
            }
          }
        }
      })

      return categories
    }
  }
}
</script>
