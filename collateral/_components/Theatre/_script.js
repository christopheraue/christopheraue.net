import TheatreScreen from 'base-TheatreScreen/main'
import YouTubeVideo from 'base-Video/YouTubeVideo'

document.ready(_ => {
  const screen = document.querySelector('.collateral-Theatre-Screen > .base-TheatreScreen')

  if (!screen) return

  const theatreScreen = new TheatreScreen(screen)
  const video = new YouTubeVideo(screen.getElementsByTagName('iframe')[0])

  video.addEventListener('stateChange', e => {
    switch (e.data.to) {
      case 'buffering':
      case 'playing':
        theatreScreen.focus('1s ease-in-out')
        break
      case 'ended':
        theatreScreen.unfocus()
        break
    }
  })

  screen.addEventListener('click', _ => {
    theatreScreen.unfocus()
    video.pause()
  })
})