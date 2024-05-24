---
title: "REC comapnion app frontend"
date: 2023-11-08T20:02:50+05:30
author: "RAXEN"
draft: true
customcss: "blog.css"
---


# REC COMPANION APP and how OVERENGIEERED IT IS

## WHERE IT ALL STARTED

It must have been the year 2021 when i joined my college. I was very curious as to what all the stuff they had in the college.
Once i finished my first internals. I was shocked to see that my results can be viewed in my college portal which was to be accessed
through my college mail id. As a person with a very curious mindset. I got to work on how the backend api works. At that time
I didn't have that much knowledge regarding backend and frontend. I was into programming and mostly focused on leetcode and problem solving.
I had some experience working with reverse engineering my school's android application. ( ** code lost in time ** *sadly :(*)

## 0 AUTH ON BACKEND

By 2022. I wanted to build a better portal for my peers. Cause the official one from college was shit
The backend apis had 0 authentication they were simply quried and data was returned. It made it really easy to reverse engineer and build applications around it.
In fact there was already an existing solution as a telegram bot. Okay, I should just use it and call it a day right. Wrong. I didn't have telegram and using a telgram
bot was unintutive and i really wanted it to be a standalone application or a website. 

## 


# NOTES DUMP TODO

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

- nginx - docker - volume - fucked up
service worker not registering properly
aws decided to fuck us by only allowing 1 gb ram on free tier

Lot of code changes on the production server to make it run 


Don't depend on other services, they might change how their apis behave any moment and your application will stop working

lot of lessons learnt
userbase is more than 500 people.

