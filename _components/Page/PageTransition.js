export default Object.inherit({
  transitionIn() {
    // nothing special to do
  },
  transitionOut(transition, onTransitioned) {
    onTransitioned(this)
  }
})