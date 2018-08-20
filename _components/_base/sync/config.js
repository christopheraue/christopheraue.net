require.config({
  paths: {
    'google-analytics': '//www.google-analytics.com/analytics'
  },
  shim: {
    'google-analytics': {
      exports: 'ga'
    }
  }
});