## Authentication and Authorization

- Authentication :- to check a person who he claims he is.
- Authorization :- to check if the person has right permission to perform the operation.

- for this we may need to perform
  - Register : POST
  - Login : POST

1. create a user model
2. create a route to register new user

- mindmap

  - create user : model+route -> use POST method to create user and return jwt in res header when user get created

    - create user: POST
    - view current user: GET
    - logout: it's not required from backend, should be handled from frontend

  - create auth route: to verify user with email and password

    - login with email and password: POST

  - create a middleware for auth to protect post/put/delete routes
