## Performing Transaction in mongoDB using fawn package

[fawn link](https://www.npmjs.com/package/fawn)

- sometime in **one api** call we may need to update **multiple collections**(tables) of mongoDB.
- say for eg. In POST api call , if we are performing 2 save operation i.e. for change in one data we are updating 2 collection,
- so if after one save operation some error occurs and 2nd operation is not able to complete then we will have different data saved in 2 diff collections. so we need to make this atomic where either both completes or non. we can do this using "transaction" in sql, and "two phase commit" technique in mongoDB.
- we can use "fawn" in mongo for same purpose which internally use "two phase commit"

```js
const Fawn = require("fawn"); //for transaction
Fawn.init(mongoose); //initialize fawn with mongoose object

try {
  new Fawn.Task()
    .save("rentals", rental) //save take 2 params, 1st: in which collection to save , 2nd: what to
    .update(
      "movies",
      { _id: movie._id },
      {
        $inc: { numberInStock: -1 },
      }
    )
    .run();
  res.send(rental);
} catch (err) {
  res.status(500).send("something went wrong");
}
```
