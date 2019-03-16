const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const exphbs = require("express-handlebars");
const members = require("./Members");

const app = express();

// Init Middleware
// app.use(logger);

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Init Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handlebars route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App",
    members
  })
);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Members route
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
