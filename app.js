const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const connectDb = require("./config/db");
const MongoStore = require("connect-mongo")(session);

// Load Env files
dotenv.config({ path: "./config/config.env" });

// Passport Config - can be confusing
require("./config/passport")(passport);

// Database Connection
connectDb();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Request Loggings
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Express Handlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Sessions from express
app.use(
  session({
    secret: "StoryBook",
    resave: false,
    saveUninitialized: false,
    // integrate session to connect mongo
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

app.listen(port, () => {
  console.log(`Server is up. Connected in port ${port}`);
});
