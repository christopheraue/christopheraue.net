/*
 * On-page debug output.
 */

define([
    'core-ext/document'
], function () {
    var body = document.getElementsByTagName('body')[0];

    var wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'js-onpage-debug');
    wrapper.setAttribute('style', 'display: flex; position: fixed; bottom: 0; max-height: 50%;' +
        ' overflow: hidden; background: rgba(0,0,0,0.66); z-index: 999999; font-size: 16px');

    var debug = document.createElement('div');
    debug.setAttribute('style', 'align-self: flex-end');

    wrapper.appendChild(debug);
    body.insertBefore(wrapper, body.firstChild);

    var debugIdx = 0;
    return {
        log: function(msg) {
            debug.innerText += debugIdx++ + " " + msg + "\n";
        }
    }
});