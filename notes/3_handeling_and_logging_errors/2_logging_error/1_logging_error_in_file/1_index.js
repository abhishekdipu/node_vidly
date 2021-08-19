const winston = require("winston"); // for logging

const error = require("./middleware/error"); ////importing MW

const app = express();

//to log error message in file
winston.add(winston.transports.File, { filename: "logfile.log" });

//to handel unexpected error: it'll return 500
app.use(error);
