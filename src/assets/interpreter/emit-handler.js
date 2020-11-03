/**
 * Handles Interpreter emits
 */
export default (ev) => {
  let emitted = ev.properties

  switch (emitted.event) {
    case 'keypress':
      console.log(emitted.data)
    break
  }
}