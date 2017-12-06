// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
// Requiring our Todo model
var db = require("../models");
var testObject = {}

// Routes
// =============================================================
module.exports = function(app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads index handlebars page
    app.get("/", function(req, res) {
        console.log('html-routes: app.get(/)');
        // console.log(req.session.passport.user);

        //display the index handlebars page
        res.render("pages/index", { title: "CyptoSim - Test Before You Invest", layout: 'cover' });

    });


    // start route loads start handlebars page
    app.get("/start/", function(req, res) {
        console.log('html-routes: app.get(/start)');
        //display the index handlebars page
        res.render("pages/start", { title: "Get Started - CryptoSim"});

    });


    // refer route loads portfolio handlebars page
    app.get("/portfolio", isLoggedIn, function(req, res) {
        console.log('html-routes: app.get(/portfolio)');
        //display the portfolio handlebars page, give it a title and set the navbar 'portfolio' button to active
        res.render("pages/portfolio", { title: "Porfolio - CryptoSim", active_portfolio: true, user: JSON.stringify(req.user.id), userName: JSON.stringify(req.user.name)});

    });


    // refer route loads refer handlebars page
    app.get("/refer", function(req, res) {
        console.log('html-routes: app.get(/refer")');
        //display the refer handlebars page, give it a title and set the navbar 'refer' button to active
        res.render("pages/refer", { title: "Refer A Friend - CryptoSim", active_refer: true});

    });


    // market route loads market handlebars page
    app.get("/market", isLoggedIn, function(req, res) {
        console.log('html-routes: app.get(/market)');

        //display the market handlebars page, give it a title and set the navbar 'market' button to active
        res.render("pages/market", { title: "Crypto Currency Market- CryptoSim", active_market: true, user: JSON.stringify(req.user.id), userName: JSON.stringify(req.user.name)});

    });

    //display the learn handlebars page, give it a title and set the navbar 'learn' button to active
    app.get("/learn", function(req, res) {
        console.log('html-routes: app.get(/learn)');

        //display the learn handlebars page, give it a title and set the navbar 'learn' button to active
        res.render("pages/learn", { title: "Learn About Crypto Currencies - CryptoSim", active_learn: true});

    });

    app.get("/preferences", isLoggedIn, function(req, res) {
        console.log('html-routes: app.get(/preferences)');

        //display the preferences handlebars page, give it a title and set the navbar 'preferences' button to active
        res.render("pages/preferences", { title: "Preferences - CryptoSim", active_preferences: true, user: JSON.stringify(req.user.id), userName: JSON.stringify(req.user.name)});

    });

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

};