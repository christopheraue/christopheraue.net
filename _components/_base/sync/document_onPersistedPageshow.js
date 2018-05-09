define(function() {
    document.onPersistedPageshow = function(f) {
        // Side effects on unload might be persisted/cached and interferes
        // when navigating the browser history. (e.g. in Safari)
        var listener = function(e) {
            if (!e.persisted) { return }
            f();
            window.removeEventListener('pageshow', listener, false);
        };
        window.addEventListener('pageshow', listener, false);
    }
});