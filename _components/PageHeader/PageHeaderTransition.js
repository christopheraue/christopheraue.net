import ScrollControl from 'base/ScrollControl'

const CSS_DURATION = /^(\d+(?:\.\d+)?)(s|ms)$/

export default class PageHeaderTransition {
  constructor() {
    this.el = document.querySelector('.PageHeader')
  }

  transitionIn() {
    if (!this.el || !this.el.classList.contains('prepare-transition-in')) return

    this.el.classList.remove('prepare-transition-in')
    this.el.classList.add('transition-in')

    const removeTransition = _ => {
            this.el.removeEventListener('animationend', removeTransition)
            this.el.classList.remove('transition-in')
          }
    this.el.addEventListener('animationend', removeTransition)
  }

  transitionOut(transition, onTransitioned) {
    if (!this.el) {
      transition.transitionHeader = true
      onTransitioned(this)
      return
    }

    if (ScrollControl.isInView(this.el)) {
      const match = getComputedStyle(this.el)['animation-duration'].match(CSS_DURATION)
      const duration = (match[2] === 's' ? 1000 : 1) * parseFloat(match[1])
      transition.transitionHeader = false
      ScrollControl.smoothScrollIntoView(document.body, {
        anchor: 'top',
        transition: duration + 'ms ease-in-out',
        ontransitionend: _ => onTransitioned(this)})
    } else {
      transition.transitionHeader = true

      this.el.classList.add('transition-out')
      document.onPersistedPageshow(_ => this.el.classList.remove('transition-out'))

      if (window.AnimationEvent) {
        const removeTransition = _ => {
                this.el.removeEventListener('animationend', removeTransition)
                onTransitioned(this)
              }
        this.el.addEventListener('animationend', removeTransition)
      } else {
        onTransitioned(this)
      }
    }
  }
}