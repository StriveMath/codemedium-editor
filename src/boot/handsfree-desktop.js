const handsfree = window.handsfree
let socket = null
let socketConnected = false

/**
 * Create a new Handsfree.js plugin
 * - onFrame(poses) gets called once per webcam frame
 */
let lastPose = null
handsfree.use('socketConnector', {
  /**
   * Called once per webcam frame
   * @param {Array} poses List of pose objects, one per tracked user (if `settings.maxPoses` is set)
   */
  onFrame ({weboji}) {
    lastPose = weboji
    this.sendMessage('move', weboji)
  },

  /**
   * Sends a message
   */
  sendMessage (action, data) {
    // @fixme I'm not sure why this is needed, but without it the app occasionally fails with circular reference
    try {
      lastPose && socketConnected && socket && socket.send(JSON.stringify({
        handsfree: true,
        action,
        data
      }))
    } catch (e) {
      console.log(e)
    }
  }
})

/**
 * Override faceclick to send click
 */
const oldClick = handsfree.plugin.faceClick.click
handsfree.plugin.faceClick.click = function (weboji) {
  if (!window.app.$.$store.state.isDesktopMode) {
    oldClick.call(this, weboji)
  }
  
  lastPose && socketConnected && socket && socket.send(JSON.stringify({
    handsfree: true,
    action: 'click'
  }))
}

/**
 * Close connection
 */
window.addEventListener('keydown', ({key}) => {
  if (socket && key === 'Escape') {
    handsfree.emit('toggleWebsocket', false)
    app.$page.$store.commit('set', ['settings.isDesktopMode', false])
  }
})

/**
 * Connect or disconnect from the robot
 */
handsfree.on('toggleWebsocket', function (state) {
  if (socket) {
    socket.close()
    socket = null
  }
  
  if (state) {
    socketConnected = false
    socket = new WebSocket('ws:localhost:8081')
    socket.onopen = () => {
      socketConnected = true
      console.log('connected...')
    }

    // Notify user
    window.app.$page.$q.notify({
      timeout: 5000,
      message: 'Press ESC to exit desktop mode',
      type: 'positive'
    })

    document.body.classList.add('handsfree-desktop-mode')
  } else {
    socketConnected = false
    document.body.classList.remove('handsfree-desktop-mode')
    console.log('...disconnected')
  }
})