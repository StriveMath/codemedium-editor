import Blockly from 'blockly'

Blockly.Blocks['factory_base'] = {
  // Base of new block
  init: function() {
    this.setColour('#2ca300')

    // Name
    this.appendDummyInput()
        .appendField('name')
        .appendField(new Blockly.FieldTextInput('Untitled Block'), 'name')

    // Category Dropdown
    let dropdown = new Blockly.FieldDropdown([
      ['misc.', 'misc'],
      ['events', 'event'],
      ['keyboard & mouse', 'keyboard_mouse']
    ])

    this.appendDummyInput()
      .appendField('category')
      .appendField(dropdown, 'category')

    // Inputs
    this.appendStatementInput('INPUTS')
        .setCheck('Input')
        .appendField('inputs')

    // Input Type & Connections
    dropdown = new Blockly.FieldDropdown([
      ['automatic inputs', 'AUTO'],
      ['external inputs', 'EXT'],
      ['inline inputs', 'INT']])
    this.appendDummyInput()
        .appendField(dropdown, 'INLINE')

    // Connections
    dropdown = new Blockly.FieldDropdown([
        ['no connections', 'NONE'],
        ['← left output', 'LEFT'],
        ['↕ top+bottom connections', 'BOTH'],
        ['↑ top connection', 'TOP'],
        ['↓ bottom connection', 'BOTTOM']],
        function(option) {
          this.sourceBlock_.updateShape_(option)
          // Connect a shadow block to this new input
          this.sourceBlock_.spawnOutputShadow_(option)
        })
    this.appendDummyInput()
        .appendField(dropdown, 'CONNECTIONS')

    // Set the color and its shadow
    this.appendValueInput('COLOR')
        .setCheck('Color')
        .appendField('styles')
    setTimeout(() => {
      if (!this.getInputTargetBlock('COLOR')) {
        this.connectOutputShadow_('COLOR', 'style_color')
      }
    }, 0)

    this.setTooltip('Build a custom block by plugging\n' +
        'fields, inputs and other blocks here.')

    this.setHelpUrl(
        'https://developers.google.com/blockly/guides/create-custom-blocks/block-factory')
  },

  mutationToDom: function() {
    let container = Blockly.utils.xml.createElement('mutation')
    container.setAttribute('connections', this.getFieldValue('CONNECTIONS'))
    return container
  },

  domToMutation: function(xmlElement) {
    let connections = xmlElement.getAttribute('connections')
    this.updateShape_(connections)
  },

  /**
   * Helper method for deciding which type of outputs this block needs to attach shadow blocks to
   * @param {String} option 
   */
  spawnOutputShadow_: function(option) {
    switch (option) {
      case 'LEFT':
        this.connectOutputShadow_('OUTPUTTYPE')
      break
      case 'TOP':
        this.connectOutputShadow_('TOPTYPE')
      break
      case 'BOTTOM':
        this.connectOutputShadow_('BOTTOMTYPE')
      break
      case 'BOTH':
        this.connectOutputShadow_('TOPTYPE')
        this.connectOutputShadow_('BOTTOMTYPE')
      break
    }
  },

  /**
   * Helper method to create & connect shadow block
   * @param {String} outputType 
   * @param {String} fieldType 
   */
  connectOutputShadow_: function(outputType, fieldType = 'type_null') {
    let type = this.workspace.newBlock(fieldType)
    type.setShadow(true)
    type.outputConnection.connect(this.getInput(outputType).connection)
    type.initSvg()
    if (this.rendered) {
      type.render()
    }
  },

  updateShape_: function(option) {
    let outputExists = this.getInput('OUTPUTTYPE')
    let topExists = this.getInput('TOPTYPE')
    let bottomExists = this.getInput('BOTTOMTYPE')

    if (option == 'LEFT') {
      if (!outputExists) {
        this.addTypeInput_('OUTPUTTYPE', 'output type')
      }
    } else if (outputExists) {
      this.removeInput('OUTPUTTYPE')
    }

    if (option == 'TOP' || option == 'BOTH') {
      if (!topExists) {
        this.addTypeInput_('TOPTYPE', 'top type')
      }
    } else if (topExists) {
      this.removeInput('TOPTYPE')
    }

    if (option == 'BOTTOM' || option == 'BOTH') {
      if (!bottomExists) {
        this.addTypeInput_('BOTTOMTYPE', 'bottom type')
      }
    } else if (bottomExists) {
      this.removeInput('BOTTOMTYPE')
    }
  },

  addTypeInput_: function(name, label) {
    this.appendValueInput(name)
        .setCheck('Type')
        .appendField(label)
    this.moveInputBefore(name, 'COLOR')
  }
}
