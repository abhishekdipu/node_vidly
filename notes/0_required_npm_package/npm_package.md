##

- npm i express joi joi-objectid joi-password-complexity express-async-errors lodash
- npm i mongoose fawn bcrypt
- npm i config dotenv
- npm i jsonwebtoken
- npm i winston winston-mongodb

## for express

1. express (npm i express)
2. joi (npm i joi) : for request body schema validation
3. joi-objectid : for validation object id
4. joi-password-complexity : to set validation for password
5. express-async-errors : to avoid using try catch for async function
6. lodash : to simplicity of creating object

## for mongoDB

1. mongoose : for mongodb
2. fawn : for transaction(two phase commit in mongo)
3. bcrypt : to hashing password before saving to db

## for env and configuration

1. config
2. dotenv

## for auth.js

1. jsonwebtoken

## for logging

1. winston : to log error message to console/file
2. winston-mongodb : to log errors/info to mongodb
