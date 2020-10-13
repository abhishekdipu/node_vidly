### why we need authorization?

- if we want only user having admin access can add/modify/delete genres then we need to check authorization.
- some endpoint should be public like viewing genres, viewing movies etc.

### how can we implement authorization?

- we can create a custom middle middleware to verify token. and then use this middleware to protect add/modify/delete routes.

- steps to implement
  1. create a folder by the name middleware
  2. create a file auth.js : write MW function to validate token and export it.
  3.
