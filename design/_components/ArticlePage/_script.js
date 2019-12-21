import scriptjs from 'scriptjs'

document.ready(function () {
  const hostname = 'christopheraue.net';

  if (location.hostname === hostname && document.getElementById('disqus_thread')) {
    window.disqus_shortname = 'christopheraue'
    window.disqus_config = function () {
      this.page.url = location.href;
      this.page.identifier = location.pathname;
    }

    scriptjs('//' + window.disqus_shortname + '.disqus.com/embed.main.js')
    scriptjs('//' + window.disqus_shortname + '.disqus.com/count.js')
  }
})