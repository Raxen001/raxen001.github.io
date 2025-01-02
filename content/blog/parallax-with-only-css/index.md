---
title: "Parallax With Only Css"
date: 2025-01-02T12:52:06+05:30
author: "Raxen"
draft: true
tags: []
categories: []
customcss: ""
---

# Parallax with only CSS

I have been trying to make a scrolling parallax effect for the background with
text on the foreground for my site with only css for a long time and have
finally got something that is close to what i wanted here is an example.
I have creted

link-to-demo: [parallax-prototype](./html/parallax)

as you scroll you can see that the background is moving at a different rate to
the foreground.


## How does it work

### wrapper
### background
### perserve-3d


## DISADVANTAGES

Since we are making a fake layer for scrolling by creating a wrapper and making
it scrollable.
We lose the ability to make the background change according to the texts present
and height of the content body.

tl;dr **Can't change the background size dyanmically according to content
size.**

Lamens term: ***no background, if the content exceeded the background.***

Hence till i find a better way to implement this without javascript not gonna
integrate this into my site.
