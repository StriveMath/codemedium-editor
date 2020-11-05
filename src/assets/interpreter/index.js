import polyfils from '!!raw-loader!!./polyfills'
import helpers from '!!raw-loader!!./helpers'

let interpreterBase
interpreterBase += ';\n' + polyfils
interpreterBase += ';\n' + helpers

export default interpreterBase