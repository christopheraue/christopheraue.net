define(function() {
    document.ready = function(f) {
        if (this.readyState !== 'loading'){
            f();
        } else {
            this.addEventListener('DOMContentLoaded', f);
        }
    }
});