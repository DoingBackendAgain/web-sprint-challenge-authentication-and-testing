// Write your tests here
const supertest = require("supertest")
const server = require("./server")
//const db = require("../data/dbConfig")


// test('sanity', () => {
//   expect(true).toBe(true)
// })

describe("registration test", () => {
  it("posts to database", async ()=> {
    const res = await supertest(server).post("/register")
      .send({username: "Steph"})
      expect(res.statusCode).toBe(201)
      expect(res.type).toBe("application/json")
      expect(res.body.id).toBeDefined()
  })

  it("logs in", async ()=> {
    const res = await supertest(server).post("/login")
      .send({username:"Steph", password:"123abc"})
      expect(res.statusCode).toBe(201)
      expect(res.type).toBe("application/json")
      expect(res.body.id).toBeDefined()
  })
})
