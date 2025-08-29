const request = require("supertest")
const app = require("../index")

describe("BFHL API Tests", () => {
  it("should return health status", async () => {
    const res = await request(app).get("/")
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("status", "ok")
  })

  it("should process data correctly", async () => {
    const res = await request(app)
      .post("/bfhl")
      .send({ data: ["a", "1", "334", "4", "R", "$"] })

    expect(res.statusCode).toBe(200)
    expect(res.body.is_success).toBe(true)
    expect(res.body.odd_numbers).toEqual(["1"])
    expect(res.body.even_numbers).toEqual(["334", "4"])
    expect(res.body.alphabets).toEqual(["A", "R"])
    expect(res.body.special_characters).toEqual(["$"])
    expect(res.body.sum).toBe("339")
    expect(res.body.concat_string).toBe("Ra")
  })

  it("should handle invalid input", async () => {
    const res = await request(app).post("/bfhl").send({ data: "not-an-array" })
    expect(res.statusCode).toBe(400)
    expect(res.body.is_success).toBe(false)
  })

  it("should handle empty array", async () => {
    const res = await request(app).post("/bfhl").send({ data: [] })
    expect(res.statusCode).toBe(200)
    expect(res.body.even_numbers).toEqual([])
    expect(res.body.odd_numbers).toEqual([])
    expect(res.body.alphabets).toEqual([])
    expect(res.body.special_characters).toEqual([])
    expect(res.body.sum).toBe("0")
    expect(res.body.concat_string).toBe("")
  })

  it("should handle numbers only", async () => {
    const res = await request(app).post("/bfhl").send({ data: ["1", "2", "5"] })
    expect(res.statusCode).toBe(200)
    expect(res.body.even_numbers).toEqual(["2"])
    expect(res.body.odd_numbers).toEqual(["1", "5"])
    expect(res.body.alphabets).toEqual([])
    expect(res.body.special_characters).toEqual([])
    expect(res.body.sum).toBe("8")
    expect(res.body.concat_string).toBe("")
  })

  it("should handle alphabets only", async () => {
    const res = await request(app).post("/bfhl").send({ data: ["a", "B", "z"] })
    expect(res.statusCode).toBe(200)
    expect(res.body.even_numbers).toEqual([])
    expect(res.body.odd_numbers).toEqual([])
    expect(res.body.alphabets).toEqual(["A", "B", "Z"])
    expect(res.body.special_characters).toEqual([])
    expect(res.body.sum).toBe("0")
    expect(res.body.concat_string).toBe("ZbA")
  })

  it("should handle special characters only", async () => {
    const res = await request(app).post("/bfhl").send({ data: ["$", "&", "*"] })
    expect(res.statusCode).toBe(200)
    expect(res.body.even_numbers).toEqual([])
    expect(res.body.odd_numbers).toEqual([])
    expect(res.body.alphabets).toEqual([])
    expect(res.body.special_characters).toEqual(["$", "&", "*"])
    expect(res.body.sum).toBe("0")
    expect(res.body.concat_string).toBe("")
  })
})
