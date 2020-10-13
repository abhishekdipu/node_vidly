### why we need handeling and logging of errors ?

- sometime unexpected error or exception can come our apps, wo we need to send error message and log execptions in server.

- what kind of error can arise in reallife scenario?

  1. when monogoDB server dies: if server disconnected once then node will try to connect with server 30 times after every 1 sec. then node will give PromiseRejection error and will terminate, and won't serve any other clients even after server restarts.
     so we need to properly handel this exception.

  solution: whenever you get PromiseRejection error, that means you are dealing with async code and have not handeled promise properly so promise is rejected.

1. 1st approch: inclose every routes in try catch block.

2. 2nd approch: instead of inclosing create middleware function to do the same

- steps to implement:
  - create error.js in middleware folder: return 500 error with error message from this function.
  - create asyncMiddleware in middleware folder: to handle try catch logic for route handler.
  - in routes/genres.js : pass asyncMiddleware function in 2nd parameter of route handler.
  - in index.js , import this MW function, and use it after every routes.

3. 3rd approch (best approch): using 'express-async-errors' 3rd party module.

- steps to use.

  - npm i express-async-errors
  - in index.js : require('express-async-errors')

- **NB. 3rd approch is recomanded approch as it is cleaner and easier to use. if due to some reason 3rd approch doesn't work then use 2nd approch**.
