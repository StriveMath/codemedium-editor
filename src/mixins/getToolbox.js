import {cloneDeep} from 'lodash'
import store from 'store'
import Blockly from 'blockly'

export default {
  /**
   * Gets an organized Blockly toolbox JSON, which consists of core blocks and custom blocks
   */
  methods: {
    getToolbox (toolbox) {
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