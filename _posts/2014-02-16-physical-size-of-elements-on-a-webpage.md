---
layout: article
title: Physical Size Of Elements On a Webpage
category: articles
tags: device_pixels css_pixels device_resolution physical_size
image: blur_fish.jpg
excerpt: tbd
---

When I was doing some responsive webdesign lately I came across the following situation:
    
In general, I want the elements on my page to have the same physical size (say in inches or centimeters) for a *specific category* of device. It is obvious that large screens I'm sitting an arm length or further away from should display my elements bigger than my smartphone does. The manufacturers have taken care of that by implementing a reasonable CSS vs. device pixel ratio (CSS pixel ratio, for short) for the devices. You can just use your known CSS pixels to design your page and everything else will be taken care of.

Same Sized Devices With Differently Sized Elements
--------------------------------------------------
Well, at least most of the time. There is a slight problem with devices that lay in the *same* category: Some have the same resolution and the same CSS pixel ratio, but vary in size. Or, they have a similar size, but their resolutions and CSS pixel ratio do not behave proportionally.

- The iPad 1/2 and iPad Mini 1 have the same resolution of 1024x768 and the same CSS pixel ratio of 1, but the iPad's diagonal is about 2 inches larger than the iPad Mini's.
- The LG Optimus 3D and LG Spectrum have roughly identical sizes, but especially their difference in resolution leads to a difference of more than 200 CSS pixels along the long side of the devices.

