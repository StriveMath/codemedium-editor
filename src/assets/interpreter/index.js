import helpers from '!!raw-loader!!./helpers'
import handsfree from '!!raw-loader!!./handsfree'

let interpreterBase = helpers
interpreterBase += '\n' + handsfree

export default interpreterBase