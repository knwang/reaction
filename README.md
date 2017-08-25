# Rails + Webpack + React + Heroku

## Useful commands

```
$ bin/yarn run test # Run JS unit tests

$ bin/yarn run lint # Run eslint on files in app/javascript
```

## Deployment hints ([source](https://medium.com/@hpux/rails-5-1-loves-javascript-a1d84d5318b))

1. Add the nodejs and ruby buildpacks:

    ```
    $ heroku create 
    $ heroku buildpacks:add --index 1 heroku/nodejs
    $ heroku buildpacks:add --index 2 heroku/ruby
    ```
