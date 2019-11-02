import basePageTransition from 'base-PageTransition/main'
import PageHeaderTransition from './PageHeaderTransition'

document.ready(_ => {
  basePageTransition.register(new PageHeaderTransition())
})