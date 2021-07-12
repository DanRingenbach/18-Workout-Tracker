const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3001;

const Workout = require('./models/workout')
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
// routes
app.use(require("./routes/api"));
app.use(require("./routes/html"));


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
  
});
