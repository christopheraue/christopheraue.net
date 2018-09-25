define([
  'Matomo/instance'
], function(matomo) {
  matomo.with_api(function(tracker) {
    tracker.trackVisibleContentImpressions();
  });
});