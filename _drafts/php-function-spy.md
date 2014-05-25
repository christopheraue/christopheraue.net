---
layout: article
title: PHPSpy: Record calls to functions and alter their behavior at runtime
category: articles
tags:
image:
excerpt:
meta_description:
---

Introduction
- Useful for code testing: If you cannot inject a stub or mock as test double into the testing environment, i.e. the system under test cannot be completely confined.
- A more 'on-the-fly' variant to stubbing and mocking.

Behavior of the Spy
- Spying on a function does not interfer with a function's behavior and thus does not break anything by default.
- But, it can intercept calls and change a functions behavior if configured this way.
- Track arguments, return values and context of calls to functions
