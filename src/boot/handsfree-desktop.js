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
    this.sendMessage(weboji)
  },

  /**
   * Sends a message to the socket
   */
  sendMessage (weboji) {
    lastPose && socketConnected && socket && socket.send(JSON.stringify({
      handsfree: true,
      action: 'move',
      data: {
        ...weboji
      }
    }))
  }
})

/**
 * Override faceclick to send click
 */
handsfree.plugin.faceClick.click = function () {
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
    window.app.$page.$q.notify({
      timeout: 5000,
      message: 'Press ESC to exit desktop mode',
      type: 'positive'
    })
  } else {
    socketConnected = false
    console.log('...disconnected')
  }
})