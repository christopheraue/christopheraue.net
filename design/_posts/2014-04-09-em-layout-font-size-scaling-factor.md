---
title: 'em Font-Sizes As Global Scaling Factor'
summary: There are good reasons to subordinate dimensions in a layout to the font size using the CSS unit `em`. It provides a central control knob to scale a website or parts of it up and down while keeping everything in proportion. It's the web designer's browser zoom, so to speak.
redirect_from:
  - /2014/04/09/em-layout-font-size-scaling-factor
  - /2014/04/09/em-layout-font-size-scaling-factor/
---

For responsive webdesign it is a good choice to define all lengths as relative values. This way they adjust together with a changing layout. There are percentages for measures relative to the dimensions of an element's parent. For measures relative to text there is a CSS unit called [`em`](http://dev.w3.org/csswg/css-values/#font-relative-lengths). It's a length proportional to an element's current `font-size`.


Media Queries As Starting Point
-------------------------------
When implementing a responsive design with text in mind, [breakpoints](http://www.smashingmagazine.com/2013/03/01/logical-breakpoints-responsive-design/) of the layout should be where the line length becomes to long and switching lines is getting harder for the eye. Line length is measured by the number of characters per line. Good line lengths are roughly between [55 and 100 characters](http://www.pearsonified.com/2012/01/characters-per-line.php). If the lines become longer than that the layout should break to make them shorter again.

The definition of media queries is best done using `em`. Their usage is beneficial compared to absolute lengths like `px`, because [things don't break](http://blog.cloudfour.com/the-ems-have-it-proportional-media-queries-ftw/), if the user chooses to zoom in or has set an initial `font-size` other than the default `medium` (16px).


Using `em` Around Text
----------------------
There is another possibility to reduce the characters per line: increasing the size of the font. But things can get out of proportion if there are absolutely defined paddings and margins around a text with a changing font size. The logical step is to set paddings and margins in `em`, too. This way, they scale along with the text. We can take this approach even further and define more distances and sizes with `em`s. Probably we have to anyway, because the text area is likely to be aligned with other elements on the site. To keep the alignment we need to use `em` there, too.

This very website uses this technique. Change the width of your browser window and you can see the whole page is scaled proportionally for narrow viewports. The only thing changing is the `font-size` set on the `<body>` element.

This method turns out to be very powerful as the `font-size` acts as a central scaling factor. This whole idea is [not new](http://v1.jontangerine.com/log/2007/09/the-incredible-em-and-elastic-layouts-with-css). But I haven't noticed it in the wild very much.


Putting It Together
-------------------
The two types of breakpoints I mentioned above are:

- **layout-breakpoints**: The general layout of a site is changed by modifying position and size of header, footer and/or content.
- **`font-size`-breakpoints**: The general layout is untouched but the font is scaled.

Generally, I use layout-breakpoints if the main areas of the page can be shifted in a reasonable and non-confusing way. Otherwise, I use `font-size`-breakpoints as intermediary steps. `em`-based styling makes adjusting and playing around with these breakpoints very cheap and easy. Just change the font size and be sure everything stills look good and in proportion. As a result, I don't care about display resolutions anymore and set breakpoints where the text needs them.

But beware of the fact that the `font-size` of an element is the result of multiplying the `font-size`s of all its ancestors. If an element's style uses `em`s it will change when a parent element changes its `font-size`. If that's unintended the element must be fixed manually which can be frustrating. Therefore, here is a general rule of thumb:

<blockquote>
    <p>Only <code>&lt;html&gt;</code> or <code>&lt;body&gt;</code> and elements with no or very few descendants should define a <code>font-size</code>.</p>
</blockquote>

Following this rule (and breaking it where it makes sense) avoids most of that trouble.

 

