---
layout: article
title: 'All You Need To Know About Vertical-Align In CSS|How vertical-align In CSS Really Works|Mastering Vertical-Align'
category: articles
tags: inline-block vertical-align line-box
image: fence.jpg
excerpt: ...
meta_description: ...
---

Whenever I design for the web I come across at least a couple situations where I need to place some elements side by side and align them properly along a horizontal line. Sometimes I solve it with `float`, sometimes with `position: absolute`, sometimes even dirty by manually adding margins or paddings. I don't really like these solutions. Floats only align at their tops and need to be cleared manually. Absolute positioning takes the elements out of the flow so they do no longer affect their surroundings. And working with fixed margins and paddings immediately breaks things on the tiniest change.

But there is another player here: **`vertical-align`**. I think it deserves more credit. `vertical-align` lets you align elements very flexible and fine-grained. The sizes of elements need not to be known. Elements stay in the flow so other elements can automatically react to changed dimensions of those. This all sounds great.

Peculiarities Of Vertical-Align
-------------------------------
But, `vertical-align` can be a real scumbag sometimes. This makes working with it a little frustrating, too. Here are two examples revealing some seemingly mysterious rules at work:

### Centered Icons Are Not Really Centered
I just want to vertically center a small icon in a line of text.

<div class="example">
    <span class="box bg-grey middle"> </span> text centered next to icon, is it not?
</div>

    <span class="icon"></span> text centered next to icon, is it not?

with

    .icon {
        display: inline-block;
        vertical-align: middle;
    }

Ok, the icon is placed around the center. But you can see, there is something off... We can fix this by wrapping the text in a tag and align it, too.

<div class="example">
    <span class="box bg-grey middle"> </span> <span class="middle">text centered next to icon</span>
</div>

    <span class="icon"></span>
    <span class="text">text centered next to icon</span>

with an additional

    .text {
        vertical-align: middle;
    }

Ah, better. But why was this necessary? `vertical-align: middle` aligns elements to the middle of a text, right?

### Mysterious Influence On Other Elements In a Line
I might have the following setting (the top and bottom of the line are marked with a dotted line):

<div class="example">
    <span class="red dotted line top"> </span><!--
 --><span class="red dotted line bottom"> </span><!--
 --><span class="center"><span class="taller box bg-grey bottom"> </span> <span class="tall box bg-grey middle"> </span></span>
</div>

    <span class="tall-box"></span>
    <span class="short-box"></span>

with

    .tall-box {
        display: inline-block;
        vertical-align: bottom;
    }
    
    .short-box {
        display: inline-block;
        vertical-align: middle;
    }

First of all, Mr. Short Box, why aren't you centered vertically? But it gets even more mysterious, if we set the `vertical-align` of `.tall-box` to `top`:

<div class="example">
    <span class="red dotted line top"> </span><!--
 --><span class="red dotted line bottom"> </span><!--
 --><span class="center"><span class="taller box bg-grey top"> </span> <span class="tall box bg-grey middle"> </span></span>
</div>

The markup is the same as above. The rest of the CSS is the same as above. So, hey again, Mr. Short Box?! Why did you move?! I haven't done anything to you.

