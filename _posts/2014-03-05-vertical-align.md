---
layout: article
title: 'Vertical-Align: All You Need To Know'
category: articles
excerpt: A journey down the rabbit hole into the mysteries of vertical-align. Instructions on how to master it included!
meta_description: The CSS property vertical-align has some seemingly mysterious rules at work. This article forces them to show their true color.
---

Often I need to vertically align elements side by side.

CSS offers some possibilities. Sometimes I solve it with `float`, sometimes with `position: absolute`, sometimes even dirty by manually adding margins or paddings.

I don't really like these solutions. Floats only align at their tops and need to be cleared manually. Absolute positioning takes the elements out of the flow so they do no longer affect their surroundings. And working with fixed margins and paddings immediately breaks things on the tiniest change.

But there is another player here: **`vertical-align`**. I think it deserves more credit. Ok, technically, using `vertical-align` for layout is a hack, since it wasn't invented for this reason. It's there to align text and elements next to text. Nonetheless, you can also use `vertical-align` in different contexts to align elements very flexible and fine-grained. The sizes of elements need not to be known. Elements stay in the flow so other elements can react to changed dimensions of those. This makes it a valuable option.

Peculiarities Of Vertical-Align
-------------------------------
But, `vertical-align` can be a real scumbag sometimes. Working with it can be a little frustrating. There seem to be some mysterious rules at work. For example, it might happen, that the element you changed `vertical-align` for doesn't change its alignment at all, but other elements in the line do! I'm still getting dragged into the dark corners of `vertical-align` from time to time, tearing my hair.

Unfortunately, most resources on the matter are somewhat shallow. Especially, if we want to use `vertical-align` for layout. They concentrate on the misconception of trying to vertical align everything inside an element. They give basic introductions into the property and explain how elements are aligned in very simple situations. They do not explain the tricky parts.

So, I set myself the target to **clarify the behavior of vertical-align once and for all**. I ended up working through the W3C's [CSS](http://www.w3.org/TR/CSS2/visudet.html#line-height) [specifications](http://www.w3.org/TR/CSS2/visuren.html#inline-formatting) and playing with some examples. The result is this article.

So, let's tackle the rules of the game.