At this point it becomes clear, that for now there is [no way](http://www.quirksmode.org/blog/archives/2012/11/the_css_physica.html) to design pages with exact physical dimensions in mind. Well, you could try to [differentiate between small and large devices](http://mobile.smashingmagazine.com/2013/03/21/responsive-web-design-with-physical-units/) with a resolution media query. But this doesn't get you around the fact that your element will be of different size on different devices.

A Comparison Table
------------------
To get a feeling about these different sizes I generated the following tables for the categories *smartphones*, *tablets*, *standard displays* and *Macbooks*. They take some devices and their data from wikipedia's [List of Displays by Pixel Density](http://en.wikipedia.org/wiki/List_of_displays_by_pixel_density) and calculate the *CSS Resolution in CSS pixels per inch (cssppi)*. For each category the average CSS Resolution is calculated and the CSS Resolution of each device is then set into relation to it in the *Element Size Difference* column. A value of 10% in this last column says the device displays its content about 10% larger than the average device of this category. Concrete: If the average device displays an element with a width of 100 px in CSS land as 1 inch wide on its screen a device with a size difference of 10% will display this 100 px element as 1.1 inches wide.

<div class="use-sidebar">
<table>
    <caption>Element Size Difference of Smartphones (average CSS resolution of 157.19)</caption>
    <thead>
        <tr>
            <th>Brand</th>
            <th>Device</th>
            <th>Resolution [ppi]</th>
            <th>CSS Pixel Ratio</th>
            <th>CSS Resolution [cssppi]</th>
            <th>Element Size Difference</th>
        </tr>
    </thead>
    <tbody>
        <tr><th rowspan="5">Apple</th>
            <td>iPhone 4 / iPod Touch</td><td>326</td><td>2</td><td>163</td><td>-4%</td></tr>
        <tr><td>iPhone 4S / iPod Touch</td><td>326</td><td>2</td><td>163</td><td>-4%</td></tr>
        <tr><td>iPhone 5 / iPod Touch</td><td>326</td><td>2</td><td>163</td><td>-4%</td></tr>
        <tr><td>iPhone 5C</td><td>326</td><td>2</td><td>163</td><td>-4%</td></tr>
        <tr><td>iPhone 5S</td><td>326</td><td>2</td><td>163</td><td>-4%</td></tr>

        <tr><th rowspan="2">Asus</th>
            <td>Nexus 7 (2012 version)</td><td>216</td><td>1.325</td><td>163.02</td><td>-4%</td></tr>
        <tr><td>Nexus 7 (2013 version)</td><td>323</td><td>2</td><td>161.5</td><td>-3%</td></tr>

        <tr><th rowspan="9">HTC</th>
            <td>Butterfly</td><td>440</td><td>3</td><td>146.67</td><td>7%</td></tr>
        <tr><td>Evo, HD2, Thunderbolt</td><td>217</td><td>1.5</td><td>144.67</td><td>8%</td></tr>
        <tr><td>Desire HD</td><td>217</td><td>1.5</td><td>144.67</td><td>8%</td></tr>
        <tr><td>Desire, Nexus One</td><td>252</td><td>1.5</td><td>168</td><td>-7%</td></tr>
        <tr><td>Sensation. Evo 3D</td><td>256</td><td>1.5</td><td>170.67</td><td>-9%</td></tr>
        <tr><td>Sensation XE</td><td>256</td><td>1.5</td><td>170.67</td><td>-9%</td></tr>
        <tr><td>One X, EVO LTE</td><td>312</td><td>2</td><td>156</td><td>1%</td></tr>
        <tr><td>One</td><td>468</td><td>3</td><td>156</td><td>1%</td></tr>
        <tr><td>One SV</td><td>216</td><td>1.5</td><td>144</td><td>8%</td></tr>

        <tr><th rowspan="11">LG</th>
            <td>Optimus One</td><td>180</td><td>1.5</td><td>120</td><td>24%</td></tr>
        <tr><td>Optimus 2X</td><td>233</td><td>1.5</td><td>155.33</td><td>1%</td></tr>
        <tr><td>Optimus LTE</td><td>329</td><td>1.7</td><td>193.53</td><td>-23%</td></tr>
        <tr><td>Optimus 3D</td><td>217</td><td>1.5</td><td>144.67</td><td>8%</td></tr>
        <tr><td>Spectrum (VS920)</td><td>326</td><td>1.7</td><td>191.76</td><td>-22%</td></tr>
        <tr><td>Optimus 4X HD</td><td>312</td><td>1.7</td><td>183.53</td><td>-17%</td></tr>
        <tr><td>Optimus G</td><td>320</td><td>2</td><td>160</td><td>-2%</td></tr>
        <tr><td>Nexus 4</td><td>320</td><td>2</td><td>160</td><td>-2%</td></tr>
        <tr><td>Nexus 5</td><td>445</td><td>3</td><td>148.33</td><td>6%</td></tr>
        <tr><td>Optimus Black</td><td>233</td><td>1.5</td><td>155.33</td><td>1%</td></tr>
        <tr><td>Optimus G Pro</td><td>400</td><td>3</td><td>133.33</td><td>15%</td></tr>

        <tr><th rowspan="10">Samsung</th>
            <td>Epic (D700)</td><td>233</td><td>1.5</td><td>155.33</td><td>1%</td></tr>
        <tr><td>Nexus S SAMOLED</td><td>235</td><td>1.5</td><td>156.67</td><td>0%</td></tr>
        <tr><td>Nexus S LCD</td><td>235</td><td>1.5</td><td>156.67</td><td>0%</td></tr>
        <tr><td>Galaxy S Plus (I9001)</td><td>233</td><td>1.5</td><td>155.33</td><td>1%</td></tr>
        <tr><td>Galaxy S II (I9100)</td><td>219</td><td>1.5</td><td>146</td><td>7%</td></tr>
        <tr><td>Galaxy S III (I9300)</td><td>306</td><td>2</td><td>153</td><td>3%</td></tr>
        <tr><td>Galaxy S4 (I9500)</td><td>441</td><td>3</td><td>147</td><td>6%</td></tr>
        <tr><td>Galaxy Nexus</td><td>316</td><td>2</td><td>158</td><td>-1%</td></tr>
        <tr><td>Galaxy Ace</td><td>164</td><td>1</td><td>164</td><td>-4%</td></tr>
        <tr><td>Galaxy Mega</td><td>233</td><td>1.8</td><td>129.44</td><td>18%</td></tr>

        <tr><th rowspan="4">Sony</th>
            <td>Xperia S</td><td>342</td><td>2</td><td>171</td><td>-9%</td></tr>
        <tr><td>Xperia P</td><td>342</td><td>2</td><td>171</td><td>-9%</td></tr>
        <tr><td>Xperia Z</td><td>443</td><td>3</td><td>147.67</td><td>6%</td></tr>
        <tr><td>Xperia Z1</td><td>441</td><td>3</td><td>147</td><td>6%</td></tr>
    </tbody>
</table>

<table>
    <caption>Element Size Difference of Tablets (average CSS resolution of 159.95)</caption>
    <thead>
        <tr>
            <th>Brand</th>
            <th>Device</th>
            <th>Resolution [ppi]</th>
            <th>CSS Pixel Ratio</th>
            <th>CSS Resolution [cssppi]</th>
            <th>Element Size Difference</th>
        </tr>
    </thead>
    <tbody>
        <tr><th rowspan="4">Amazon</th>
            <td>Kindle Fire HDX 8.9</td><td>339</td><td>1.5</td><td>226</td><td>-41%</td></tr>
        <tr><td>Kindle Fire HD 8.9</td><td>254</td><td>1.5</td><td>169.33</td><td>-6%</td></tr>
        <tr><td>Kindle Fire HD 7</td><td>216</td><td>1.5</td><td>144</td><td>10%</td></tr>
        <tr><td>Kindle Fire</td><td>169</td><td>1</td><td>169</td><td>-6%</td></tr>
        
        <tr><th rowspan="4">Apple</th>
            <td>iPad Mini 1st Gen</td><td>163</td><td>1</td><td>163</td><td>-2%</td></tr>
        <tr><td>iPad Mini 2nd Gen</td><td>326</td><td>2</td><td>163</td><td>-2%</td></tr>
        <tr><td>iPad 1St &amp; 2nd Gen</td><td>132</td><td>1</td><td>132</td><td>17%</td></tr>
        <tr><td>iPad 3Rd &amp; 4th Gen / iPad Air</td><td>264</td><td>2</td><td>132</td><td>17%</td></tr>
        
        <tr><th rowspan="5">Samsung</th>
            <td>Galaxy Tab</td><td>171</td><td>1</td><td>171</td><td>-7%</td></tr>
        <tr><td>Galaxy Note</td><td>285</td><td>2</td><td>142.5</td><td>11%</td></tr>
        <tr><td>Galaxy Note II</td><td>267</td><td>2</td><td>133.5</td><td>17%</td></tr>
        <tr><td>Galaxy Note 3</td><td>368</td><td>2</td><td>184</td><td>-15%</td></tr>
        <tr><td>Nexus 10</td><td>300</td><td>2</td><td>150</td><td>6%</td></tr>
    </tbody>
</table>

<table>
    <caption>Element Size Difference of Standard Displays (average CSS resolution of 97.48, CSS pixel ratio of 1)</caption>
    <thead>
        <tr>
            <th>Aspect Ratio</th>
            <th>Size [in] (Resolution [px])</th>
            <th>CSS Resolution [cssppi]</th>
            <th>Element Size Difference</th>
        </tr>
    </thead>
    <tbody>
        <tr><th rowspan="8">4:3</th>
            <td>14" (1024x768)</td><td>91</td><td>7%</td></tr>
        <tr><td>17" (1024x768)</td><td>75</td><td>23%</td></tr>
        <tr><td>17" (1600x1200)</td><td>118</td><td>-21%</td></tr>
        <tr><td>19" (1600x1200)</td><td>105</td><td>-8%</td></tr>
        <tr><td>21" (1600x1200)</td><td>95</td><td>3%</td></tr>
        <tr><td>19" (1920x1440)</td><td>126</td><td>-29%</td></tr>
        <tr><td>21" (1920x1440)</td><td>114</td><td>-17%</td></tr>
        <tr><td>24" (1920x1440)</td><td>100</td><td>-3%</td></tr>

        <tr><th rowspan="11">16:9</th>
            <td>14" (1366x768)</td><td>112</td><td>-15%</td></tr>
        <tr><td>15.6" (1366x768)</td><td>100</td><td>-3%</td></tr>
        <tr><td>16" (1366x768)</td><td>98</td><td>-1%</td></tr>
        <tr><td>18.5" (1366x768)</td><td>85</td><td>13%</td></tr>
        <tr><td>20" (1600x900)</td><td>92</td><td>6%</td></tr>
        <tr><td>21.5" (1920x1080)</td><td>102</td><td>-5%</td></tr>
        <tr><td>23" (1920x1080)</td><td>96</td><td>2%</td></tr>
        <tr><td>24" (1920x1080)</td><td>92</td><td>6%</td></tr>
        <tr><td>26" (1920x1080)</td><td>85</td><td>13%</td></tr>
        <tr><td>27" (1920x1080)</td><td>82</td><td>16%</td></tr>
        <tr><td>27" (2560x1440)</td><td>109</td><td>-12%</td></tr>

        <tr><th rowspan="10">16:10</th>
            <td>15.4" (1280x800)</td><td>98</td><td>-1%</td></tr>
        <tr><td>19" (1440x900)</td><td>89</td><td>9%</td></tr>
        <tr><td>17.3" (1600x1024)</td><td>109.8</td><td>-13%</td></tr>
        <tr><td>20.1" (1680x1050)</td><td>99</td><td>-2%</td></tr>
        <tr><td>22" (1680x1050)</td><td>90</td><td>8%</td></tr>
        <tr><td>23" (1920x1200)</td><td>98</td><td>-1%</td></tr>
        <tr><td>24" (1920x1200)</td><td>94</td><td>4%</td></tr>
        <tr><td>26" (1920x1200)</td><td>87</td><td>11%</td></tr>
        <tr><td>27" (1920x1200)</td><td>84</td><td>14%</td></tr>
        <tr><td>30" (2560x1600)</td><td>101</td><td>-4%</td></tr>
    </tbody>
</table>

<table>
    <caption>Element Size Difference of Apple Macbooks (average CSS resolution 119.64)</caption>
    <thead>
        <tr>
            <th>Model</th>
            <th>Resolution [ppi]</th>
            <th>CSS Pixel Ratio</th>
            <th>CSS Resolution [cssppi]</th>
            <th>Element Size Difference</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>Air 11" (2010 – 2013)</td><td>135</td><td>1</td><td>135</td><td>-13%</td></tr>
        <tr><td>Air 13" (2010 – 2013)</td><td>128</td><td>1</td><td>128</td><td>-7%</td></tr>
        <tr><td>Pro 13" (2009 – 2012)</td><td>113</td><td>1</td><td>113</td><td>6%</td></tr>
        <tr><td>Pro 13" Retina (2012 - 2013)</td><td>227</td><td>2</td><td>113.5</td><td>5%</td></tr>
        <tr><td>Pro 15" (2006 – 2012)</td><td>110</td><td>1</td><td>110</td><td>8%</td></tr>
        <tr><td>Pro 15" w/ Hi-Res screen (2010 – 2012)</td><td>128</td><td>1</td><td>128</td><td>-7%</td></tr>
        <tr><td>Pro 15" Retina (2012 - 2013)</td><td>220</td><td>2</td><td>110</td><td>8%</td></tr>
    </tbody>
</table>
</div>

What does it all mean?
----------------------
This is by no means a complete list. I have taken the devices with available data that seemed like reasonable representatives of their kind to me. I filtered out some absurd devices like 16:9 standard displays with a 16 inch diagonal and a resolution of 1920x1080.

In general, smartphones and tablets are treated the same way by manufacturers regarding their CSS Resolution. Both categories have a similar average CSS resolution of about 160 cssppi. This makes sense since both types of devices are held in your hands. Macbooks have an average CSS resolution of about 120 cssppi, indicating they are further away than phones and closer than monitors with an average of 96 cssppi. I haven't looked at values for other notebooks, so I cannot say, if they behave the same.

Besides that:

- Smartphones, common standard displays and Macbooks are relative uniform and most of them have a size difference in the bounds of ± 10%. I cannot think of a case where you cannot live with such a difference in size. So generally, there shouldn't be much of a problem.
- Larger standard displays generally show their content bigger.
- Tablets and more unusual standard displays show a wider range of size differences. It could happen, that it looks good on one device and is too small or big on another.
- Of course, there are some extreme cases. The most extreme ones are the Amazon Kindle Fire HDX 8.9 showing elements 41% smaller than average and the LG Optimus One showing elements 24% larger than average. By looking on their CSS resolution this means, that the Optimus One displays its content almost twice as big as the Kindle.

If you check your design on devices, I suggest to take the ones close to the average, if possible. No extreme cases. Or at least know, that you are looking at a devices that displays content larger/smaller in relation to another device.