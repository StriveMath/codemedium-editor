import Vue from 'vue'
import Handsfree from 'handsfree'
import faceClick from './handsfree/faceClick'
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

Vue.prototype.$handsfree = handsfree
