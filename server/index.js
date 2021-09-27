"use strict";

const express = require("express");
const morgan = require("morgan");

const {
  getTest
} = require("./handlers")

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(morgan("tiny"))

// TEST ENDPOINT
app.get("/test", getTest)


// Catchall endpoint
app.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Unknown endpoint",
  });
});

app.listen(8000, () => console.log("server is up and running... on port 8000"))
