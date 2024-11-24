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
