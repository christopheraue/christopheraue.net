define(function () {
    return Object.inherit({
        logIdx: 0,
        constructor: function () {
            var wrapper = document.createElement('div');
            wrapper.setAttribute('id', 'js-onpage-debug');
            wrapper.setAttribute('style', 'display: flex; position: fixed; bottom: 0; max-height: 50%;' +
                ' overflow: hidden; background: rgba(0,0,0,0.66); z-index: 999999; font-size: 16px');

            this.logArea = document.createElement('div');
            this.logArea.setAttribute('style', 'align-self: flex-end');

            wrapper.appendChild(this.logArea);
            document.body.insertBefore(wrapper, document.body.firstChild);
        },
        log: function(msg) {
            this.logArea.innerText += this.logIdx++ + " " + msg + "\n";
        }
    });
});