const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

//importing routes
const genres = require("./routes/genres");
const home = require("./routes/home");
const customers = require("./routes/customers");
const app = express();

//mongodb connection
mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`connected to mongodb...`))
  .catch((err) => console.error(`can't connect to db: ${err.message}`));

//express middleware ,for post/put
app.use(express.json()); //it'll read the req and if there is json object present then it'll parse that nd set req.body property

//routing
app.use("/api/genres", genres); //for any api call starts with '/api/courses' use courses (which is imported)
app.use("/", home);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at port ${port}...`));
