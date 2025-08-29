# BFHL API

This project implements the **Full Stack Question Paper – VIT** API in **Node.js + Express.js**.  
It provides a `/bfhl` POST endpoint that processes an array of inputs and returns structured data such as even/odd numbers, alphabets, special characters, sum of numbers, and concatenated strings.

---

## Author
- **Name:** Nishant Gupta  
- **Date of Birth:** 27-10-2003  
- **Email:** nishantgupta2325@gmail.com  

---

## Deployment

The API is hosted and publicly accessible at:  
👉 [https://bajaj-finserv-qi96.onrender.com/bfhl](https://bajaj-finserv-qi96.onrender.com/bfhl)

---

## Features
- Accepts a JSON payload with an array of data.
- Separates numbers into **even** and **odd**.
- Converts all alphabets to **uppercase**.
- Identifies **special characters**.
- Computes **sum of numbers** (returned as string).
- Generates **reversed alternating-case concatenated string** from alphabets.
- Returns metadata including `user_id`, `email`, `roll_number`, and operation status.

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/NishantGupt786/bajaj-finserv.git
cd bfhl-api
npm install
````

---

## Running the Server

### Development (with nodemon)

```bash
node index.js
```


Server will start on [http://localhost:3000](http://localhost:3000).

---

## API Usage

### Endpoint

`POST /bfhl`

### Request Body

```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

### Sample Response

```json
{
  "is_success": true,
  "user_id": "nishant_gupta_27102003",
  "email": "nishantgupta2325@gmail.com",
  "roll_number": "22BCT0304",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}