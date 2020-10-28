import Vue from 'vue'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import pkg from '../../package.json'
import {colors} from 'quasar'
import 'geteventlisteners'
import Vue2TouchEvents from 'vue2-touch-events'

// Prototypes
Vue.prototype.$axios = axios
Vue.prototype.$v = pkg.version
Vue.prototype.$markdown = new MarkdownIt()
Vue.prototype.$log = console.log

// Ignored elements for Blockly
Vue.config.ignoredElements = ['field','block','category','xml','mutation','value','sep']

// Plugins
Vue.use(Vue2TouchEvents)

// Theme
colors.setBrand('menu-item-not-selected', '#a599e9')

console.log(`
 __   __  ___  ______   ___  _______  ___      _______  _______  ___   _  _______ 
|  |_|  ||   ||      | |   ||  _    ||   |    |       ||       ||   | | ||       |
|       ||   ||  _    ||   || |_|   ||   |    |   _   ||     __||   |_| ||  _____|
|       ||   || | |   ||   ||       ||   |    |  | |  ||    |   |      _|| |_____ 
|       ||   || |_|   ||   ||  _   | |   |___ |  |_|  ||    |___|     |_ |_____  |
| || || ||   ||       ||   || |_|   ||       ||       ||             _  | _____| |
| || || ||___||______| |___||_______||_______||_______||____________| |_||_______|
|=||=||===========================================================================
|=||=||===========================================================================

Star:   https://github.com/midiblocks/midiblocks
Follow: https://twitter.com/midiblocks
Watch:  https://www.youtube.com/channel/UCDzb8yXGOm6ZYd0Jf_FYKWA

Our mission is to help literally anyone get involved in tech.

`)