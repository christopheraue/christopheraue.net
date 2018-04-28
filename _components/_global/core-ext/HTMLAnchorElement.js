define(function() {
    HTMLAnchorElement.prototype.extractCategory = function() {
        var hostname = this.hostname,
            pathname = this.pathname;

        if (hostname !== window.location.hostname) {
            return false;
        }

        if (pathname.charAt(0) === '/') {
            // Normalize all browsers with IE which has no leading slash.
            pathname = pathname.substring(1);
        }
        var category = pathname.split('/')[0];
        if (category === '') {
            category = 'home'
        }
        return category
    };

    HTMLAnchorElement.prototype.jumpsWithinPage = function() {
        var hostname = this.hostname,
            pathname = this.pathname;

        if (hostname !== window.location.hostname) {
            return false;
        }

        return pathname === window.location.pathname;
    };

    HTMLAnchorElement.prototype.leavesWebsite = function() {
        return this.hostname !== window.location.hostname;
    };

    HTMLAnchorElement.prototype.delayLocationChangeUntil = function(element, event) {
        this.addEventListener('click', function(e) {
            var eventHandler = function() {
                window.location = this.href;
                element.removeEventListener(event, eventHandler, false);
            }.bind(this);
            element.addEventListener(event, eventHandler, false);
            e.preventDefault();
        }.bind(this));
    };
});