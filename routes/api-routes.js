// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

global.fetch = require('node-fetch');
const cc = require('cryptocompare');

// Requiring our models
var db = require("../models");
var Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
const Op = Sequelize.Op;

// Routes
// =============================================================

module.exports = function(app) {

	var userCoinList = [];

	//User Info
	// app.get("/api/user/:id", function(req, res) {
	// 	db.User.findAll({
	// 		where: {
	// 			id: req.params.id
	// 		},
	// 		include: [db.Transaction],
	// 		include: [db.Portfolio]
	// 	}).then(function(dbUser) {
	// 		console.log(Sequelize.getValues(dbUser));
	// 		res.json(dbUser);
	// 	})
	// });

	//New User
	app.post("/api/user/new", function(req, res) {
		db.User.create(req.body).then(function(dbPost) {
			res.json(dbPost); 
		})
	});

	//Get all currencies
	app.get("/api/currencies", function(req,res) {
		db.Coin.findAll({order: Sequelize.col('sort_order')}).then(function(dbPost) {
			console.log(Sequelize.getValues(dbPost));
			res.json(dbPost);
		})
	})


	//New User
	app.post("/api/user/new", function(req, res) {
		db.User.create(req.body).then(function(dbPost) {
			console.log(dbPost.id);
			var newPort = 
			{
				UserId: dbPost.id,
				currency: "USD",
				amount: 50000,
				expired: 0
			};
			db.Portfolio.create(newPort).then(function(dbPort) {
				return true;
			});
			res.json(dbPost);
		})
	});

	app.get("/api/portfolio/:id", function(req, res) {
		db.Portfolio.findAll({
			where: {
				userId: req.params.id,
				expired: false,
			},
			include: [db.User]
		}).then(function(dbPortfolio) {
			var port = Sequelize.getValues(dbPortfolio)


			for (var i=0; i<port.length; i++) {
				userCoinList.push(port[i].currency);
			}

			cc.priceMulti(userCoinList, 'USD')
			.then(prices => {
				console.log(prices)
			})
			.catch(console.error)

			var portfolio = {
				userName: port[0].User.name,
				currentNetWorth: currentNetWorth(port[0].userId),
				pastNetWorths: pastNetWorth(port[0].userId),
				topRanks: topRank(),
				userHoldings: userCoinList
			}
			
			res.json(portfolio);
		})
	});

	// PUT route for updating User
	app.put("/api/user", function(req, res) {
	  db.User.update(
	    req.body,
	    {
	      where: {
	        id: req.body.id
	      }
	    }).then(function(dbPost) {
	      res.json(dbPost);
	    });
	});

	//get currency actual value
	app.get("/api/currencies/:symbol", function(req, res) {
		var symbol = req.params.symbol.toUpperCase();
		cc.priceMulti([symbol], ['USD'])
		.then(prices => {
		  console.log(prices)
		  res.json(prices);
		})
		.catch(console.error)
	})


	//get currency historical value
	app.get("/api/currencies/:symbol/:date", function(req, res) {
		var symbol = req.params.symbol.toUpperCase();
		cc.priceHistorical(symbol, ['USD'], new Date(req.params.date))
		.then(prices => {
		  console.log(prices)
		  res.json(prices);
		})
		.catch(console.error)
	})

	function pastNetWorth(id) {
		var date = new Date();
		var netWorthList = [];
		var weekly = [];

		db.Portfolio.findAll({
			where: {
				userId: id,
				expired: false,
				createdAt: {[Op.between]: [date.setDate(date.getDate()-7), date]},
			}
		}).then(function(dbPortfolio) {
			res.json(dbPortfolio);
		});
	}

	function topRank(id) {

	}

	function currentNetWorth(id) {

	}


	// var express = require("express");

	// // Import the model (burger.js) to use its database functions.
	// // Requiring our models
	// var db = require("../models");


	//get currency value for the last 30 days
	app.get("/api/curr-hist-day/:symbol", function(req, res) {
		var symbol = req.params.symbol.toUpperCase();
		cc.histoDay(symbol, ['USD'])
		.then(prices => {
		  console.log(prices)
		  res.json(prices);
		})
		.catch(console.error)
	})

	//get currency value for the last week hourly
	app.get("/api/curr-hist-hour/:symbol", function(req, res) {
		var symbol = req.params.symbol.toUpperCase();
		cc.histoHour(symbol, ['USD'])
		.then(prices => {
		  console.log(prices)
		  res.json(prices);
		})
		.catch(console.error)
	})

	//get currency full price
	app.get("/api/curr-price-full/:symbol", function(req, res) {
		var symbol = req.params.symbol.toUpperCase();
		cc.priceFull(symbol, ['USD'])
		.then(prices => {
		  console.log(prices)
		  res.json(prices);
		})
		.catch(console.error)
	})



};
