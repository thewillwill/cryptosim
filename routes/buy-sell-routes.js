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
	db.Transactions.findAll({}).then(function(transactions) {
			res.json(transactions)
		})
});

// GET route for retrieving all BUY transaction
app.get("/api/transaction/buy/all", function(req, res) {
	db.Transactions.findAll({
		where: {
			transaction_type: 'B'
		}}).then(function(transactions) {
			res.json(transactions)
		})
	});

// Get rotue for retrieving all BUY transactions per user
app.get("/api/transaction/buy/:UserID", function(req, res) {
	db.Transactions.findAll({
		where: {
			Userid: req.body.params.UserID,
			transaction_type: 'B'
		}}).then(function(transactions) {
			res.json(transactions)
		})
	});

// GET route for retrieving all SELL transaction
app.get("/api/transaction/sell/all", function(req, res) {
	db.Transactions.findAll({
		where: {
			transaction_type: 'S'
		}}).then(function(transactions) {
			res.json(transactions)
		})
	});

// Get rotue for retrieving all SELL transactions per user
app.get("/api/transaction/sell/:UserID", function(req, res) {
	db.Transactions.findAll({
		where: {
			Userid: req.body.params.UserID,
			transaction_type: 'S'
		}}).then(function(transactions) {
			res.json(transactions)
		})
	});



	// POST route for updating Transactions AND Portfolio tables when BUY REQUEST
	app.post("/api/transaction/buy", function(req, res) {
	console.log('updating DB');
  console.log(req.body);
	var dollars = (req.body.params.USDValue / req.body.params.ccPrice);
	var crypro = ()
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
      amount: //CURRENT USD VALUE
    }).then(result => handleresult(result)
	).catch(err => handleerror(err));

  db.Portfolios.create({
      UserId: req.body.params.userID,
      currency: req.body.params.coinID,
      expired: 1,
      amount: //HOW? (req.body.params.USDValue / newCurrObjectArray.price <- need to iterate through ob first)
      	});
      	//6. Create transaction for cryptocurrency purchased
      	db.Transactions.create({
        	currency: req.body.params.coinID,
        	amount: //HOW? (req.body.params.USDValue / newCurrObjectArray.price <- need to iterate through ob first)
          price_paid: req.body.params.USDValue,
        	transaction_type: 'B'
      	}).then(function(result) {
					console.log(result);
					res.json(result);
				})
    	}
  	})
	});


//OLD
	// app.post("/api/transaction/sell", function(req, res) {
  // 	console.log('updating DB');
  // 	console.log(req.body);
  // 	//1. Check if user has enough money to make purchase
  // 	db.Portfolios.findAll({
  //   	where: {
  //     	UserId: req.body.params.userID,
  //     	expired: 1,
  //     	currency: USD,
  //   	}
  // 	}).then(function(portfolio) {
  //   	console.log("portfolio: ", portfolio);
  //   	var port = Sequelize.getValues(portfolio);
  //   	console.log(port);
  //   	if (req.body.params.USDValue > port[i].amount) {
  //     	alert("You do not have enough money to purchase " + req.body.params.coinID + " at this time.");
  //     	return;
  //   	} else {
  //     	//2. Get Cryprocurrency Value
  //     	var cc = req.body.params.keyID;
  //     	var priceList = json.stringify(newCurrObjectArray); //need to API call cc in order to get real-time value
  //     	for (let i = 0; i < priceList.length; i++) {
  //       	if (cc == priceList.key_id) {
  //         	var value = priceList[i].price;
  //       	}
  //     	}
  //     	//3. Update row in portfolio for user where boolean = 1 and set to 0
  //     	db.Portfolios.update({
  //       	expired: 0
  //     	});
  //     	//4. Create new row in portfolio for $USD left in account
  //     	db.Portfolios.create({
  //       	UserId: req.body.params.userID,
  //       	currency: USD,
  //       	expired: 1,
  //       	amount: //HOW? (req.body.params.USDValue - port[i].amount)
  //     	});
  //     	//5. Create new row in portfolio for CryproCurrency purchased
  //     	db.Portfolios.create({
  //       	UserId: req.body.params.userID,
  //       	currency: req.body.params.coinID,
  //       	expired: 1,
  //       	amount: //HOW? (req.body.params.USDValue / newCurrObjectArray.price <- need to iterate through ob first)
  //     	});
  //     	//6. Create transaction for cryptocurrency purchased
  //     	db.Transactions.create({
  //       	currency: req.body.params.coinID,
  //       	amount: //HOW? (req.body.params.USDValue / newCurrObjectArray.price <- need to iterate through ob first)
  //         price_paid: req.body.params.USDValue,
  //       	transaction_type: 'B'
  //     	}).then(function(result) {
	// 				console.log(result);
	// 				res.json(result);
	// 			})
  //   	}
  // 	})
	// });
