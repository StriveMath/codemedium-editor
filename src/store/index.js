import Vue from 'vue'
import Vuex from 'vuex'
import {get, set} from 'lodash'
import store from 'store'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      // Used to force rerender a component by updating a :key set to this
      reloads: 0,

      /**
       * Stores states for various notifications
       */
      notifications: {
        hasSeenTutorialsComingSoon: store.get('notifications.hasSeenTutorialsComingSoon', false)
      },
      
      /**
       * Blocks library
       */
      blocks: store.get('blocks', {}),
      midiblocks: store.get('midiblocks', {}),

      /**
       * Settings
       */
      settings: {
        isFacePointerActive: false,
        isDesktopMode: false
      },

      /**
       * Global Studio props
       */
      studio: {
        hasBookmarks: false
      },

      /**
       * Contains information about the last app-level event
       */
      lastEvent: {
        log: '',
        data: {}
      },

      /**
       * Contains a history of logs
       */
      eventLogs: {
        warn: [],
        error: []
      },

      /**
       * User info
       */
      // @todo Remove this for now
      user: {
        isLoggedIn: false
      },

      /**
       * Post data
       */
      post: {
        isChecking: true
      }
    },

    mutations: {
      /**
       * Helper for setting any state
       * @param {*} state 
       * @param {*} payload ["path.to.state", value]
       */
      set (state, payload) {
        set(state, payload[0], payload[1])
      },

      /**
       * Same as set, but alsos aves it to localStore
       * @param {*} state 
       * @param {*} payload ["path.to.state", value]
       */
      persist (state, payload) {
        set(state, payload[0], payload[1])
        store.set(payload[0], payload[1])
      },

      /**
       * Helper for pushing a payload into an array
       * @param {*} state 
       * @param {*} payload ["path.to.state", value]
       */
      push (state, payload) {
        const data = get(state, payload[0])
        data.push(payload[1])
        set(state, payload[0], data)
      },

      /**
       * Helper for incrementing a state by 1
       * @param {*} state 
       * @param {String} path "path.to.state"
       */
      tally (state, path) {
        set(state, path, get(state, path) + 1)
      },

      /**
       * Flip the boolean value of something
       * @param {*} state 
       * @param {String} path "path.to.state"
       */
      flip (state, path) {
        set(state, path, !get(state, path))
      }
    },

    actions: {
      /**
       * Toggles the Handsfree mode on/off
       */
      toggleHandsfree ({commit}, callback) {
        commit('set', ['settings.isFacePointerActive', !window.handsfree.isLooping])

        if (window.handsfree.isLooping) {
          window.handsfree.stop()
        } else {
          window.handsfree.start(() => {
            callback && callback()
          })
        }
      },

      /**
       * Toggles desktop mode
       */
      toggleDesktopMode ({state, commit}) {
        console.log(state)
        // commit('flip', ['settings.isDesktopMode'])
        window.handsfree.emit('toggleWebsocket', state.settings.isDesktopMode)
      }
    }
  })

  return Store
}
