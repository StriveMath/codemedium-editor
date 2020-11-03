import coreJs from '!!raw-loader!!core-js-bundle/minified.js'
import helpers from '!!raw-loader!!./helpers'
import handsfree from '!!raw-loader!!./handsfree'

let interpreterBase = coreJs + '\n' + helpers
interpreterBase += '\n' + handsfree

export default interpreterBase