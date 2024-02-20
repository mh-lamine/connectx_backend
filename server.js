const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://mlaminsngom:G5nGeEs3HS1S4O7e@cluster0.rdm9fzk.mongodb.net/connectx?retryWrites=true&w=majority"
);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(cors());

const appointmentsRouter = require("./routes/appointments");
app.use("/appointments", appointmentsRouter);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
