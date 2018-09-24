---
title: 'Why This Damn vertical-align Is Not Working'
summary: 'There are three things you need to know about the CSS property vertical-align to make it work: 1. It aligns elements in a line of text which 2. might change its height and 3. might reposition its baseline.'
---

Yeah! Why the hell does the CSS property `vertical-align` never work?

Goddammit.

The Answer has three parts:

1) First, `vertical-align` aligns elements **relative to the dimensions of the line** the element appears in.

Nope, *not* relative to the container element. See?

<figure class="ContainerAlign-Example">
    <div class="container bg-light large font tall-line-height">
        Line above
        <br>
        <span class="overlay">
            <span class="top-line"></span><!--
         --><span class="baseline-line"></span><!--
         --><span class="bottom-line"></span><!--
     --></span><!--
     --><span class="line"><!--
         --><span class="top">top</span>
            <span class="middle">middle</span>
            <span class="bottom">bottom</span>
        </span>
        <br>
        Line bellow
    </div>
    <figcaption>grey area: the container element, red line: top and bottom of 2nd line, blue line: baseline of 2nd line</figcaption>
</figure>

Fire up the dev tools to poke around in the markup of the example!

But here's also a simplified version of it:

{% highlight html %}
<div class="container">
    Line above
    <br>
    <span class="top">top</span>
    <span class="middle">middle</span>
    <span class="bottom">bottom</span>
    <br>
    Line bellow
</div>
{% endhighlight %}

On to rule number 2 of `vertical-align`:

2) **The line changes its height** to house all the elements it contains. The minimum height of a line is the
`line-height`. This is also its default height.

Alright, then let's add a tall inline-block to the mix and see what happens:

<figure class="ContainerAlign-Example">
    <div class="container bg-light large font tall-line-height">
        Line above
        <br>
        <span class="overlay">
            <span class="top-line"></span><!--
         --><span class="baseline-line"></span><!--
         --><span class="bottom-line"></span><!--
     --></span><!--
     --><span class="line"><!--
         --><span class="inline-block taller bg-grey"></span>
            <span class="top">top</span>
            <span class="middle">middle</span>
            <span class="bottom">bottom</span>
        </span>
        <br>
        Line bellow
    </div>
    <figcaption>Same setting as above but with a tall grey element in the front</figcaption>
</figure>

Markup:

{% highlight html %}
<div class="container">
    Line above
    <br>
    <span class="tall-bar"></span>
    <span class="top">top</span>
    <span class="middle">middle</span>
    <span class="bottom">bottom</span>
    <br>
    Line bellow
</div>
{% endhighlight %}

And that already fucks up our layout. Sigh… Well, at least *top* and *bottom* still behave as expected. But *middle* is
definitely not in the middle.

But, you can see, the line got taller.

Fixing the layout brings us to consideration three.

3) **The baseline of a line is placed where ever it needs to be** to fulfill the alignment.

Without an explicit alignment the bar is placed on top of the baseline (the blue line). Since it is so tall it pushes
the baseline down and takes the *middle* text with it. But why does the baseline even play a role when aligning with the middle?
Because `vertical-align: middle` places elements relative to the baseline according to the formula `baseline + x-height/2`.
`middle` means alignment with the middle of the line's text. And this text sits on the baseline.

To move the baseline up again, we need to align the bar itself with `vertical-align: middle`.

<figure class="ContainerAlign-Example">
    <div class="container bg-light large font tall-line-height">
        Line above
        <br>
        <span class="overlay">
            <span class="top-line"></span><!--
         --><span class="baseline-line"></span><!--
         --><span class="bottom-line"></span><!--
     --></span><!--
     --><span class="line"><!--
         --><span class="inline-block taller bg-grey middle"></span>
            <span class="top">top</span>
            <span class="middle">middle</span>
            <span class="bottom">bottom</span>
        </span>
        <br>
        Line bellow
    </div>
    <figcaption>Same setting as above but with the tall grey element aligned with the middle</figcaption>
</figure>

Markup:

{% highlight html %}
<div class="container">
    Line above
    <br>
    <span class="tall-bar middle"></span>
    <span class="top">top</span>
    <span class="middle">middle</span>
    <span class="bottom">bottom</span>
    <br>
    Line bellow
</div>
{% endhighlight %}

Voila.

Inspired by the explanation and examples above you should now be able to figure out why `vertical-align` does not work
in your particular situation.

For an even deeper look at `vertical-align` you might want to read [Vertical-Align: All You Need To Know](/design/vertical-align).