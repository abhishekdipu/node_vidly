### Deployment Options :

    1. PaaS (Platform as a service provider) : it's good when you don't wanna get involved in infrastructure (server , loadbalancers, reverse proxies, restaring the app on crash ).
        - some popular options for this: Heroku, GCP, AWS, Azure

    2. Docker : it's good to use, if you want more control over your deployment, if you want to deploy on you own node servers.
        - with docker you can create image of your application and simply deploy that image to any ccomputer that you want.

### Deploying Node app to Heroku

- steps to follow:

  1. prepare you app for production: by installing some 3rd party packages

     - install helmet (to protect your app for web's well know vulnerabilities): npm i helmet
     - install compression (to compress http response that we sent to the client) : npm i compression
     - startup/prod.js : load these packages here
     - index.js : call the function and pass app

  2. deploy app to heroku:

  - create heroku account

  - install heroku cli :
    for mac: brew tap heroku/brew && brew install heroku
    for window: download installer

  - login to heroku with cli : in terminal-> heroku login

  - prepare app for heroku :

    - add start script in package.json , as heroku will start this app with npm start command

    ```js
    "scripts": {
    "start":"node index.js"
    }
    ```

    - add node version(in which your project is created) to package.json.
      - to see node version : in terminal -> node -v

    ```js
    "engines": {
    "node": "12.18.2"
    }
    ```

    - create .gitignore file : put file/folder name which you want want to push on git

    - in terminal:-> heroku create unique_name eg.
      heroku create abhishekdipu-vidly
      (unique_name is optional if not given then heroku will craete itself )

      - git push heroku master

      - set environment varibales in heroku:

        1. set jwtPrivateKey
           heroku config:set vidly_jwtPrivateKey=1234
        2. set NODE_ENV to production to inhance performance
           heroku config:set NODE_ENV=production

        - NB: to see all env aribales set in heroku:
          heroku config

- important things about heroku cloud architecture
  - by default heroku give us 1 server called dyno
