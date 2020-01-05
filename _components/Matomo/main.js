import matomo from 'Matomo/instance'

matomo.with_api(tracker => tracker.trackVisibleContentImpressions())