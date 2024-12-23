---
title: "Css_toc_details"
date: 2024-12-24T01:28:00+05:30
author: "Raxen"
draft: true
tags: ["html", "css"]
categories: ["coding"]
customcss: ""
---

# TRYING TO CREATE ONLY CSS TABLE OF CONTENTS WITH ANIMATION

## CSS DETAILS ANIMATION

I was trying to find a way to have my Table of contents
have a smooth animation for opening and closing.
**NO JAVASCRIPT**.

#### HTML

```html
<details>
    <summary>...</summary>
    <div class="content">...</div>
</details>
```
#### CSS

```css
/* animate toc opening and closing */
details::details-content{
    block-size: 0;
    transition-property: block-size, content-visibility;
    transition-duration: 250ms;
    transition-behavior: allow-discrete;
}
details[open]::details-content{
    block-size: 50rem;
    block-size: auto;
    block-size: calc-size(auto);
}
```

## BAD NEWS

unfortunately the **calc-size()** is not yet supported by firefox. 
[stated here](https://developer.mozilla.org/en-US/docs/Web/CSS/calc-size#browser_compatibility "firefox browser_compatibility")
No idea what to do to have feature parity as of now.
