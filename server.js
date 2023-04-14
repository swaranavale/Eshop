const express = require('express');
const dotenv = require("dotenv").config();
const dbConfig = require("./configs/db.config");
const mongoose = require("mongoose");
const serverConfig = require('./configs/server.config');
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
/*app.get('/testroute', (req, res) => {
    res.send('Server is up and running');
});
*/

//create express app instance
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.listen(serverConfig.PORT, () => {
    console.log(`Server is running on PORT ${serverConfig.PORT}`);
});

//connect to database
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
  console.log("error while connecting to DB");
});
db.once("open", () => {
  console.log("connected to Mongo DB ");
});

// Use routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
require("./routes/auth.routes")(app);
require("./routes/shippingAddress.routes")(app);
require("./routes/product.routes")(app);
require("./routes/order.routes")(app);

// catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;