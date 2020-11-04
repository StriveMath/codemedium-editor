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

/**
 * Throttle
 * @see https://stackoverflow.com/a/27078401
 */
function throttle(func, wait, options) {
  let context, args, result
  let timeout = null
  let previous = 0

  if (!options) options = {}

  let later = function() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }

  return function() {
    let now = Date.now()
    if (!previous && options.leading === false) previous = now

    let remaining = wait - (now - previous)

    context = this
    args = arguments

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }

      previous = now
      result = func.apply(context, args)

      if (!timeout) context = args = null

    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }

    return result
  }
}