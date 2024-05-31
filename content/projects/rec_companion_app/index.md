---
title: "REC comapnion app frontend"
date: 2023-11-08T20:02:50+05:30
author: "RAXEN"
draft: true
customcss: "blog.css"
---


# REC COMPANION APP and how I OVERENGIEERED IT...

## WHERE IT ALL STARTED

It  was the year 2021 when i joined my college. I was very curious as
to what all the stuff they had in the college. Once i finished my first
internals. I was shocked to see that my results can be viewed in my college
portal which was to be accessed through my college mail id. As a person with a
very curious mindset. I got to work on how the backend API works. At that time
I didn't have that much knowledge regarding backend and frontend. I was into
programming and mostly focused on leetcode and problem solving. I had some
experience working with reverse engineering my school's android application. 
\( **code lost in time sadly**  *:(*) 

## Idea to create a better frontned

I was using a lot of different frontend for popular applications that that time.
- Invidious, newpipe, freetube -> for YouTube
- Infinity -> for reddit
- nitter -> twitter

So i was thinking it would be cool if i could make a frontend for my college
portal that didn't suck.

# REVERSE ENGINEERING

By 2022. I wanted to build a better portal for my peers. Cause the official one
from college was shit The backend apis had 0 authentication they were simply
quried and data was returned. It made it really easy to reverse engineer and
build applications around it. In fact there was already an existing solution as
a telegram bot. Okay, I should just use it and call it a day right. Wrong. I
didn't have telegram and using a telgram bot was unintutive and i really wanted
it to be a standalone application or a website. 

## 0 AUTH ON BACKEND

Just going through how the reqeusts work in Chrome/Firefox devtools. In the
network tab i quickly found that they had 0 authentication for the api
endpoints. 

![Network request to api endpoints in unified rec](img/unified-network.png)



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

- nginx - docker - volume - fucked up service worker not registering properly
  aws decided to fuck us by only allowing 1 gb ram on free tier

Lot of code changes on the production server to make it run 


Don't depend on other services, they might change how their apis behave any
moment and your application will stop working

lot of lessons learnt
userbase is more than 1.5k people as of 31/05/2024


# api switching using Docker

This is my about my project where I worked as the project lead for a club
project. In this project various students worked together to make a student
companion app for our college. the issues we faced were. The few people who
wanted to work on this project each had different background in development and
didn't know a single tool they all could use ( some knew node.js, some knew
flask ). This made it hard to choose a tool we had to use. As a project lead I
decided to go with docker containers to host the APIs and use nginx within it
to proxy the api calls to the required So i decided on this approach so each
api backend we intended to implement can be made by separate teams and once
everything has been implemented we can make it work together seemlessy.

# Unified portal

## NO Multithreading
took forever to do anything relevant with it

## Multithreading
wow nice feature
