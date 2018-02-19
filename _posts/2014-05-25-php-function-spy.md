---
layout: article
title: 'PHP Spy: Record Calls To Functions or Alter Their Behavior At Runtime'
category: articles
excerpt: Track calls to functions and methods or stub them when you cannot use a PHPUnit test double.
meta_description: Track calls to functions and methods or stub them when you cannot use a PHPUnit test double.
---

What do you do, if you use PHPUnit and test code that does not rely on dependency injection? When you cannot just create a [test double](http://phpunit.de/manual/3.7/en/test-doubles.html) of the object in question and inject it into the system under test?

## Case Study Magento
I had this problem when testing some code for the e-commerce application Magento. [All I wanted to do](http://en.wiktionary.org/wiki/yak_shaving) was to verify that a method of some object has been called with the correct arguments. The test scenario was like: *When a customer is saved, send out his/hers data (as XML) via cURL.* I wanted to intercept the function sending out the cURL request just to see if the correct data would have been sent.

Some googling and reading answers on Stack Overflow didn't provide a direct solution. Mostly it was about optimizing the codes structure like using dependency injection so its behavior is better encapsulated and easier to test. Just Magento does not do dependency injection at all. Instead objects are created where needed with something along the lines of

{% highlight php %}
<?php

$model = Mage::getModel('namespace/modelName');

//This is essentially the same as writing
$model = new Vendor_Namespace_Model_ModelName();
{% endhighlight %}

With the system under test at hand there was no way to mock the cURL function and inject it. **So, how to test it?**

## Inspiration From Other Frameworks
What do testing frameworks in different languages bring along? [Jasmine](http://jasmine.github.io/) for Javascript, for example, offers a spy that makes the task from above easy. There, you just write something like

{% highlight php %}
<?php

spyOn(duck, "quak");
{% endhighlight %}

and from then on calls to `duck.quak` are recorded. In Javascript calls can be intercepted by just redefining the underlying function like so:

{% highlight php %}
<?php

var IWantToBeIntercepted = function() {...}
var IWantToBeIntercepted_original = IWantToBeIntercepted;

IWantToBeIntercepted = function() {
  var result;
  
  if (stubbed) {
      result = cannedAnswer;
  } else {
      //delegate to original function
      result = IWantToBeIntercepted_original()
  }
  
  //track meta data of the call like
  //its arguments and return value
  
  return result;
}
{% endhighlight %}

This works for methods, too.

Is intercepting calls to functions and methods possible in PHP? Nope, you can't do that. There is a construct like the magic method `__call`, but it does not help, because `__call` only catches calls to inaccessible methods. PHP does have lambdas that can be assigned to variables. But this does not permit redefining methods or normal functions.

## A Spy For PHP
Fortunately, there is an extension called [runkit](http://php.net/manual/en/book.runkit.php), now maintained on [github](https://github.com/zenovich/runkit). It makes the redefinition of methods and functions possible. So, I sat down and wrote a PHP version of a spy that can be applied to methods and functions at runtime.

You can find the code, install guide and documentation on [github](https://github.com/christopheraue/phpspy). May it help you, if you have a similar problem.
