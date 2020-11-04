/**
 * Handles Interpreter emits
 */
export default (ev) => {
  let emitted = ev.properties

  switch (emitted.event) {
    case 'keypress':
      if (window.app.$page.$store.state.settings.isDesktopMode) {
        handsfree.plugin.socketConnector.sendMessage('keypress', {key: emitted.key})
      } else {
        document.dispatchEvent(new KeyboardEvent('keypress', {key: emitted.key}))
      }
    break
  }
}