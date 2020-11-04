import Vue from 'vue'
import Handsfree from 'handsfree'
import faceClick from './handsfree/face-click.js'
import store from 'store'

// Instantiate
const handsfree = window.handsfree = new Handsfree({
  assetsPath: document.location.origin + '/assets/',
  weboji: true
})

// Reset settings
const calibration = store.get('handsfree.calibration', false)
if (calibration) {
  handsfree.plugin.facePointer.config = calibration
}

// Inject plugins
handsfree.use('faceClick', faceClick)

/**
 * Overrides
 * - This will be helpful later on to help users quickly mirror camera
 */
handsfree.use('flipStates', {
  onFrame () {
    let tmp
    tmp = handsfree.weboji.data.state.browLeftUp
    handsfree.weboji.data.state.browLeftUp = handsfree.weboji.data.state.browRightUp
    handsfree.weboji.data.state.browRightUp = tmp
  
    tmp = handsfree.weboji.data.state.browLeftDown
    handsfree.weboji.data.state.browLeftDown = handsfree.weboji.data.state.browRightDown
    handsfree.weboji.data.state.browRightDown = tmp
  
    tmp = handsfree.weboji.data.state.eyeLeftClosed
    handsfree.weboji.data.state.eyeLeftClosed = handsfree.weboji.data.state.eyeRightClosed
    handsfree.weboji.data.state.eyeRightClosed = tmp
  }
})

Vue.prototype.$handsfree = handsfree
