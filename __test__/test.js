const request = require("supertest");
const { connectDb, closeDbConnection } = require("../src/helpers/dbConfig");
const app = require("../src/app");

beforeAll(async () => {
  await connectDb();
});

afterAll(async () => {
  await closeDbConnection();
});

describe("Test Create new contact /contacts/create", () => {
  let a_t;
  let contactId;

  it("should return 200 status code", async () => {
    const data = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "johndoe@gmail.com", password: "Password1234$$" })
      .expect(200);
    a_t = data.headers["set-cookie"][0];
  });

  it("should return 201 status code", async () => {
    const response = await request(app)
      .post("/api/v1/contacts/create")
      .send({
        firstName: "Ade",
        lastName: "Bisi",
        phoneNumber: "+234855445776783",
      })
      .set("Cookie", a_t);
    contactId = response._body.createdContact._id;
    expect(response.status).toBe(201);
  });

  it("should return 200 status code", async () => {
    try {
      const response = await request(app)
        .put(`/api/v1/contacts/update/${contactId}`)
        .send({
          firstName: "Ade",
          lastName: "Bisi23",
          phoneNumber: "+2349354594456783",
        })
        .set("Cookie", a_t);

      expect(response.status).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });
});
