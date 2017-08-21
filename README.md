# Rails + Webpack + React + Heroku

## Running JavaScript Tests

```
$ bin/yarn test
```

## Deployment hints ([source](https://medium.com/@hpux/rails-5-1-loves-javascript-a1d84d5318b))

1. Add the nodejs and ruby buildpacks:

    ```
    $ heroku create 
    $ heroku buildpacks:add --index 1 heroku/nodejs
    $ heroku buildpacks:add --index 2 heroku/ruby
    ```