Requirements To Use Vertical-Align
----------------------------------
`vertical-align` is used to align [inline-level elements](http://www.w3.org/TR/CSS2/visuren.html#inline-level). These are elements, whose `display` property evaluates to

* inline,
* inline-block or
* inline-table (not considered in this article).

**Inline elements** are basically tags wrapping text.

**Inline-block elements** are what their name suggests: block elements living inline. They can have a width and height (possibly defined by its own content) as well as padding, a border and margin.

Inline-level elements are laid out next to each other in lines. Once there are more elements than fit into the current line, a new line is created beneath it. All these lines have a so-called **line box**, which encloses all the content of its line. Differently sized content means line boxes of different height. In the following illustration the top and bottom of line boxes are indicated by red lines.

<figure>
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
</figure>

The line boxes trace out the field we are playing on. Inside these line boxes the property `vertical-align` is responsible for aligning the individual elements. **So, in respect to what are elements aligned?**

About Baselines and Outer Edges
-------------------------------
The most important reference point to align vertically is the baseline of the involved elements. In some cases the top and bottom edge of the element's enclosing box becomes important, too. Let's have a look where the baseline and outer edges live for each involved type of element:

### Inline Element
<figure class="columns no-break thirds">
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
</figure>

Here you see three lines of text next to each other. The top and bottom edge of the line height is indicated by red lines, the height of the font by green lines and the baseline by a blue line. On the left, the text has a line height set to the *same height* as the font-size. The green and red line collapsed to one line on each side. In the middle, the line height is *twice as large* as the font-size. On the right, the line height is *half as large* as the font-size.

**The inline element's outer edges** align themselves with the top and bottom edge of its line height. It *does not* matter, if the line height is smaller than the height of the font. So, the outer edges are the red lines in the figure above.

**The inline element's baseline** is the line, the characters are *sitting* on. This is the blue line in the figure. Roughly speaking, the baseline is *somewhere below the middle of the font's height*. Have look at the W3C Specs for a [detailed definition](http://www.w3.org/TR/CSS2/visudet.html#leading).

### Inline-Block Element
<figure class="columns no-break thirds">
    <div class="top"><!--
     --><span class="red dotted line top"> </span><!--
     --><span class="red dotted line bottom"> </span><!--
     --><span class="blue dotted line baseline"> </span><!--
     --><span class="inline-block show-box-model"><!--
         --><span class="show-box-model-content">c</span>
        </span>
    </div><!--

 --><div class="top"><!--
     --><span class="red dotted line top"> </span><!--
     --><span class="blue dotted line baseline"> </span><!--
     --><span class="inline-block show-box-model" style="overflow: hidden"><!--
         --><span class="show-box-model-content">c</span>
        </span>
    </div><!--

 --><div class="top"><!--
     --><span class="red dotted line top"> </span><!--
     --><span class="blue dotted line baseline"> </span><!--
     --><span class="inline-block show-box-model"><!--
         --><span class="show-box-model-content"> </span>
        </span>
    </div>
</figure>

<style type="text/css">
    figure .inline-block {
        display: inline-block;
        margin: .5em;
        padding: .5em;
        width: 1.5em;
        height: 1.5em;
        border-width: .5em;
        border-style: solid;
        text-align: center;
    }
</style>

From left to right you see: an inline-block element with [in-flow](http://www.w3.org/TR/CSS21/visuren.html#positioning-scheme) content (a "c"), an inline-block element with in-flow content and `overflow: hidden` and an inline-block element with *no* in-flow content (but the content area has a height). The boundaries of the margin is indicated by red lines, the border is yellow, the padding green and the content area blue. The baseline of each inline-block element is shown as a blue line.

**The Inline-block element's outer edges** are the top and bottom edge of its [margin-box](http://www.w3.org/TR/CSS2/box.html#x17). These are the red lines in the figure.

**The Inline-block element's baseline** depends on whether the element has in-flow content:

* In case of in-flow content the baseline of the inline-block element is the baseline of the last content element in normal flow (example on the left). For this last element its baseline is found according to its own rules.
* In case of in-flow content but an `overflow` property evaluating to something other than `visible`, the baseline is the bottom edge of the margin-box (example in the middle). So, it is the same as the inline-block element's bottom edge.
* In case of *no* in-flow content the baseline is, again, the bottom edge of the margin-box (example on the right).

### Line Box
<figure>
    <span class="large font">
        <span class="green dotted line text-top"> </span><!--
     --><span class="green dotted line text-bottom"> </span><!--
     --><span class="red dotted line top"> </span><!--
     --><span class="red dotted line bottom"> </span><!--
     --><span class="blue dotted line baseline"> </span><!--
     --><span class="font color-grey inline-overlay">x</span><!--
     --><span class="center">
            <span class="middle bg-grey">This</span>
            <span class="tall box bg-grey text-top"> </span>
            <span class="top bg-grey">can</span>
            <span class="tall box bg-grey text-bottom"> </span>
            <span class="bottom bg-grey">happen.</span>
        </span>
    </span>
</figure>

You've already seen this setting above. This time I drew in the top and bottom of the line box's text box (green, more on this below) and the baseline (blue), too. I also highlighted the area of the text elements by giving them a grey background.

The line box has a **top edge** aligned to the top edge of the top-most element of this line and a **bottom edge** aligned to the bottom edge of the bottom-most element of the line. This is the box indicated by the red lines in the figure above.

**The line box's baseline** is variable:

<blockquote class="short">
    <p>CSS 2.1 does not define the position of the line box's baseline.</p>
    <footer>— the <a href="http://www.w3.org/TR/CSS2/visudet.html#line-height">W3C Specs</a></footer>
</blockquote>

This is probably the most confusing part, when working with vertical-align. It means, the baseline is placed where ever it needs to be to fulfil all other conditions like vertical-align and minimizing the line box's height. It is a free parameter in the equation.

Since the line box's baseline is invisible, it may not immediately be obvious where it is. But, you can make it visible very easily. Just add a character at the beginning of the line in questions, like I added an "x" in the figure. If this character is not aligned in any way, it will sit on the baseline by default.

Around its baseline the line box has what we might call its **text box**. The text box can simply be thought of as an inline element inside the line box without any alignment. Its height is equal to the font-size of its parent element. Therefore, the text box only just encloses the unformatted text of the line box. The box is indicated by the green lines in the figures above. Since this text box is tied to the baseline, it moves when the baseline moves. (Side note: this text box is called [strut](http://www.w3.org/TR/CSS2/visudet.html#strut) in the W3C Specs)

Phew, this was the hard part. **Now, we know everything to put things into perspective**. Let's quickly sum up the most important facts:

* There is an area called *line box*. This is the area in which vertical alignment takes place. It has a *baseline*, a *text box* and a *top* and *bottom edge*.
* There are *inline-level elements*. These are the objects that are aligned. They have a *baseline* and a *top* and *bottom edge*.

## The Values Of Vertical-Align
By using `vertical-align` the reference points mentioned in the last sentence in the list above are set into a certain relationship.

### Aligning the Element's Baseline Relative To the Line Box's Baseline
<figure>
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
</figure>

* **baseline**: The element's baseline sits exactly on top of the line box's baseline.
* **sub**: The element's baseline is shifted below the line box's baseline.
* **super**: The element's baseline is shifted above the line box's baseline.
* **&lt;percentage&gt;**: The element's baseline is shifted with respect to the line box's baseline by a percentage relative to the line-height.
* **&lt;length&gt;**: The element's baseline is shifted with respect to the line box's baseline by an absolute length.

### Aligning the Element's Outer Edges Relative To the Line Box's Baseline
<figure>
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
</figure>

* **middle**: The midpoint between the element's top and bottom edge is aligned to the line box's baseline plus half of the x-height.

### Aligning the Element's Outer Edges Relative To the Line Box's Text Box
<figure>
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
</figure>

One could also list these two cases under aligning relative to the line box's baseline, since the position of the text box is determined by the baseline.

* **text-top**: The element's top edge is aligned to the line box's text box top edge.
* **text-bottom**: The element's bottom edge is aligned to the line box's text box bottom edge.

### Aligning the Element's Outer Edges Relative To the Line Box's Outer Edges
<figure>
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
</figure>

* **top**: The element's top edge is aligned to the line box's top edge.
* **bottom**: The element's bottom edge is aligned to the line box's bottom edge.

The [formal definition](http://www.w3.org/TR/CSS2/visudet.html#propdef-vertical-align) is found in, of course, the W3C Specs.

Why Vertical-Align Behaves The Way It Behaves
---------------------------------------------
We can now take a closer look at vertical alignment in certain situations. Especially, we will deal with situations where things might have gone wrong.

### Centering an Icon
One question bugging me was the following: I have an icon I want to center next to a line of text. Just giving the icon a `vertical-align: middle` didn't seem to center it in a satisfying way. Have a look at this example:

<figure class="columns no-break">
    <div class="top center">
        <span class="small box bg-grey middle"> </span> Centered?
    </div><!--
 --><div class="top center">
        <span class="small box bg-grey middle"> </span> <span class="middle">Centered!</span>
    </div>
</figure>

{% highlight html %}
<!-- left mark-up -->
<span class="icon middle"></span>
Centered?

<!-- right mark-up -->
<span class="icon middle"></span>
<span class="middle">Centered!</span>

<style type="text/css">
  .icon   { display: inline-block;
            /* size, color, etc. */ }

  .middle { vertical-align: middle; }
</style>
{% endhighlight %}

Here is the example again, but I drew in some auxiliary lines you already know from above:

<figure class="columns no-break">
    <div class="top">
        <span class="orange dotted line middle"> </span><!--
     --><span class="font color-grey inline-overlay baseline"><!--
         --><span class="blue dotted line baseline"> </span><!--
         -->x
        </span><!--
     --><span class="center">
            <span class="small box bg-grey middle"> </span>
            <span class="baseline"><!--
             --><span class="red dotted line top"> </span><!--
             --><span class="red dotted line bottom"> </span><!--
             -->Centered?
            </span>
        </span>
    </div><!--
 --><div class="top">
        <span class="orange dotted line middle"> </span><!--
     --><span class="font color-grey inline-overlay baseline"><!--
         --><span class="blue dotted line baseline"> </span><!--
         -->x
        </span><!--
     --><span class="center">
            <span class="small box bg-grey middle"> </span>
            <span class="middle"><!--
             --><span class="red dotted line top"> </span><!--
             --><span class="red dotted line bottom"> </span><!--
             -->Centered!
            </span>
        </span>
    </div>
</figure>

This sheds some light on our matter. Because the text on the left isn't aligned at all, it sits on the baseline. The thing is, by aligning the box with `vertical-align: middle` we are aligning it to the middle of the lower case letters without ascenders (half of the x-height). So, characters with ascenders stand out at the top.

On the right, we take the whole area of the font and align its midpoint vertically, too. The text's baseline shifts slightly below the line box's baseline to achieve this. The Result is a nicely centered text next to an icon.

### Movement Of the Line Box's Baseline
This is a common pitfall when working with `vertical-align`: The position of the line box's baseline is affected by all elements in that line. Let's assume, an element is aligned in such a way, that the baseline of the line box has to move. Since most vertical alignment (except top and bottom) is done relative to this baseline, this results in an adjusted position of all other elements in that line, too.

Some Examples:

* If there is a tall element in the line spanning across the complete height, `vertical-align` has no effect on it. There is no space above its top and below its bottom, that would let it move. To fulfil its alignment relative to the line box's baseline, the line box's baseline has to move. The short box has a `vertical-align: baseline`. On the left, the tall box is aligned `text-bottom`. On the right, it is aligned `text-top`. You can see the baseline jumping up taking the short box with it.

    <figure class="columns no-break"><!--
     --><div class="top"><!--
         --><span class="green dotted line text-top"> </span><!--
         --><span class="green dotted line text-bottom"> </span><!--
         --><span class="red dotted line top"> </span><!--
         --><span class="red dotted line bottom"> </span><!--
         --><span class="blue dotted line baseline"> </span><!--
         --><span class="baseline center">
                <span class="taller box bg-grey text-bottom"> </span>
                <span class="short box bg-grey baseline"> </span>
            </span><!--
     --></div><!--
     --><div class="top"><!--
         --><span class="green dotted line text-top"> </span><!--
         --><span class="green dotted line text-bottom"> </span><!--
         --><span class="red dotted line top"> </span><!--
         --><span class="red dotted line bottom"> </span><!--
         --><span class="blue dotted line baseline"> </span><!--
         --><span class="baseline center">
                <span class="taller box bg-grey text-top"> </span>
                <span class="short box bg-grey baseline"> </span>
            </span><!--
     --></div>
    </figure>

    <div class="highlight"><pre><code class="language-html" data-lang="html"><span class="c">&lt;!-- left mark-up --&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"tall-box text-bottom"</span><span class="nt">&gt;&lt;/span&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"short-box"</span><span class="nt">&gt;&lt;/span&gt;</span>

  <span class="c">&lt;!-- right mark-up --&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"tall-box text-top"</span><span class="nt">&gt;&lt;/span&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"short-box"</span><span class="nt">&gt;&lt;/span&gt;</span>

  <span class="nt">&lt;style </span><span class="na">type=</span><span class="s">"text/css"</span><span class="nt">&gt;</span>
    <span class="nc">.tall-box</span><span class="o">,</span>
    <span class="nc">.short-box</span>   <span class="p">{</span> <span class="k">display</span><span class="o">:</span> <span class="k">inline</span><span class="o">-</span><span class="k">block</span><span class="p">;</span>
                  <span class="c">/* size, color, etc. */</span> <span class="p">}</span>

    <span class="nc">.text-bottom</span> <span class="p">{</span> <span class="k">vertical-align</span><span class="o">:</span> <span class="k">text-bottom</span><span class="p">;</span> <span class="p">}</span>
    <span class="nc">.text-top</span>    <span class="p">{</span> <span class="k">vertical-align</span><span class="o">:</span> <span class="k">text-top</span><span class="p">;</span> <span class="p">}</span>
  <span class="nt">&lt;/style&gt;</span></code></pre></div>

{% comment %}
The above code was generated by:

{% highlight html %}
<!-- left mark-up -->
<span class="tall-box text-bottom"></span>
<span class="short-box"></span>

<!-- right mark-up -->
<span class="tall-box text-top"></span>
<span class="short-box"></span>

<style type="text/css">
  .tall-box,
  .short-box   { display: inline-block;
                /* size, color, etc. */ }

  .text-bottom { vertical-align: text-bottom; }
  .text-top    { vertical-align: text-top; }
</style>
{% endhighlight %}
{% endcomment %}

    The same behaviour shows up when aligning a tall element with other values for `vertical-align`.

* Even setting `vertical-align` to `bottom` (left) and `top` (right) moves the baseline. This is strange, since the baseline shouldn't be involved at all.

    <figure class="columns no-break">
        <div class="top"><!--
         --><span class="green dotted line text-top"> </span><!--
         --><span class="green dotted line text-bottom"> </span><!--
         --><span class="red dotted line top"> </span><!--
         --><span class="red dotted line bottom"> </span><!--
         --><span class="blue dotted line baseline"> </span><!--
         --><span class="baseline center">
                <span class="taller box bg-grey bottom"> </span>
                <span class="short box bg-grey baseline"> </span>
            </span>
        </div><!--
     --><div class="top"><!--
         --><span class="green dotted line text-top"> </span><!--
         --><span class="green dotted line text-bottom"> </span><!--
         --><span class="red dotted line top"> </span><!--
         --><span class="red dotted line bottom"> </span><!--
         --><span class="blue dotted line baseline"> </span><!--
         --><span class="baseline center">
                <span class="taller box bg-grey top"> </span>
                <span class="short box bg-grey baseline"> </span>
            </span>
        </div>
    </figure>

    <div class="highlight"><pre><code class="language-html" data-lang="html"><span class="c">&lt;!-- left mark-up --&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"tall-box bottom"</span><span class="nt">&gt;&lt;/span&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"short-box"</span><span class="nt">&gt;&lt;/span&gt;</span>

  <span class="c">&lt;!-- right mark-up --&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"tall-box top"</span><span class="nt">&gt;&lt;/span&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"short-box"</span><span class="nt">&gt;&lt;/span&gt;</span>

  <span class="nt">&lt;style </span><span class="na">type=</span><span class="s">"text/css"</span><span class="nt">&gt;</span>
    <span class="nc">.tall-box</span><span class="o">,</span>
    <span class="nc">.short-box</span> <span class="p">{</span> <span class="k">display</span><span class="o">:</span> <span class="k">inline</span><span class="o">-</span><span class="k">block</span><span class="p">;</span>
                 <span class="c">/* size, color, etc. */</span> <span class="p">}</span>

    <span class="nc">.bottom</span>    <span class="p">{</span> <span class="k">vertical-align</span><span class="o">:</span> <span class="k">bottom</span><span class="p">;</span> <span class="p">}</span>
    <span class="nc">.top</span>       <span class="p">{</span> <span class="k">vertical-align</span><span class="o">:</span> <span class="k">top</span><span class="p">;</span> <span class="p">}</span>
  <span class="nt">&lt;/style&gt;</span></code></pre></div>

{% comment %}
The above code was generated by:

{% highlight html %}
<!-- left mark-up -->
<span class="tall-box bottom"></span>
<span class="short-box"></span>

<!-- right mark-up -->
<span class="tall-box top"></span>
<span class="short-box"></span>

<style type="text/css">
  .tall-box,
  .short-box { display: inline-block;
               /* size, color, etc. */ }

  .bottom    { vertical-align: bottom; }
  .top       { vertical-align: top; }
</style>
{% endhighlight %}
{% endcomment %}

* Placing two larger elements in a line and vertically aligning them moves the baseline where it fulfils both alignments. Then the height of the line box is adjusted (left). Adding a third element, that does not go beyond the line box's edges because of its alignment, affects neither the line box's height nor the baseline's position (middle). If it *does* go beyond the line box's edges, the line box's height and baseline are adjusted, again. In this case, our first two boxes are pushed down (right).

    <figure class="columns no-break thirds">
        <div class="top"><!--
         --><span class="green dotted line text-top"> </span><!--
         --><span class="green dotted line text-bottom"> </span><!--
         --><span class="red dotted line top"> </span><!--
         --><span class="red dotted line bottom"> </span><!--
         --><span class="blue dotted line baseline"> </span><!--
         --><span class="baseline center">
                <span class="taller box bg-grey text-bottom"> </span>
                <span class="taller box bg-grey text-top"> </span>
            </span>
        </div><!--
     --><div class="top"><!--
         --><span class="green dotted line text-top"> </span><!--
         --><span class="green dotted line text-bottom"> </span><!--
         --><span class="red dotted line top"> </span><!--
         --><span class="red dotted line bottom"> </span><!--
         --><span class="blue dotted line baseline"> </span><!--
         --><span class="baseline center">
                <span class="taller box bg-grey text-bottom"> </span>
                <span class="taller box bg-grey text-top"> </span>
                <span class="taller box bg-grey middle"> </span>
            </span>
        </div><!--
     --><div class="top"><!--
         --><span class="green dotted line text-top"> </span><!--
         --><span class="green dotted line text-bottom"> </span><!--
         --><span class="red dotted line top"> </span><!--
         --><span class="red dotted line bottom"> </span><!--
         --><span class="blue dotted line baseline"> </span><!--
         --><span class="baseline center">
                <span class="taller box bg-grey text-bottom"> </span>
                <span class="taller box bg-grey text-top"> </span>
                <span class="taller box bg-grey baseline" style="vertical-align: 100%"> </span>
            </span>
        </div>
    </figure>

    <div class="highlight"><pre><code class="language-html" data-lang="html"><span class="c">&lt;!-- left mark-up --&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"tall-box text-bottom"</span><span class="nt">&gt;&lt;/span&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"tall-box text-top"</span><span class="nt">&gt;&lt;/span&gt;</span>

  <span class="c">&lt;!-- mark-up in the middle --&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"tall-box text-bottom"</span><span class="nt">&gt;&lt;/span&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"tall-box text-top"</span><span class="nt">&gt;&lt;/span&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"tall-box middle"</span><span class="nt">&gt;&lt;/span&gt;</span>

  <span class="c">&lt;!-- right mark-up --&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"tall-box text-bottom"</span><span class="nt">&gt;&lt;/span&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"tall-box text-top"</span><span class="nt">&gt;&lt;/span&gt;</span>
  <span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"tall-box text-100up"</span><span class="nt">&gt;&lt;/span&gt;</span>

  <span class="nt">&lt;style </span><span class="na">type=</span><span class="s">"text/css"</span><span class="nt">&gt;</span>
    <span class="nc">.tall-box</span>    <span class="p">{</span> <span class="k">display</span><span class="o">:</span> <span class="k">inline</span><span class="o">-</span><span class="k">block</span><span class="p">;</span>
                   <span class="c">/* size, color, etc. */</span> <span class="p">}</span>

    <span class="nc">.middle</span>      <span class="p">{</span> <span class="k">vertical-align</span><span class="o">:</span> <span class="k">middle</span><span class="p">;</span> <span class="p">}</span>
    <span class="nc">.text-top</span>    <span class="p">{</span> <span class="k">vertical-align</span><span class="o">:</span> <span class="k">text-top</span><span class="p">;</span> <span class="p">}</span>
    <span class="nc">.text-bottom</span> <span class="p">{</span> <span class="k">vertical-align</span><span class="o">:</span> <span class="k">text-bottom</span><span class="p">;</span> <span class="p">}</span>
    <span class="nc">.text-100up</span>  <span class="p">{</span> <span class="k">vertical-align</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span> <span class="p">}</span>
  <span class="nt">&lt;/style&gt;</span></code></pre></div>

{% comment %}
The above code was generated by:

{% highlight html %}
<!-- left mark-up -->
<span class="tall-box text-bottom"></span>
<span class="tall-box text-top"></span>

<!-- mark-up in the middle -->
<span class="tall-box text-bottom"></span>
<span class="tall-box text-top"></span>
<span class="tall-box middle"></span>

<!-- right mark-up -->
<span class="tall-box text-bottom"></span>
<span class="tall-box text-top"></span>
<span class="tall-box text-100up"></span>

<style type="text/css">
  .tall-box    { display: inline-block;
                 /* size, color, etc. */ }

  .middle      { vertical-align: middle; }
  .text-top    { vertical-align: text-top; }
  .text-bottom { vertical-align: text-bottom; }
  .text-100up  { vertical-align: 100%; }
</style>
{% endhighlight %}
{% endcomment %}

### There Might Be a Little Gap Below Inline-Level Elements
Have a look at this setting. It's common if you try to vertical-align `li` elements of a list.

<figure class="columns no-break">
    <div class="top">
        <ul class="baseline center bg-yellow" style="padding: 0">
            <li class="taller quad max-third-width box bg-grey baseline"> </li>
            <li class="taller quad max-third-width box bg-grey baseline"> </li>
            <li class="taller quad max-third-width box bg-grey baseline"> </li>
        </ul>
    </div><!--
 --><div class="top"><!--
     --><span class="green dotted line text-top"> </span><!--
     --><span class="green dotted line text-bottom"> </span><!--
     --><span class="red dotted line top"> </span><!--
     --><span class="red dotted line bottom"> </span><!--
     --><span class="blue dotted line baseline"> </span><!--
     --><ul class="baseline center bg-yellow" style="padding: 0">
            <li class="taller max-third-width quad box bg-grey baseline"> </li>
            <li class="taller max-third-width quad box bg-grey baseline"> </li>
            <li class="taller max-third-width quad box bg-grey baseline"> </li>
        </ul>
    </div>
</figure>

{% highlight html %}
<ul>
  <li class="box"></li>
  <li class="box"></li>
  <li class="box"></li>
</ul>

<style type="text/css">
  .box { display: inline-block;
         /* size, color, etc. */ }
</style>
{% endhighlight %}

As you can see, the list items sit on the baseline. Below the baseline is some space to shelter the descenders of a text. This is causing the gap. The Solution? Just move the baseline out of the way, for example by aligning the list items with `vertical-align: middle`:

<figure class="columns no-break">
    <div class="top">
        <ul class="baseline center bg-yellow" style="padding: 0">
            <li class="taller quad max-third-width box bg-grey middle"> </li>
            <li class="taller quad max-third-width box bg-grey middle"> </li>
            <li class="taller quad max-third-width box bg-grey middle"> </li>
        </ul>
    </div><!--
 --><div class="top"><!--
     --><span class="green dotted line text-top"> </span><!--
     --><span class="green dotted line text-bottom"> </span><!--
     --><span class="red dotted line top"> </span><!--
     --><span class="red dotted line bottom"> </span><!--
     --><span class="blue dotted line baseline"> </span><!--
     --><ul class="baseline center bg-yellow" style="padding: 0">
            <li class="taller quad max-third-width box bg-grey middle"> </li>
            <li class="taller quad max-third-width box bg-grey middle"> </li>
            <li class="taller quad max-third-width box bg-grey middle"> </li>
        </ul>
    </div>
</figure>

{% highlight html %}
<ul>
  <li class="box middle"></li>
  <li class="box middle"></li>
  <li class="box middle"></li>
</ul>

<style type="text/css">
  .box    { display: inline-block;
            /* size, color, etc. */ }

  .middle { vertical-align: middle; }
</style>
{% endhighlight %}

This scenario does not occur for inline-blocks having text content, since [content already moves the baseline up](#inline-block-element).

### A Gap Between Inline-Level Elements Is Breaking the Layout
*This is mainly a problem of inline-level elements themselves. But since they are a requirement of vertical-align, it is good to know about this.*

You can see this gap in the former example between the list items. The gap comes from the white-space between inline-elements present in your mark-up. All white-space between inline-elements is collapsed into one space. This space gets in the way, if we want to place two inline elements next to each other and giving them `width: 50%`, for example. There is not enough space for two 50%-elements and a space. So the line breaks into two lines destroying the layout (left). To remove the gap, we need to remove the white-space, for example with html comments (right).

<figure class="columns no-break">
    <div class="top border-grey" style="box-sizing: border-box">
        <div class="tall box center bg-blue" style="width: 50%">
            50% wide
        </div>
        <div class="tall box center bg-green" style="width: 50%">
            50% wide... and in next line
        </div>
    </div><!--
 --><div class="top border-grey" style="box-sizing: border-box">
        <div class="tall box center bg-blue" style="width: 50%">
            50% wide
        </div><!--
     --><div class="tall box center bg-green" style="width: 50%">
            50% wide
        </div>
    </div>
</figure>

{% highlight html %}
<!-- left mark-up -->
<div class="half">50% wide</div>
<div class="half">50% wide... and in next line</div>

<!-- right mark-up -->
   <div class="half">50% wide</div><!--
--><div class="half">50% wide</div>

<style type="text/css">
  .half { display: inline-block;
          width: 50%; }
</style>
{% endhighlight %}

## Vertical-Align Demystified
Yea, that's it. It is not very complicated once you know the rules. If `vertical-align` does not behave, just ask these questions:

* Where is the baseline and top and bottom edge of the line box?
* Where is the baseline and top and bottom edge of the inline-level elements?

This will corner the solution to the problem.
