const express = require("express");
const router = express.Router();

//get call for root path
router.get("/", (req, res) => {
  res.send("welcome to Vidley application");
});

module.exports = router;
