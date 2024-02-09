const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const appointmentsRouter = require("./routes/appointments");
app.use("/appointments", appointmentsRouter);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
