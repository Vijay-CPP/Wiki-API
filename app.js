// Required Modules 
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// Setup for EJS, BodyParser, Static Pages
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Mongoose Database Setup
mongoose.pluralize(null);
const dbName = "wikiDB";
// const localURI = 'mongodb://localhost:27017/';

const dbIntigration = process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD;

const uri = "mongodb+srv://" + dbIntigration + "@cluster0.w4izs.mongodb.net/";

mongoose.connect(uri + dbName);

// Collection Structure
const articleSchema = {
    title: String,
    content: String
};

const article = new mongoose.model("articles", articleSchema);

app.get("/", (req, res) => {
    res.write("Welcome to Wiki-API [RESTful-API]");
    res.write("\n/articles will fetch all the articles & same for adding form encoded -> title: '' , content:''");
    res.write("\n/articles/<name> will fetch a specific article if exists & put, patch, delete can be done on the same.");
    res.send();

});

app.route("/articles")
    // To send all the article documents
    .get((req, res) => {
        article.find({}, (err, foundArticles) => {
            // console.log(foundArticles);
            if (err)
                res.send(err);
            else
                res.send(foundArticles);
        })
    })

    // Adding to collection through post
    .post((req, res) => {
        // console.log(req.body.title);
        // console.log(req.body.content);

        const doc = new article({
            title: req.body.title,
            content: req.body.content
        });
        doc.save((err) => {
            if (err)
                res.send(err);
            else
                res.send("Successfully Added Data.")
        });
    })

    // Delete all the articles
    .delete((req, res) => {
        article.deleteMany({}, (err) => {
            if (err)
                res.send(err);
            else
                res.send("Sucessfully deleted all the collections.");
        })
    });

// Custom Requests

app.route("/articles/:articleTitle")
    // Custom Get
    .get((req, res) => {
        const query = { title: req.params.articleTitle };
        article.findOne(query, (err, foundArticle) => {
            // console.log(foundArticles);
            if (err)
                res.send(err);
            else if (foundArticle)
                res.send(foundArticle);
            else
                res.send("No article matching was found.");
        })
    })

    // Update specific
    .put((req, res) => {

        const updatedDoc = {
            title: req.body.title,
            content: req.body.content
        };

        const query = { title: req.params.articleTitle };
        article.replaceOne(query, updatedDoc, { overwrite: true }, (err) => {
            if (err)
                res.send(err);
            else
                res.send("Successfully updated!");
        });
    })

    .patch((req, res) => {

        const updatedDoc = {
            $set: req.body
        };

        const query = { title: req.params.articleTitle };
        article.updateOne(query, updatedDoc, (err) => {
            if (err)
                res.send(err);
            else
                res.send("Successfully updated!");
        });

    })

    // Specific Delete
    .delete((req, res) => {
        const query = { title: req.params.articleTitle };
        article.deleteOne(query, (err) => {
            if (err)
                res.send(err);
            else
                res.send("Successfully deleted!");
        });
    });


// Starting server
const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log("Listening to port 3000");
});


