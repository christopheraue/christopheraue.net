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

If you used this approch in times of the fixed 960 px width, you would have done it for this width and be fine. Because of a very rigid layout you could rely on absolute lenghts. Of course, this has changed with responsive design.

If you need the dimensions in a website to adapt in relation to another value, relative lengths are the method of choice. For text, there is a CSS unit called [`em`](http://dev.w3.org/csswg/css-values/#font-relative-lengths). It's a length proportional to the current `font-size` of an element and thus well suited, if we want to design our website around the text. There is a [short introduction to `em`](http://www.impressivewebs.com/understanding-em-units-css/) on Impressive Webs. Its conclusion

    While it is possible to do an entire layout with just em units, I think for responsive layouts
    it’s probably best to use pixels or percentages — and, as mentioned, use ems for typography.

might not be quite along the lines of this article, but gives it some right to exist. Phew. ;)

Media Queries As Starting Point
-------------------------------
When implementing a responsive design with text in mind one usually starts with using `em` in media queries. [Breaking-points](http://www.smashingmagazine.com/2013/03/01/logical-breakpoints-responsive-design/) are, where the line length becomes to long and switching lines becomes harder for the eye. Line length is mostly measured by the number or characters per line (CPL). Good line lengths are roughly between [55 and 100 characters](http://www.pearsonified.com/2012/01/characters-per-line.php). There are two common possibilites to reduce the CPL:

- increase the size of the the font or
- break the layout, so the width of the text area scales down again.

<aside class="portrait use-sidebar">
<header>Element-based Media Queries?</header>
With this in mind, it would be nice to have media queries, that could check conditions on elements, like

```
@media (#my-text-area min-width: X em)
```

This way, you don't need to take into account the size of all the other stuff around the text. If the text area get wider than X em, the layout breaks. Probably, you even need fewer queries, since conditions might repeat at a different screen size or some other factor. Yea, well, but you can't have everything, I guess...
</aside>

Using `em` as units in media queries is beneficial compared to absolute lengths like `px`, because [things don't break](http://blog.cloudfour.com/the-ems-have-it-proportional-media-queries-ftw/), if the user chooses to zoom in or has set an initial `font-size` other than the default `medium` (16px).

Using `em` Around the Main Text
-----------------------------
- padding, margin
- http://www.pearsonified.com/typography/

Using `em` Leaks Into The Rest Of The Layout
------------------------------------------
- alignment of text area with its surrounding
- http://v1.jontangerine.com/log/2007/09/the-incredible-em-and-elastic-layouts-with-css
- use em for every length so everything scales with the font

Pros And Cons
-------------
- everything stays in proportion to each other
- font-size as global scaling factor
- very suitable for responsive design, you don't care about screen sizes any more
- you have to keep track what 1em is for an element
- http://css-tricks.com/why-ems/