Unfortunately, most resources on the matter are somewhat shallow. They concentrate on the misconception of trying to [vertical align everything inside an element](http://phrogz.net/CSS/vertical-align/). They give [basic introductions](http://css-tricks.com/what-is-vertical-align/) into the property and explain how elements are aligned in very simple situations. Or [both](http://www.impressivewebs.com/css-vertical-align/). They do not explain the behavior in the examples above.

So, I sat down to get the hang of this little bastard. Mostly reading through the [W3C](http://www.w3.org/TR/CSS2/visudet.html#line-height) [specifications](http://www.w3.org/TR/CSS2/visuren.html#inline-formatting) and playing with some examples. I think, now, I can **clarify the behavior of vertical-align once and for all**. The result is this article. So, let's tackle the rules of the game.

Requirements For Vertical-Align
-------------------------------
`vertical-align` is used for aligning [inline-level elements](http://www.w3.org/TR/CSS2/visuren.html#inline-level). These are elements, whose `display` property evaluates to 
* inline,
* inline-block or
* inline-table (not considered in this article).

**Inline elements** are basicly text.

**Inline-block elements** are what their name suggests: block elements living inline. They can have a width and height (possibly defined by its own content) as well as padding, a border and margin.

Inline-level elements are laid out next to each other in lines. Once there are more elements that fit into the current line, a new line is created beneath it. All these lines have a so-called **line box**, which encloses all the content of its line. Differently sized content means line boxes of different height. In the following illustration the top and bottom of line boxes are indicated by dotted lines.

<div class="example">
    <span class="red dotted line top"> </span><!--
 --><span class="red dotted line bottom"> </span><!--
 --><span class="center">A tall
    <span class="tall box bg-grey baseline"> </span>
    in a line of text.</span><br/>
    <span class="red dotted line bottom"> </span><!--
 --><span class="center">A short
    <span class="shorter box bg-grey baseline"> </span>
    in a line of text.</span><br/>
    <span class="red dotted line bottom"> </span><!--
 --><span class="center">
        <span class="middle">This</span>
        <span class="tall box bg-grey text-top"> </span>
        <span class="top">can</span>
        <span class="tall box bg-grey text-bottom"> </span>
        <span class="bottom">happen.</span>
    </span>
</div>

The line boxes trace out the field we are playing on. Inside these line boxes the property `vertical-align` is responsible for aligning the individual elements. **So, in respect to what are elements aligned?**

About Baselines and Outer Edges
-------------------------------
The most important reference point to align vertically is the baseline of the involved elements. In some cases the top and bottom edge of the element's enclosing box becomes important, too. Let's have a look where the baseline and outer edges live for each type of element:

### Inline Element
<div class="example columns-3">
    <div class="large font"><!--
     --><span class="green dotted line text-top"> </span><!--
     --><span class="green dotted line text-bottom"> </span><!--
     --><span class="red dotted line top"> </span><!--
     --><span class="red dotted line bottom"> </span><!--
     --><span class="blue dotted line baseline"> </span><!--
     --><span class="center">aAÄ qQ</span>
    </div><!--

 --><div class="large font tall-line-height"><!--
     --><span class="green dotted line text-top"> </span><!--
     --><span class="green dotted line text-bottom"> </span><!--
     --><span class="red dotted line top"> </span><!--
     --><span class="red dotted line bottom"> </span><!--
     --><span class="blue dotted line baseline"> </span><!--
     --><span class="center">aAÄ qQ</span>
    </div><!--

 --><div class="large font short-line-height"><!--
     --><span class="inline-overlay"><!--
         --><span class="red dotted line top"> </span><!--
         --><span class="red dotted line bottom"> </span>
        </span><!--
     --><span class="green dotted line text-top"> </span><!--
     --><span class="green dotted line text-bottom"> </span><!--
     --><span class="blue dotted line baseline"> </span><!--
     --><span class="center">aAÄ qQ</span>
    </div>
</div>

Here you see three lines of text next to each other. The top and bottom edge of the line height is indicated by red lines, the height of the font by green lines and the baseline by a blue line. On the left, the text has a line height set to the *same height* as the font-size. The green and red line collapsed to one line on each side. In the middle, the line height is *twice as large* as the font-size. On the right, the line height is *half as large* as the font-size.

**The inline element's outer edges** align itself with the top and bottom edge of the line height. It *does not* matter, if the line height is smaller than the height of the font.

**The inline element's baseline** is the line, the characters are *sitting* on. It is *somewhere below the middle of the line height*. Have look at the W3C Specs for a [detailed definition](http://www.w3.org/TR/CSS2/visudet.html#leading).

### Inline-Block Element
<div class="example columns-3">
    <div class="top"><!--
     --><span class="red dotted line top"> </span><!--
     --><span class="red dotted line bottom"> </span><!--
     --><span class="blue dotted line baseline"> </span><!--
     --><span class="inline-block show-box-model"><!--
         --><span class="show-box-model-content">content</span>
        </span>
    </div><!--
    
 --><div class="top"><!--
     --><span class="red dotted line top"> </span><!--
     --><span class="blue dotted line baseline"> </span><!--
     --><span class="inline-block show-box-model" style="overflow: hidden"><!--
         --><span class="show-box-model-content">content</span>
        </span>
    </div><!--

 --><div class="top"><!--
     --><span class="red dotted line top"> </span><!--
     --><span class="blue dotted line baseline"> </span><!--
     --><span class="inline-block show-box-model"><!--
         --><span class="show-box-model-content"> </span>
        </span>
    </div>
</div>

<style type="text/css">
    .example .inline-block {
        display: inline-block;
        margin: .5em;
        padding: .5em;
        width: 4em;
        height: 1.5em;
        border-width: .5em;
        border-style: solid;
        text-align: center;
    }
</style>

From left to right you see: an inline-block element with [in-flow](http://www.w3.org/TR/CSS21/visuren.html#positioning-scheme) content, an inline-block element with in-flow content and `overflow: hidden` and an inline-block element with *no* in-flow content (but the content area has a height). The boundaries of the margin is indicated by red lines, the border is yellow, the padding green and the content area blue. The baseline of each inline-block element is shown as blue line.

**The Inline-block element's outer edges** are the top and bottom edge of its [margin-box](http://www.w3.org/TR/CSS2/box.html#x17) (red lines in the figure).

**The Inline-block element's baseline** depends on whether the element has in-flow content:

* In case of in-flow content the baseline of the inline-block element is the baseline of the last content element in normal flow (example on the left). For this last element the rules for finding the baseline of an inline element might apply, for example.
* In case of in-flow content but an `overflow` property evaluating to something other than `visible`, the baseline is the bottom edge of the margin-box (example in the middle). So, it is the same as the inline-block element's bottom edge.
* In case of *no* in-flow content the baseline is, again, the bottom edge of the margin-box (example on the right).

### Line Box
<div class="example">
    <span class="large font">
        <span class="green dotted line text-top"> </span><!--
     --><span class="green dotted line text-bottom"> </span><!--
     --><span class="red dotted line top"> </span><!--
     --><span class="red dotted line bottom"> </span><!--
     --><span class="blue dotted line baseline"> </span><!--
     --><span class="font color-grey">x</span><!--
     --><span class="center">
            <span class="middle bg-grey">This</span>
            <span class="tall box bg-grey text-top"> </span>
            <span class="top bg-grey">can</span>
            <span class="tall box bg-grey text-bottom"> </span>
            <span class="bottom bg-grey">happen.</span>
        </span>
    </span>
</div>

You've already seen this. This time I drew in the top and bottom of the line box's text box (green, more on this below) and the baseline (blue), too. The *x* at the beginning of the line shows where the text is naturally placed when there is no vertical alignment applied: i.e. on the baseline.

The line box has a **top edge** aligned to the top edge of the top-most element of this line and a **bottom edge** aligning to the bottom edge of the bottom-most element of the line. This is the box indicated by the red lines in the figure above.

**The line box's baseline** is variable:

<blockquote class="short">
    <p>CSS 2.1 does not define the position of the line box's baseline.</p>
    <footer>— the <a href="http://www.w3.org/TR/CSS2/visudet.html#line-height">W3C Specs</a></footer>
</blockquote>

This is probably the most confusing part, when working with vertical-align. It means, the baseline is placed where ever it needs to be to fulfil all other conditions like vertical-align and minimizing the line box's height. It is the free parameter in the equation.

Around its baseline the line box has what we might call a **text box**. This is defined just as an inline element box place in the line box without any alignment. Its top and bottom edges are set by the line height. This box is indicated by the green lines in the figure above. Since this text box is tied to the baseline, it moves when the baseline moves. (Side note: this text box is called [strut](http://www.w3.org/TR/CSS2/visudet.html#strut) in the W3C Specs)

Phew, this was the hard part. Now, we know everything to put things into perspective. Let's quickly sum up the most important facts:

* There is an area called *line box*. This is the area in which vertical alignment takes place. It has a *baseline*, a *text box* and a *top* and *bottom edge*.
* There are *inline-level elements*. These are the objects that are aligned. They have a *baseline* and and a *top* and *bottom edge*.

## The Values Of Vertical-Align
When looking at the specific values vertical-align can be set to, the reference points mentioned in the last sentence in the list above are set into certain relationships.

### Aligning the Element's Baseline Relative To the Line Box's Baseline
<div class="example">
    <span class="large font">
        <span class="blue dotted line baseline"> </span><!--
     --><span class="font color-grey">x</span><!--
     --><span class="center">
            <span class="baseline">baseline</span>
            <span class="sub"><span class="blue dotted line baseline"> </span>sub</span>
            <span class="super"><span class="blue dotted line baseline"> </span>super</span>
            <span class="baseline" style="vertical-align: -50%"><span class="blue dotted line baseline"> </span>-50%</span>
            <span class="baseline" style="vertical-align: 10px"><span class="blue dotted line baseline"> </span>+10px</span>
        </span>
    </span>
</div>

* **baseline**: The element's baseline sits exactly on top of the line box's baseline.
* **sub**: The element's baseline is shifted below the line box's baseline.
* **super**: The element's baseline is shifted above the line box's baseline.
* **&lt;percentage&gt;**: The element's baseline is shifted with respect to the line box's baseline by a percentage relative to the font-size.
* **&lt;length&gt;**: The element's baseline is shifted with respect to the line box's baseline by an absolute length.

### Aligning the Element's Outer Edges Relative To the Line Box's Baseline
<div class="example">
    <span class="large font">
        <span class="orange dotted line middle"> </span><!--
     --><span class="font color-grey baseline"><span class="blue dotted line baseline"> </span>x</span><!--
     --><span class="center">
            <span class="middle"><!--
             --><span class="red dotted line top"> </span><!--
             --><span class="red dotted line bottom"> </span><!--
             -->middle
            </span>
        </span>
    </span>
</div>

* **middle**: The midpoint between the element's top and bottom edge is aligned to the line box's baseline plus half of the x-height.

### Aligning the Element's Outer Edges Relative To the Line Box's Outer Edges
<div class="example">
    <span class="large font tall-line-height">
        <span class="red dotted line top"> </span><!--
     --><span class="red dotted line bottom"> </span><!--
     --><span class="font baseline color-grey"><!--
        --><span class="green dotted line text-top"> </span><!--
        --><span class="green dotted line text-bottom"> </span><!--
        -->x
        </span><!--
     --><span class="center">
            <span class="font top"><!--
             --><span class="red dotted line top"> </span><!--
             --><span class="red dotted line bottom"> </span><!--
             -->top
            </span>
            <span class="font bottom"><!--
             --><span class="red dotted line top"> </span><!--
             --><span class="red dotted line bottom"> </span><!--
             -->bottom
            </span>
        </span>
    </span>
</div>

* **top**: The element's top edge is aligned to the line box's top edge.
* **bottom**: The element's bottom edge is aligned to the line box's bottom edge.

### Aligning the Element's Outer Edges Relative To the Line Box's Text Box
<div class="example">
    <span class="large font tall-line-height">
        <span class="green dotted line text-top"> </span><!--
     --><span class="green dotted line text-bottom"> </span><!--
     --><span class="font tall-line-height baseline color-grey"><!--
        --><span class="red dotted line top"> </span><!--
        --><span class="red dotted line bottom"> </span><!--
        -->x
        </span><!--
     --><span class="center">
            <span class="font text-top"><!--
             --><span class="red dotted line top"> </span><!--
             --><span class="red dotted line bottom"> </span><!--
             -->text-top
            </span>
            <span class="font text-bottom"><!--
             --><span class="red dotted line top"> </span><!--
             --><span class="red dotted line bottom"> </span><!--
             -->text-bottom
            </span>
        </span>
    </span>
</div>

* **text-top**: The element's top edge is aligned to the line box's text box top edge.
* **text-bottom**: The element's bottom edge is aligned to the line box's text box bottom edge.

The [formal definition](http://www.w3.org/TR/CSS2/visudet.html#propdef-vertical-align) is found in, of course, the W3C Specs.



## Revisiting Common Pitfalls
- vertically center small icon in line of text
- vertical-align bottom tall element

## Conclusion
- All values of vertical-align except top and bottom are referencing the baselines of the involved elements.
- vertical-align on an element does not only affect the vertical position of itself.