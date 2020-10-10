const bcrypt = require("bcrypt");

async function run() {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  //$2b$10$CF4wMjYWRCns463c/o5VxO

  const hashedPassword = await bcrypt.hash("12345", salt);
  console.log(hashedPassword);
  //$2b$10$CF4wMjYWRCns463c/o5VxO1Y2C7aPW4.eqGVBXHb8R443uPlCc60q
}
run();

//in hashed password salt is  included
