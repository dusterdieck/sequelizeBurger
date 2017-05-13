const express = require("express"),
	  bodyParser = require("body-parser"),
	  methodOverride = require("method-override"),
	  path = require('path'),
	  db = require("./models"); // Requiring our models for syncing

const PORT = process.env.PORT || 8081,
	  app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, "./public")));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// Routes =============================================================

require("./routes/burger-routes.js")(app);
// require("./routes/diner-routes.js")(app);


// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});