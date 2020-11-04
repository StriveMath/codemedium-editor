import helpers from '!!raw-loader!!./helpers'
import handsfree from '!!raw-loader!!./handsfree'
import polyfils from '!!raw-loader!!./polyfills'

let interpreterBase
interpreterBase += ';\n' + polyfils
interpreterBase += ';\n' + helpers
interpreterBase += ';\n' + handsfree

export default interpreterBase