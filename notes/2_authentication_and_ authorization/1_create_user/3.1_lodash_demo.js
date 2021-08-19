const _ = require("lodash");
const emp = {
  name: "abhi",
  age: "23",
  email: "abhi@test.com",
};

const std = _.pick(emp, ["name", "email", "age"]);
//it'll take name email and age properties "emp" object and create std object

console.log(emp);
console.log(std);
