// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads index handlebars page
    app.get("/", function(req, res) {
        console.log('html-routes: app.get(/)');

        //display the index handlebars page
        res.render("pages/index", {title:"CyptoSim - Test Before You Invest"});

    });


    // start route loads start handlebars page
    app.get("/start", function(req, res) {
        console.log('html-routes: app.get(/start)');

        //display the index handlebars page
        res.render("pages/start", {title:"Get Started - CryptoSim"});

    });


    // refer route loads portfolio handlebars page
    app.get("/portfolio", function(req, res) {
        console.log('html-routes: app.get(/portfolio)');

        //display the index handlebars page
        res.render("pages/portfolio", {title:"Porfolio - CryptoSim"});

    });


    // refer route loads refer handlebars page
    app.get("/refer", function(req, res) {
        console.log('html-routes: app.get(/refer")');

        //display the index handlebars page
        res.render("pages/refer", {title:"Refer A Friend - CryptoSim"});

    });


    // market route loads market handlebars page
    app.get("/market", function(req, res) {
        console.log('html-routes: app.get(/market)');

        //display the index handlebars page
        res.render("pages/market", {title:"Crypto Currency Market- CryptoSim"});

    });



};