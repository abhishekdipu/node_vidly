## mongodb atlas

- when we are deploying our app in cloud then we have to put our mongoDB in cloud to, for that we use mongodb atlas.

### 1) Create Cluster -> 2) Setup Network Access -> 3) Setup Database Access

### 1) Create Cluster

- steps to follow:
  1. open mongodb website, register/login
  2. click on (built a cluster)
     -> choose free option
     -> choose aws (default alrealy choosen)
     -> Cluster tier (deafult already choosen)
     -> Additional setting (to chhose mongoDB version; latest is already choosen)
     -> Cluster Name (put any name)
  3. (Create Cluster)

### 2) Setup Network Access

1. click (Network Access) from leftside menu
2. click (Add IP Address) -> click (Allow Access from anywhere) -> click (Confirm)

### 3) Setup Database Access

1. click (Database Access) from leftside menu
2. click (Add New DataBase User)
   -> choose (Password)
   -> give userid = vidly_user and password = vidly123
   -> select (Atlas admin) : to give admin access to this user
   -> click (Add user)

### to create document in this cluster we have to connect this cluster to mongoshell/ mongoCompas

1.  click (Cluster) from leftside menu
2.  click (CONNECT)
    2.1. Choose (Connect with mongo shell)
    -> choose (i have mongo shell installed)
    -> select mongo shell version (4.2)
    -> copy connection string and run in command line (mongo "mongodb+srv://vidlycluster.juxff.mongodb.net/test" --username vidly_user --password vidly123)
    -> to check dbs in command line : show dbs
    2.2 choose (Connect using mongoDB Compass)
    -> choose (i have mongoDB Compass)
    -> choose compass version (1.12 or later)
    -> copy the connection string and paste in MongoDB Compass (mongodb+srv://vidly_user:vidly123@vidlycluster.juxff.mongodb.net/test)

    2.3 choose
    ->mongodb+srv://vidly_user:vidly123@vidlycluster.juxff.mongodb.net/vidly?retryWrites=true&w=majority

        mongodb://localhost/vidly
