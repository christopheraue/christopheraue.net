define([
    'base/lib/velocity'
], function(Velocity) {
    var Tile = Object.inherit({
        constructor: function(el) {
            this.el = el;
        },
        hide: function() {
            this.el.style.opacity = 0;
        },
        animateShow: function(delay, duration) {
            Velocity(this.el, {opacity: [1, 0]}, {duration: 0, easing: 'ease-in-out', delay: delay, queue: false});

            var sel = 0.9, /* tile edge length */
                ang = 30, /* angle */
                rad = Math.PI * ang/180; /* radian */

            var bottomGap = .5*sel * (1-Math.cos(rad));
            Velocity(this.el, {translateY: [bottomGap+'em', 0]}, {duration: duration/2, easing: 'ease-in-out', delay: delay, queue: false});
            Velocity(this.el, {translateY: 0}, {duration: duration/2, easing: 'ease-in-out', delay: delay+1/2*duration, queue: false});

            var frontGap = .5*sel * (1-Math.sin(rad));
            Velocity(this.el, {translateZ: [(-3*frontGap)+'em', (-2*sel)+'em']}, {duration: duration/2, easing: 'ease-in-out', delay: delay, queue: false});
            Velocity(this.el, {translateZ: 0}, {duration: duration/2, easing: 'ease-in-out', delay: delay+1/2*duration, queue: false});

            Velocity(this.el, {rotateX: [ang, 0]}, {duration: duration/2, easing: 'ease-in-out', delay: delay, queue: false});
            Velocity(this.el, {rotateX: 0}, {duration: duration/2, easing: 'ease-in-out', delay: delay+1/2*duration, queue: false});
        }
    });

    return Object.inherit({
        constructor: function(el) {
            this.tiles = el.querySelectorAll('.Logo-Row').toArray().map(function(row) {
                return row.querySelectorAll('.Logo-Col').toArray().map(function(col) {
                    return new Tile(col);
                });
            });
        },
        hide: function() {
            this.tiles.forEach(function(row) {
                row.forEach(function(tile) {
                    tile.hide();
                })
            });
        },
        animateShow: function(totalDuration) {
            var maxCols = this.tiles.reduce(function(memo, row) {
                    return Math.max(memo, row.length);
                }, 0),
                delayWeight = .8,
                delayPerTile = Math.floor(delayWeight*totalDuration/maxCols),
                DurationPerTile = Math.ceil((1-delayWeight)*totalDuration);

            this.tiles.forEach(function(row) {
                var delay = 0;
                row.forEach(function(tile) {
                    tile.animateShow(delay, DurationPerTile);
                    delay += delayPerTile;
                });
            });
        }
    });
});