---
title: 'Vertical Centering With CSS using vertical-align: middle'
summary: 'A way to vertically center elements with CSS is by using display: inline-block together with vertical-align: middle. This article explains how to do it, what its limits are and what to keep in mind when using this technique.'
redirect_from: /2014/02/20/centering-with-vertical-align-middle
---

*Note from 2018: Nowadays, if your browser demographic allows it, you might want to use [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).*

If I need to vertically center elements with CSS I almost always end up using `display: inline-block` together with `vertical-align: middle`. `vertical-align` may not always behave the way you expect it to—I've dedicated a [complete article]({{ site.url | append: '/2014/03/05/vertical-align/' }}) to it—but here it's the solution to go for.

A Quick Example
---------------

<div id="example">
  <div class="full-area">
    <div class="container">
      <div class="center-area"><!--
        --><div class="centered">Yay, I'm centered in the blue min-height area!</div>
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
    transition: height 2s;
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
    --><div class="centered">Yay, I'm centered ...!</div>
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

Why this way? **It is the solution that works in almost all situations**:

- You don't need to know the dimensions of the elements to be centered, at all.
- You don't need to know the the size of the outer area your elements are centered in upfront. You need to know and set it at some point (more on that below), but your CSS doesn't need to change for individual heights.
- It works for block and inline elements alike, since you explicitly set the `display` property.
- It is semantically clean by not adding any helper elements to your mark-up besides one pseudo-element.
- It is supported across browers (IE8+).
- It is able to vertically center more than one element next to each other.

Especially, that the height of the centered element(s) can be flexible sets this method apart from all other methods relying on absolute positioning with [negative margins](http://css-tricks.com/snippets/css/exactly-center-an-imagediv-horizontally-and-vertically/) or [margin: auto](http://coding.smashingmagazine.com/2013/08/09/absolute-horizontal-vertical-centering-css/). **This makes the vertical-align method the most maintainable**. Need to replace an image with one of a different size? No problem, just set the path to the new file. You can leave the CSS alone. Or are you centering a block of text? Rewrite the text and it is still perfectly aligned.

The technique is also explained on [CSS-Tricks](http://css-tricks.com/centering-in-the-unknown/).

Vertical Centering in an Area of Unknown Height
-----------------------------------------------
There is one drawback, if you want to call it one: **It does not work, if the height of the outer element is determined by the height of its content**. This means, it does not work, if the `height` property of the outer element evaluates to `auto` eventually. This particularly happens in the following scenarios (Have a look at the CSS specs about [height](http://www.w3.org/TR/CSS2/visudet.html#propdef-height) for more details.):

- You do not set `height` at all. It defaults to `auto`.

- You do set `height`, but you set it to `auto`. Even if you set a `min-height` to an absolute length, say `200px`, `height` still evaluates to `auto`. It needs to be prepared, if your content makes the element taller than its min-height. The height then becomes defined by the content, again.

- You do set `height` to a percentage, but the parent's `height` evaluates to `auto`. You end up with `height` been set to `auto` for your element, because it contributes to the height of its parent. Otherwise it could happen, that the element increases the height of its parent. Which in turn would increase the height of the element, because of its percentage height. This increases the height of the parent, again. Which leads to... [To infinity and beyond!](http://www.youtube.com/watch?v=2VSYmGSJtCA)

Why do we need a definite height on the outer element? Because the pseudo-element in our solution has a `height` set to `100%`. Look at the last bullet point above to see, what happens, if the outer element's `height` evaluates to `auto`. The pseudo-element gets a `height` of `auto`, too. Its content is an empty string. So its height will be one line-height, not the full height of its parent.

**So, is this bad, after all?** To vertically center something, you need to know the top and bottom edge of the area to center in. If you cannot fix these bounds by any means, neither by setting an explicit height nor by positioning the top and bottom of an absolute positioned element, you cannot expect to center something in there.

A Small Fix For The White-Space Problem
---------------------------------------
But there is still something, that I dislike about this approach. You have to **take care of the white-space between inline-elements in your mark-up**. The markup looks like:

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

So, there is white-space between the `::before` and the `<div.centered>`: a line-break and some spaces. It all collapses to one space according to the rules html is processed by. This single space is nudging our centered element a bit to the right and might break the layout. Even worse, the space's size differs for different fonts. For example, it is .625em for Courier and .25em for Helvetica. To keep that out of the equation, the white-space must be removed. There are two options:

- Put both opening tags into one line:

  <div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"center-area"</span><span class="nt">&gt;&lt;div</span> <span class="na">class=</span><span class="s">"centered"</span><span class="nt">&gt;</span>
  <span class="nt">&lt;/div&gt;&lt;/div&gt;</span></code></pre></div>

{% comment %}
{% highlight html %}
<div class="center-area"><div class="centered">
</div></div>
{% endhighlight %}
{% endcomment %}

- Keep the indentation and add a comment to filter out the line-break and spaces.

  <div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"center-area"</span><span class="nt">&gt;</span><span class="c">&lt;!--</span>
  <span class="c"> --&gt;</span><span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"centered"</span><span class="nt">&gt;&lt;/div&gt;</span>
  <span class="nt">&lt;/div&gt;</span></code></pre></div>

{% comment %}
{% highlight html %}
<div class="center-area"><!--
 --><div class="centered"></div>
</div>
{% endhighlight %}
{% endcomment %}
  
Changing the indentation of the mark-up or adding comments at the right places can be frustrating to maintain. But once you know it, it is quickly fixed and making it the lesser evil in my opinion.

Further Reading
---------------
If you despair of `vertical-align` from time to time, I recommend having a look at my in-depth article [All You Need To Know About Vertical-Align](/design/vertical-align).
