//------------------------------------------------------------------------
//------------------------------------------------------------------------
// DEPENDENCIES
//------------------------------------------------------------------------
//------------------------------------------------------------------------

global.fetch = require('node-fetch');
const cc = require('cryptocompare');

// Requiring our models
var db = require("../models");
var Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
const Op = Sequelize.Op;


//------------------------------------------------------------------------
//------------------------------------------------------------------------
// BUY AND SELL ROUTES
//------------------------------------------------------------------------
//------------------------------------------------------------------------

// GET route for retrieving all historical transactions
app.get("/api/transaction", function(req, res) {
	db.Transaction.findAll({}).then(function(transactions) {
			res.json(transactions)
		})
});

// GET route for retrieving all BUY transaction
app.get("/api/transaction/buy/all", function(req, res) {
	db.Transaction.findAll({
		where: {
			transaction_type: 'B'
		}}).then(function(transactions) {
			res.json(transactions)
		})
	});

// Get rotue for retrieving all BUY transactions per user
app.get("/api/transaction/buy/:UserID", function(req, res) {
	db.Transaction.findAll({
		where: {
			Userid: req.body.params.UserID,
			transaction_type: 'B'
		}}).then(function(transactions) {
			res.json(transactions)
		})
	});

// GET route for retrieving all SELL transaction
app.get("/api/transaction/sell/all", function(req, res) {
	db.Transaction.findAll({
		where: {
			transaction_type: 'S'
		}}).then(function(transactions) {
			res.json(transactions)
		})
	});

// Get rotue for retrieving all SELL transactions per user
app.get("/api/transaction/sell/:UserID", function(req, res) {
	db.Transaction.findAll({
		where: {
			Userid: req.body.params.UserID,
			transaction_type: 'S'
		}}).then(function(transactions) {
			res.json(transactions)
		})
	});

//------------------------------------------------------------------------
// Single Orders
//------------------------------------------------------------------------

	// POST route for single BUY Order
	app.post("/api/transaction/buy", function(req, res) {
	console.log('updating DB');
  console.log(req.body);
	var dollars = (req.body.params.USDValue / req.body.params.ccPrice);
	var crypro
	// Set old USD wallet value to expired (0)
	db.Portfolios.update({ expired: 0 },
		{ where: {
			UserId: req.body.params.userID,
			currency: USD
		 }}).then(result => handleresult(result)
	).catch(err => handleerror(err));
	// Set new USD wallet value
  db.Portfolios.create({
      UserId: req.body.params.userID,
      currency: USD,
      expired: 1,
      amount: req.body.params.currentUSD
    }).then(result => handleresult(result)
	).catch(err => handleerror(err));
  // Set new cryptocurrency amount
  db.Portfolios.create({
      UserId: req.body.params.userID,
      currency: req.body.params.coinID,
      expired: 1,
      amount: 50
    }).then(result => handleresult(result)
	).catch(err => handleerror(err));
	// Create transaction for cryptocurrency purchased
  db.Transactions.create({
      currency: req.body.params.coinID,
      amount: 50
      price_paid: req.body.params.USDValue,
      transaction_type: 'B'
    }).then(function(result) {
			console.log(result);
			res.json(result);
		});
