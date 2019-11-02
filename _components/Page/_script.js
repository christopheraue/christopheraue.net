import basePageTransition from 'base-PageTransition/main'
import PageTransition from './PageTransition'
import ScrollControl from 'base/ScrollControl'

document.ready(_ => {
  basePageTransition.register(new PageTransition())
  ScrollControl.scrollToHashAnchors('1s')
})