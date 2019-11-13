import TheatreScreen from 'base-TheatreScreen/main'

document.ready(_ => {
  const screen = document.querySelector('.collateral-Theatre-Screen > .base-TheatreScreen')

  if (!screen) return

  const theatreScreen = new TheatreScreen(screen)
  const video = screen.querySelector('.base-Video-YouTube').__component__

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