const express = require("express")
const helmet = require("helmet")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(helmet()) //for attaching various HTTP headers for app security

const cache = new Map() // simple caching mechanism didnt want to go overboard with redis or memcached for this small project

app.get("/", (req, res) => {
  res.json({ status: "ok" })
})

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" })
    }

    const key = JSON.stringify(data)
    if (cache.has(key)) {
      return res.json(cache.get(key))
    }

    const result = data.reduce(
      (acc, item) => {
        if (typeof item === "string" && item.trim() !== "") {
          if (!isNaN(item)) {
            const num = parseInt(item, 10)
            if (!isNaN(num)) {
              acc.sum += num
              if (num % 2 === 0) acc.even_numbers.push(item.toString())
              else acc.odd_numbers.push(item.toString())
            }
          } else if (/^[a-zA-Z]+$/.test(item)) {
            acc.alphabets.push(item.toUpperCase())
            acc.concatString += item
          } else {
            acc.special_characters.push(item)
          }
        }
        return acc
      },
      { even_numbers: [], odd_numbers: [], alphabets: [], special_characters: [], sum: 0, concatString: "" }
    )

    result.concatString = result.concatString
      .split("")
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("")

    const response = {
      is_success: true,
      user_id: "nishant_gupta_27102003",
      email: "nishantgupta2325@gmail.com",
      roll_number: "22BCT0304",
      odd_numbers: result.odd_numbers,
      even_numbers: result.even_numbers,
      alphabets: result.alphabets,
      special_characters: result.special_characters,
      sum: result.sum.toString(),
      concat_string: result.concatString
    }

    cache.set(key, response)
    res.json(response)
  } catch (error) {
    res.status(500).json({ is_success: false, message: "Server Error" })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`BFHL API running at http://localhost:${PORT}/bfhl`))
