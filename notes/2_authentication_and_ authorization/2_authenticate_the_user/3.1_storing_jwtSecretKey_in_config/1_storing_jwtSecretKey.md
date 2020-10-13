## using config to store jwtSecretKey

```js
const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");
```

- here we are store secret key directly in code which is not a good practice at all because it'll be visible to anyone who has access to oue source code.

- we should store out secret key in config file. for that we should use a 3rd party config module.

  - steps to use:

        1. npm i config

        2. create a folder by name config

        3. create a default.json file in config folder : {"jwtPrivateKey": ""} // this file may conatins many secret things, but for now just jwtPrivateKey

        4. create 'custom-environment-variables.json file config folder : {"jwtPrivateKey": "vidly_jwtPrivateKey"} // this file is for mapping keys with env variable. so we have to set value for 'vidly_jwtPrivateKey' from env varibale

        5. now in JS file (auth.js/login.js) where we are generating token for user.

        ```js
        const config = require("config");

        const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
        ```

        6.  in index.js we need to make sure when this application starts this environment varibale is set. if not set we'll terminate the application with error message.

        ```js
        const config = require("config");

        const app = express();
        if (!config.get("jwtPrivateKey")) {
            console.log("FATAL ERROR: jwtPrivateKey is not defined");
            process.exit(1); //0: success, anything else = failure
        }
        ```
