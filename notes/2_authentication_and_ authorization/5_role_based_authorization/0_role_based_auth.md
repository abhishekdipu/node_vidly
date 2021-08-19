### to give differnt level to access to differnt users we need role based authorization.

- in our application users can have different role like admin, manager, owner etc.
- and we can set differnt level of access to differnt roles. eg. admin will have acess to delete genres route, owner will have access to all routes etc.

#### how to implement?

- for this app lets impletment for only admin role.

1. in models/user : add 'isAdmin' property to userSchema.
2. in models/user : add 'isAdmin' property to jwt payload.
3. in middleware : add admin.js file: write MW to verify isAdmin.
4. in rautes/genres : use isAdmin MW to protect delete operation.
