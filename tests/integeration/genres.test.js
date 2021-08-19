const request = require("supertest");
const mongoose = require("mongoose");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");

let server;

//main suite
describe("/api/generes", () => {
  //load the server before each test case
  beforeEach(() => {
    server = require("../../index");
  });
  //close the server before each test case
  afterEach(async () => {
    server.close();
    await Genre.remove({}); //remove inserted doc after each test case
  });

  //sub suite
  describe("GET /", () => {
    it("should return all geners", async () => {
      //populate the db
      const genres = [{ name: "genre1" }, { name: "genre2" }];
      await Genre.collection.insertMany(genres);

      //hit the api
      const res = await request(server).get("/api/genres");

      //validate data
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      //populate the db
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");

      expect(res.status).toBe(404);
    });

    it("should return 404 if no genre with the given id exists", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get("/api/genres/" + id);

      expect(res.status).toBe(404);
    });
  });

  //suite to test PORT
  describe("POST /", () => {
    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the test.
    let token;
    let name;

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    const exec = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });
    };

    //to check if data getting saved
    it("should save the genre if it is valid", async () => {
      await exec();
      const genre = await Genre.find({ name: "genre1" });
      expect(genre).not.toBeNull();
    });

    //to check if correct data getting saved
    it("should return the genre if it is valid", async () => {
      const res = await exec();
      expect(res.body).toHaveProperty("_id"); //should have id property
      expect(res.body).toHaveProperty("name", "genre1"); // should have name property with value 'genre1'
    });

    //validate auth
    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    //validate body
    it("should return 400 if genre is less than 5 characters", async () => {
      name = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if genre is more than 50 characters", async () => {
      name = new Array(52).join("a"); //length = 52-1 = 51
      const res = await exec();
      expect(res.status).toBe(400);
    });
  });
});

/**
 * there is a problem if load server on top
 * - 1st time we'll run the rest server will listen on port 3000
 * - next time we make chnage to code, jest will re-run our tests so it'll load the server again
 * - so we'll get exception, bcz there is already a server running on port 3000
 *
 * so for writing integeration test, we should load the server before each test and close it after each test
 * - for this we make make use to jest built-in utility function
 *  - beforeEach() and afterEach()
 */
