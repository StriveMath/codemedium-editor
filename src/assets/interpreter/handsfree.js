handsfree = {
  /**
   * Calls a callback on `document` when an event is triggered
   *
   * @param {String} eventName The `handsfree-${eventName}` to listen to
   * @param {Function} callback The callback to call
   */
  on (eventName, callback) {
    addEventListener(`handsfree-${eventName}`, callback)
  }
}