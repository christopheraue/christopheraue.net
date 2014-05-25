---
layout: article
title: PHP Spy: Record calls to functions and alter their behavior at runtime
category: articles
tags: php spy testing
image:
excerpt:
meta_description:
---

Using PHPUnit to test an extension I've written for the e-commerce app Magento, I needed to verify that a method was called with the correct arguments. This method belonged to an object that was created deep *inside* the System Under Test in a code part beyond my control. Thus, I could not create a mock of the object and inject it into the SUT. So, how to test it?

## Inspiration
Testing frameworks like [Jasmine](http://jasmine.github.io/) for Javascript make this easy. There, you just write something like

```js
spyOn(duck, "quak")
```

and from then on calls to `duck.quak` are recorded. This is possible, because in Javascript redefining a method of an object is possible. PHP does have lambdas that can be assigned to variables, too. But this does not allow redefining methods or normal functions. Other language constructs like the magic method `__call` also don't help, because they only catch calls to inaccessible methods.

## Solution
Fortunately, there is an extension called [runkit](http://php.net/manual/en/book.runkit.php) ([github](https://github.com/zenovich/runkit)). It makes the redefinition of methods and functions possible. So, I sat down and wrote my PHP version of a spy.

The [PHP Spy](https://github.com/christopheraue/phpspy) does not interfer with a function's behavior by default. It just positions itself and records arguments, return values and contexts of calls to the spied on function. But if instructed it can also intercept calls completely and change a functions behavior.

You can find the code, install guide and documentation on [github](https://github.com/christopheraue/phpspy).
