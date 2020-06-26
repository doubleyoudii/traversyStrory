const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const connectDb = require("./config/db");

// Load Env files
dotenv.config({ path: "./config/config.env" });

// Passport Config - can be confusing
require("./config/passport")(passport);

// Database Connection
connectDb();

const port = process.env.PORT || 5000;

const app = express();

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
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));

app.listen(port, () => {
  console.log(`Server is up. Connected in port ${port}`);
});
