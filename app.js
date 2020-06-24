const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const connectDb = require("./config/db");

// Load Env files
dotenv.config({ path: "./config/config.env" });
connectDb();

const port = process.env.PORT || 5000;

const app = express();

// Request Loggings
if (process.env === "development") {
  app.use(morgan("dev"));
}

// Express Handlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));

app.listen(port, () => {
  console.log(`Server is up. Connected in port ${port}`);
});
