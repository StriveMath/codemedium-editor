const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8081 })
const robot = require('robotjs')

wss.on('connection', (ws) => {
  console.log('connected...')
  
  /**
   * On message received
   */
  ws.on('message', (message) => {
    message = JSON.parse(message)
    if (!message.handsfree) return

    switch (message.action) {
      case 'move':
        robot.moveMouse(message.data.pointer.x, message.data.pointer.y)
      break
      case 'click':
        robot.mouseClick()
      break
      case 'keypress':
        robot.keyTap(message.data.key)
      break
    }
  })

  /**
   * On disconnect
   */
  ws.on('close', () => {
    console.log('...disconnected')
  })
})