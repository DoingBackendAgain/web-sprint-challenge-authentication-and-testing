// Write your tests here
const supertest = require("supertest")
const server = require("./server.js")
//const db = require("../data/dbConfig")


// test('sanity', () => {
//   expect(true).toBe(true)
// })

describe("registration test", () => {
  it("posts to database", async ()=> {
    const res = await supertest(server)
      .post("register")
      .send({username: "Steph", password: "abc123"})
      expect(res.statusCode).toBe(201)
  })
})
