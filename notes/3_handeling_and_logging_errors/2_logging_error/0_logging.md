## why logging error is reqired?

- in big enterprice level application we often need to log error in server, so that later we can see th error and analyse in which area to improve.

- for this we'll use a 3rd part library called [winston](https://www.npmjs.com/package/winston).

- winston comes with transports to log message in Console/File/Http(calling api to log)

- with help to some other winston plugin we can also log messages in mongoDB/CouchDB/Redis/Loggly

- steps to use:

  1. npm i winston
  2. index.js :
     const winston = require("winston");
     winston.add(winston.transports.File, { filename: "logfile.log" });
  3. in middleware/error.js : winston.error(err.message);

- to log error in mongoDB, we user winston-mongodb
  - steps:
  1. npm i winston-mongodb
  2. index.js :
     const winston = require("winston");
     require("winston-mongodb");
     winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly" });
  3. in middleware/error.js : winston.error(err.message);
