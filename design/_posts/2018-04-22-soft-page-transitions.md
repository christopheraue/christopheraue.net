---
title: Soft Page Transitions
summary: Every website has hard page transitions by default. It's the effect that after a new page is loaded it immediately replaces the old one. It's jarring and ugly. A soft page transition where the old page fades out and the new one fades in is a more pleasing alternative.
---

Soft page transitions? Ehm, what?

I'm talking about **fading a page out on *unload* and the new page in on *load***. You can see the effect here:

<figure>
  {% block Video src="/design/soft-page-transitions/soft_page_transition" controls="minimal" attributes="loop preload=\"auto\"" %}
  <figcaption>A soft page transition</figcaption>
</figure>

It's subtle—as it should be to not get into the way of the user. For comparision, here is the usual hard page transition:

<figure>
  {% block Video src="/design/soft-page-transitions/hard_page_transition" controls="minimal" attributes="loop preload=\"auto\"" %}
  <figcaption>A hard page transition</figcaption>
</figure>

After the new page has been loaded it is simply slapped over the old one. Pretty rough.

Why care about this?
--------------------

**Although everyone is pretty used to hard transitions they are still jarring—if only unconsciously.** It is caused by very little pattern continuity between the pages: Elements are completely different for the most part and after scrolling the layout is offset, too. In short: There isn't much that anchors the eye of the user and stays constant across a page load. No constancy means disorientation and this isn't exactly something we humans like.

Now, let's make this disorientation very sudden. Oh, we humans like this even less. Where am I? Am I safe? Do I need to react to something? Better get prepared. Just in case. Get prepared, now! It doesn't matter if it's just a plain, boring page load in a web browser. It *could* be different this time. We can't control time, it's sudden, it might require our reflexes. If you pay attention to the hard page transition above and are not totally numb you will feel a little irritated for a moment. Until the effect of the sudden change dampened off and your body gives the all-clear.

Compare this with the **soft page transition**. The content of the two pages still looks completely different but due to the fade the transition comes across as a slow and gentle change. **It is like holding your users' hand** and guiding them calmly from here to there.

Oh, and besides all this psychological mumbo-jumbo, **it just looks nice**!

Some HTML and CSS
-----------------

Enough talk. Let's get to it. We need an element to create the fade effect:

```html
<svg id="fader"></svg>
```

This little, innocent `#fader` has to span the whole area of the viewport and must be placed above everything else on the page. Somewhere in our styles we have to have the following rules:

```css
#fader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999999;
```

Why is it an `<svg>` element? Because the Internet Explorer does not support `pointer-events` on non-SVG elements. Since we placed `#fader` above everything else we need to make sure it does not interfere with any interaction with the page below it:

```
    pointer-events: none;
```

In this example the page simply fades out to white and fades in from white:

```
    background: white;
```

Lastly, it will be animated with a CSS animation. A duration of `300ms` is slow enough to be noticeable but it's still fast enough that it does not feel cumbersome. We also make sure the animation accelerates at its beginning as much as it decelerates at its end:

```
    animation-duration: 300ms;
    animation-timing-function: ease-in-out;
}
```

What's left is to define the actual animation of the `#fader`'s `opacity`:

```css
@keyframes fade-out {
    from { opacity: 1 }
      to { opacity: 0 }
}

@keyframes fade-in {
    from { opacity: 0 }
      to { opacity: 1 }
}

#fader.fade-out {
    opacity: 0;
    animation-name: fade-out;
}

#fader.fade-in {
    opacity: 1;
    animation-name: fade-in;
}
```

Now, every time the `#fader` is assigned the CSS class `fade-in` or `fade-out` the corresponding animation plays. Directly after a page load it has none of these classes, thus it's visible and hides the page underneath. On to the next point on the list.

Fading In a Page Immediately After Load
---------------------------------------

And by *immediately after load* I mean immediately after the browser **started** to receive and render the first bytes of the page. Do not wait for the `DOMContentLoaded` event let alone the `load` event or else the page will flicker. The solution is straight forward: Make the `#fader` the first child of the `<body>` and embed a script right after it. Such as:

```html
<html>
    …
    <body>
        <svg id="fader"></svg>
        <script>
            fadeInPage();
        </script>
        …
    </body>
</html>
```

The javascript:

```javascript
function fadeInPage() {
```

First, since we use CSS animations to create the fade effect bail out for browsers not supporting them (e.g. IE 9):

```javascript
    if (!window.AnimationEvent) { return; }
```

Then, let the `fade-out` animation play. Fading *out* the `#fader` will fade *in* the page.

```javascript
    var fader = document.getElementById('fader');
    fader.classList.add('fade-out');
}
```

Fade in: Check! Fade out: Next!

Fading Out a Page Before Unload
-------------------------------

Let's go through our options:

The `unload` event happens when the DOM is no longer available. No DOM means there is nothing left that could be faded out. The same goes for the `pagehide` event. So, no hooking into the `unload` or `pagehide` event.

The `beforeunload` event looks like a more promising candidate. It is triggered while the DOM is still available but there are some pitfalls. There is generally not enough time to play a reasonably slow fade before the page unloads. It is either too slow and cut off by the actual unload and looks like a hard transition again or it must be made so fast that it, again, looks like a hard transition. And let's not get into the territory of deferring the page unload here… It's futile anyway because Chrome plays spoilsport by completely stopping to process anything that happens on the website during the `beforeunload` event. Animations do not play, javascript manipulating the DOM is deferred until the end of the event. So, no hooking into the `beforeunload` event.

All in all, there is no general way to catch the moment when a user leaves a webpage that can be used here. But what we *can* do is approximating it by hooking into the `click` event of all `<a>` elements. The user clicks a link to leave the page, right? At least for the most part. Observing clicked links won't let us fade the page when the user changes the URL in the address bar or browses back or forth in the history. But that's basically it. It would be nice, but we don't really need that. Compared to a clicked link these are rare cases. And regarding links, navigating away to a different website also does not need to trigger a fade. Since the other website is very likely not to have a fade in it will look like a hard transition anyway.

Ok, we only need to do a page transition when following links within the website then. In an inline or external script we have to write the following:

```javascript
document.addEventListener('DOMContentLoaded', function() {
```

Again, bail out for browsers not supporting CSS animations:

```javascript
    if (!window.AnimationEvent) { return; }
```

We iterate over all anchors:

```javascript
    var anchors = document.getElementsByTagName('a'),
        anchor;
    
    for (var idx=0; idx<anchors.length; idx+=1) {
        anchor = anchors[idx];
```

Links to other websites are disregarded:

```javascript
        if (anchor.hostname !== window.location.hostname) {
            return;
        }
```

For all internal links defer the location change until the animation has finished playing.

```javascript
        anchor.addEventListener('click', function(event) {
            var fader = document.getElementById('fader');
            
            var listener = function () {
                window.location = event.currentTarget.href;
                fader.removeEventListener('animationend', listener);
            };
            fader.addEventListener('animationend', listener);
            
            event.preventDefault();
```

And, finally, initiate the fade. Fading *in* the `#fader` element, fades *out* the page.

```javascript
            fader.classList.add('fade-in');
        });
    }
});
```

That's it. Basically. But there is still one thing we need to take care of. Some browsers, especially Safari, use cached versions of a webpage when navigating the browser history. Since the page was faded out, it will be displayed as such when going back to it. We need to clean up in this case:

```javascript
window.addEventListener('pageshow', function (event) {
  if (!event.persisted) {
    return;
  }
  var fader = document.getElementById('fader');
  fader.classList.remove('fade-in');
});
```

That got out of the way, we are now *really* done. 