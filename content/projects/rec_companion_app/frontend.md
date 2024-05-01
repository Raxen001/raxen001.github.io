---
title: "REC comapnion app frontend"
date: 2023-11-08T20:02:50+05:30
author: "RAXEN"
draft: true
customcss: "blog.css"
---

# Frontend

components used

- React
- Axios
- NextUI
- ReactRouterDom
- react loader spinner
- http-proxy-middleware

# NOTES

```nginx
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', {
    target: 'http://backend:9000',
    pathRewrite: {'^/api' : ''}
  }));
};
```
