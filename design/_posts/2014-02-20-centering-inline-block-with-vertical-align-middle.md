---
title: 'Centering an Inline-Block With Vertical-Align: Middle (CSS)'
summary: 'A way to vertically center an inline-block with CSS is to use vertical-align: middle. This is especially powerful when the area that an element is centered in has a height determined by its content.'
redirect_from: 
  - /2014/02/20/centering-with-vertical-align-middle
  - /2014/02/20/centering-with-vertical-align-middle/
  - /design/centering-with-vertical-align-middle
  - /design/how-to-vertically-center-element-in-div-of-unknown-height
---

The CSS properties `display: inline-block` and `vertical-align: middle` provide a flexible and maintainable way to center any content inside a `<div>`. The height of the `<div>` does not even need to be known and can by dynamically determined by its content.

Let's jump right in and start with

A Quick Example
---------------

<div id="example">
  <div class="full-area">
    <div class="container">
      <div class="center-area"><!--
        --><div class="centered">Yay, I'm centered in the blue area!</div>
      </div>
      <div class="content">Click to change content height</div>
    </div>
  </div>
</div>

<style type="text/css">
  #example .container {
    min-height: 8em;
    position: relative;
    cursor: pointer;
  }
  #example .content {
    height: 6em;
  }
  #example .center-area {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  #example .center-area:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  #example .centered {
    display: inline-block;
    vertical-align: middle;
  }

  /*making it prettier*/
  #example .full-area {
    background: lightgrey;
    color: white;
    height: 11em;
  }
  #example .center-area {
    text-align: center;
  }
  #example .container {
    padding: .5em;
    box-sizing: border-box;
    background: lightskyblue;
    line-height: 1;
  }
  #example .content {
    margin: 0;
    border: 2px solid white;
    box-sizing: border-box;
    transition: height 1s;
    text-align: center;
    font-weight: bold;
  }
  #example .centered {
    background: orange;
    padding: .5em;
    width: 80%;
  }
</style>

<script>
  !function() {
    var example = document.getElementById('example');
    var container = example.getElementsByClassName('container')[0];
    var content = example.getElementsByClassName('content')[0];
  
    container.addEventListener('click', function() {
      if (content.style.height)
        content.style.height = null;
      else
        content.style.height = '10em';
    });
  }();
</script>

The minimal markup and CSS:

{% highlight html %}
<div class="container">
  <div class="center-area"><!--
 --><div class="centered">
      Yay, I'm centered in the blue area!
    </div>
  </div>
  <div class="content">
    <!-- Some content defining the
         height of the container -->
  </div>
</div>

<style type="text/css">
  .container {
    min-height: 8em;
    position: relative; /* so center-area can
                           be positioned absolute */
  }
  .center-area {
    /* let it fill the whole container */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .center-area:before {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
  }
  .centered {
    display: inline-block;
    vertical-align: middle;
  }
</style>
{% endhighlight %}

This approach has a few advantages:

- You don't need to know the dimensions of the elements to be centered.
- The CSS doesn't need to know the the size of the `.center-area`.
- The height of the `.container` can be defined by its content which can change dynamically.
- It's markup is relatively clean. Only one helper element (the `.center-area`) is required.
- It is able to vertically align more than one element next to each other.
- It is supported across all browsers.

But there is still a caveat. You have to **take care of the white-space between inline-elements in your mark-up**. The markup looks like:

{% highlight html %}
<div class="center-area">
  <div class="centered"></div>
</div>
{% endhighlight %}

If we included the pseudo-element, it would look like:

{% highlight html %}
<div class="center-area">::before
  <div class="centered"></div>
</div>
{% endhighlight %}

So, there is white-space between the `::before` and the `<div.centered>`: a line-break and some spaces. It all collapses to one space according to the rules html is processed by. This single space is nudging our centered element a bit to the right and might break the layout.

The space's size also differs for different fonts. For example, it is .625em for Courier and .25em for Helvetica. To keep that out of the equation, the white-space must be removed. There are two options:

<ul>
  <li>
  <p>Put both opening tags into one line:</p>
{% highlight html %}
<div class="center-area"><div class="centered">
</div></div>
{% endhighlight %}
  </li>
  <li>
  <p>Keep the indentation and add a comment to filter out the line-break and spaces.</p>
{% highlight html %}
<div class="center-area"><!--
 --><div class="centered"></div>
</div>
{% endhighlight %}
  </li>
</ul>
  
Changing the indentation of the mark-up or adding comments at the right places can be frustrating to maintain. But once you know it, it is quickly fixed.

If you despair of `vertical-align` from time to time, I recommend having a look at [the 3 reasons why vertical-align is not working](/design/why-vertical-align-is-not-working).
