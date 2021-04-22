const {} = require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const mongoose = require("mongoose");

//initialize express
const app = express();

//allow requests from cross origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setup the port
const port =
  process.env.NODE_ENV === "test" ? process.env.TEST_PORT : process.env.PORT;

//set up mongo uri
const uri =
  process.env.NODE_ENV === "test"
    ? process.env.mongoTestURI
    : process.env.mongoURI;

//connect to mongo db
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use("/api/v1", routes);

// Catching none-existing routes and other errors
app.use((req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Route Not Found",
  });
});

//start the server
app.listen(port, () => console.log(`server started at Port ${port}`));

//exports the app for testing
module.exports = app;
