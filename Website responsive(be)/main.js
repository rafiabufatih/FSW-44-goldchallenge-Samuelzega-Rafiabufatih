const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");
const morgan = require("morgan");
const donateRouter = require("./routes/donate.route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(donateRouter);
// app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`server is running in port : ${port}`);
});
