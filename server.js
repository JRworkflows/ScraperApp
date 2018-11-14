var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models

var routes = require("./routes");
var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// handlebars
app.engine("handlebars", exphbs({defaultLayout:"main"}));
app.set("view engine", "handlebars");
app.use(routes);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true });



// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});








// // Dependencies
// var express = require("express");
// var mongojs = require("mongojs");
// // Require axios and cheerio. This makes the scraping possible
// var axios = require("axios");
// var cheerio = require("cheerio");

// // Initialize Express
// var app = express();

// // Database configuration
// var databaseUrl = "scraper";
// var collections = ["scrapedData"];

// // Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// // Main route (simple Hello World Message)
// app.get("/", function(req, res) {
//   res.send("Hello world");
//   db.scrapedData.find({}, function(error, found) {
//     // Throw any errors to the console
//     if (error) {
//       console.log(error);
//     }
//     // If there are no errors, send the data to the browser as json
//     else {
//       res.json(found)
//     }
//   });
// });

// // Retrieve data from the db
// app.get("/all", function(req, res) {
//   // Find all results from the scrapedData collection in the db
//   db.scrapedData.find({}, function(error, found) {
//     // Throw any errors to the console
//     if (error) {
//       console.log(error);
//     }
//     // If there are no errors, send the data to the browser as json
//     else {
//       res.json(found);
//     }
//   });
// });

// // Scrape data from one site and place it into the mongodb db
// app.get("/scrape", function(req, res) {
//   // Make a request via axios for the news section of `ycombinator`
//   axios.get("https://www.vox.com").then(function(response) {
//     // Load the html body from axios into cheerio
//     var $ = cheerio.load(response.data);
//     // For each element with a "title" class
//     $(".c-entry-box--compact").each(function(i, element) {
//       // Save the text and href of each link enclosed in the current element
//       var card = $(element).children("div").children("h2").text();
//       var otherCard = $(element).children("a").attr("href");

//       // If this found element had both a title and a link
//       if (card && otherCard) {
//         // Insert the data in the scrapedData db
//         db.scrapedData.insert({
//           title: card,
//           link: otherCard
//         },
//         function(err, inserted) {
//           if (err) {
//             // Log the error if one is encountered during the query
//             console.log(err);
//           }
//           else {
//             // Otherwise, log the inserted data
//             console.log(inserted);
//           }
//         });
//       }
//     });
//   });

//   // Send a "Scrape Complete" message to the browser
//   res.send("Scrape Complete");
// });


// // Listen on port 3000
// app.listen(3000, function() {
//   console.log("App running on port 3000!");
// });