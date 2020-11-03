/**
 * Stores events being listened to
 * {eventName: [...callbacks]}
 */
_events = {}

/**
 * target.addEventListener subsitution
 * @param {String} eventName The eventName to store this callback under
 * @param {Array} args The list of arguments
 * @param {Function} callback The function to call when this event is triggered
 */
addEventListener = function (eventName, args, callback) {
  if (!_events[eventName]) {
    _events[eventName] = []
  }

  _events[eventName].push({
    callback: callback
  })
}

/**
 * console.log helper to properly send data to main app w/o obfuscation
 */
console = {
  log: function (arguments) {
    log(JSON.stringify(arguments))
  }
}

/**
 * Trigger an event
 * @param {String} eventName 
 * @param {*} payload
 */
triggerEvent = function (eventName, payload) {
  _events[eventName] && _events[eventName].forEach(function (event) {
    event.callback({
      args: event.args,
      payload: JSON.parse(payload)
    })
  })
}