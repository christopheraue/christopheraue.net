---
layout: article
title: 'Vertical Centering With CSS using vertical-align: middle'
category: articles
tags: vertical-centering inline-block vertical-align
image: stone_circles.jpg
excerpt: 'The best way to vertically center elements with CSS is by using display: inline-block in conjunction with vertical-align: middle. This articles explains why it is the best way, what its limits are and what to keep in mind using this technique.'
meta_description: 'Find out why you should vertically center elements with vertical-align and what you need to keep in mind when working with this technique.'
---

If you need to vertically center elements with CSS I strongly recommend using `display: inline-block` in conjunction with `vertical-align: middle`. The technique is explained on [CSS-Tricks](http://css-tricks.com/centering-in-the-unknown/). I won't go into the details here, so take a look at the linked article.

Why is it the best way? **It is the solution that works in almost all situations**:

- You don't need to know the dimensions of the elements to be centered, at all.
- You don't need to know the the size of the outer area your elements are centered in upfront. You need to know and set it at some point (more on that below), but your CSS doesn't need to change for individual heights.
- It works for block and inline elements alike, since you explicitly set the `display` property.
- It is semantically clean by not adding any helper elements to your mark-up besides one pseudo-element.
- It is supported across browers (IE8+).
- It is able to vertically center more than one element next to each other.

Especially, that the height of the centered element(s) can be flexible sets this method apart from all other methods relying on absolute positioning with [negative margins](http://css-tricks.com/snippets/css/exactly-center-an-imagediv-horizontally-and-vertically/) or [margin: auto](http://coding.smashingmagazine.com/2013/08/09/absolute-horizontal-vertical-centering-css/). **This makes the vertical-align method the most maintainable**. Need to replace an image with one of a different size? No problem, just set the path to the new file. You can leave the CSS alone. Or are you centering a block of text? Rewrite the text and it is still perfectly aligned.

Trying to Vertically Center In An Area With Height Set To 'Auto'
----------------------------------------------------------------
There is one drawback, if you want to call it one: **It does not work, if the height of the outer element is determined by the height of its content**. This means, it does not work, if the `height` property of the outer element evaluates to `auto`, eventually. This particularly happens in the following scenarios (Have a look at the CSS specs about [height](http://www.w3.org/TR/CSS2/visudet.html#propdef-height) for more details.):

- You do not set `height` at all. It defaults to `auto`.

- You do set `height`, but you set it to `auto`. Even if you set a `min-height` to an absolute length, say `200px`, `height` still evaluates to `auto`. It needs to be prepared, if your content makes the element taller than its min-height. The height then becomes defined by the content, again.

- You do set `height` to a percentage, but the parent's `height` evaluates to `auto`. You end up with `height` been set to `auto` for your element, because it contributes to the height of its parent. Otherwise it could happen, that the element increases the height of its parent. In turn, this increases the height of the element, because of its percentaged height. This increases the height of the parent, again. Which leads to... [To infinity and beyond!](http://www.youtube.com/watch?v=ejwrxGs_Y_I)

Why do we need a definite height on the outer element? Because the pseudo-element in our solution has a `height` set to `100%`. Look at the last bullet point above to see, what happens, if the outer element's `height` evaluates to `auto`. The pseudo-element gets a `height` of `auto`, too. Its content is an empty string. So its height will be one line-height, not the full height of its parent.

<div class="square">
    <iframe src="http://s.codepen.io/christopheraue/fullpage/HwfJB?">&nbsp;</iframe>
</div>

**So, is this bad, after all?** To vertically center something, you need to know the top and bottom edge of the area to center in. If you cannot fix these bounds by any means, neither by setting an explicit height nor by positioning the top and bottom of an absolute positioned element, you cannot expect to center something in there.

With this in mind: You want to vertically center an element in an area with min-height using `vertical-align: middle`? Have a look at the box on the left ([Source](http://codepen.io/christopheraue/pen/HwfJB)).

A Small Fix For The White-Space Problem
---------------------------------------
But there is still something, that I dislike about the approach. As said in the closing note on CSS-Tricks:

> The 0.25em nudge-back is a little janky.

**So why is there a the space, anyway?** It comes from the white-space between inline-elements **present in your mark-up**. The markup looks like:

    <div class="center-area">
        <div class="centered"></div>
    </div>

If we included the pseudo-element, it would look like:
    
    <div class="center-area">::before
        <div class="centered"></div>
    </div>

So, we have white-space between the `::before` and the `<div.centered>`: a line-break and some spaces. They collapse to one space according to the rules html is processed by. This single space is the gap we are seeing. To remove it, remove the white-space. You have two options:

- Put everything both opening tags into one line:
  
      <div class="center-area"><div class="centered">
      </div></div>

- Keep the indentation and add a comment to filter out the line-break and spaces.
      
      <div class="center-area"><!--
          --><div class="centered"></div>
      </div>
  
This way, we can remove the space. This is a good thing, since it is not proportional to the em length across different fonts. For example, it is .625em for Courier and .25em for Helvetica. This is quite a difference. We had to explicitly set the margin of the pseudo-element for every font. Changing indentation of your mark-up or adding comments at the right places can also be bad for maintenance, since it can be overlooked very easily. But once you know it, it is quickly fixed making it the lesser evil in my opinion.