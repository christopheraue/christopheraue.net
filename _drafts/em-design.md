---
layout: article
title: '`font-size` As Global Scaling Factor: Setting All Dimensions In em'
category: articles
tags: css em layout
image: 
excerpt: 
meta_description: 
---

Text is the main reason why websites exist. To serve its content it is good pracitice to [design the site around its text](http://rafaltomal.com/start-the-visual-design-process-by-defining-the-typography-first/). This does not stop by defining the typographic style but, for instance, includes the line length as well. The line length on the other hand defines the width of the content area, which in turn most likely has an impact on the dimensions and positions of all other elements on the site.

If you used this approch in times of the fixed 960 px width, you would have done it for this width and be fine. Because of a very rigid layout you could rely on absolute lenghts. This has changed with responsive design.

If you need the dimensions in a website to adapt in relation to another value, relative lengths are the method of choice. For text, there is a CSS unit called [`em`](http://dev.w3.org/csswg/css-values/#font-relative-lengths). It's a length proportional to the current `font-size` of an element and thus well suited, if we want to design our website around the text. There is a [short introduction to `em`](http://www.impressivewebs.com/understanding-em-units-css/) on Impressive Webs. Its conclusion

    While it is possible to do an entire layout with just em units, I think for responsive layouts
    it’s probably best to use pixels \[...\] — and, as mentioned, use ems for typography.

might not be quite along the lines of this article, but if it was I couldn't tell you anything new. Phew. ;)

Media Queries As Starting Point
-------------------------------
When implementing a responsive design with text in mind one usually starts with using `em` in media queries. [Breaking-points](http://www.smashingmagazine.com/2013/03/01/logical-breakpoints-responsive-design/) are, where the line length becomes to long and switching lines is getting harder for the eye.

Line length is mostly measured by the number or characters per line (CPL). Good line lengths are roughly between [55 and 100 characters](http://www.pearsonified.com/2012/01/characters-per-line.php). So, if the lines become too long, we break the layout, so the width of the text area scales down again.

<aside class="portrait use-sidebar">
<header>Element-based Media Queries?</header>
With this in mind, it would be nice to have media queries, that could check conditions on elements, like

```
@media (#my-text-area min-width: X em)
```

This way, you don't need to take into account the size of all the other stuff around the text. If the text area get wider than `X em`, the layout breaks. Probably, you even need fewer queries, since conditions might repeat at a different screen size or some other factor. Yea, well, but you can't have everything, I guess...
</aside>

Using `em` as units in media queries is beneficial compared to absolute lengths like `px`, because [things don't break](http://blog.cloudfour.com/the-ems-have-it-proportional-media-queries-ftw/), if the user chooses to zoom in or has set an initial `font-size` other than the default `medium` (16px).

Using `em` Around the Main Text
-------------------------------
There is another possibilites to reduce the CPL: by increasing the size of the font. But things can get out of proportion if there are fixed paddings and margins around a text with changing font size. The logical step is to set paddings and margins in `em`, too. This way, they scale along with the text.

This method turns out to be very powerful. Now, there is a central scaling factor, the font size, which we can adjust to scale whole parts of our layout with proportions intact. We can take this approach even further and define more distances and sizes with `em`s. Probably we have to anyway, because the text area is likely to be aligned with other elements on the site. To keep the alignment, we need to use `em` there, too.

This whole idea is [not new](http://v1.jontangerine.com/log/2007/09/the-incredible-em-and-elastic-layouts-with-css). But I haven't noticed it in the wild very much. I'd like to see examples. So, if you know of some, let me know in the comments.

Putting It Together
-------------------
The two types of breakpoints I mentioned above are:

- layout-breakpoints: The general layout of a site is changed by modifying position and size of header, footer and content columns.
- font-size-breakpoints: The general layout is untouched but the font is scaled.

Generally, I use layout-breakpoints if the main areas of the page can be shifted in a reasonable and non-confusing way. Otherwise, I use font-size-breakpoints as intermediary steps. `em`-based design makes adjusting and playing around with these breakpoints very cheap and easy. I just change the font size and can be sure everything will still look good and in proportion. As a result, I noticed I care less and less about screen sizes and set breakpoints where the text needs them.

Of course, where is light there is (some) shadow. It can be no fun to calculate with `em` units. You will find yourself converting `px` into `em`, which is especially annoying, if there is some element having set `font-size` to `.7 em` or the like. You end up with thoughts like *Ok, for the root element `1 em` equals `16 px`, so for this element `1 em` equals `.7\*16 px. I want a padding of `5 px`, so to set it in `em` that is ... uhm ... `.4464 em`. Great, what a nice number...* But that's what it is, just a number. It will do all the work for you once it is there.
