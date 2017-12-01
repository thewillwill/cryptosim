// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");
var Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
const Op = Sequelize.Op;

global.fetch = require('node-fetch');
const cc = require('cryptocompare');

// Routes
// =============================================================

module.exports = function(app) {

	var coins = [];
	
	var userCoins = [];

	//User Info
	app.get("/api/user/:id", function(req, res) {
		db.User.findAll({
			where: {
				id: req.params.id
			}
		}).then(function(dbUser) {
			console.log(Sequelize.getValues(dbUser));
			res.json(dbUser);
		})
	});

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


	app.get("/api/portfolio/:id", function(req, res) {
		db.Portfolio.findAll({
			where: {
				userId: req.params.id,
				expired: true,
			},
			include: [db.User]
		}).then(function(dbPortfolio) {
			var port = Sequelize.getValues(dbPortfolio)
			console.log(port);

			for (var i=0; i<port.length; i++) {
				coins.push(port[i].currency);
			}

			cc.priceMulti(coins, 'USD')
			.then(prices => {

				for (const i in prices) {
					console.log(i)
					var userCoinObject = {
						coinName: "",
						coinIcon: "",
						userQty: "",
						currentPrice: prices[i]["USD"],
						currentValue: "",
						valueChange: "?"
					};
					console.log(prices[i]["USD"]);
					userCoins.push(userCoinObject);
				
				}
				console.log(userCoinObject);
			})
			.catch(console.error)

			var portfolio = {
				userName: port[0].User.name,
				//currentNetWorth: currentNetWorth(port[0].userId),
				averageNetWorths: averageNetWorth(port[0].userId),
				//topRanks: topRank(),
				userHoldings: userCoins
			}
			
			res.json(portfolio);
		})
	});



};

function averageNetWorth(id) {
	var date = new Date();
	var netWorthList = [];
	var weekly = [];

	db.Portfolio.findAll({
		where: {
			userId: id,
			expired: false,
			createdAt: {[Op.between]: [date.setDate(date.getDate()-7), date]},
		}
	}).then(function(result) {
		console.log(result);
		return result;
	});
}

// function topRank() {

// }

// function currentNetWorth(id) {

// }


// var express = require("express");

// // Import the model (burger.js) to use its database functions.
// // Requiring our models
// var db = require("../models");

// var Sequelize = require('sequelize');
// require('sequelize-values')(Sequelize);


// var router = express.Router();


// // Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//   // burger.selectAll(function(data) {
//   //   var hbsObject = {
//   //     burgers: data
//   //   };
//   //   res.render("index", hbsObject);
//   // });

//   db.Burger.findAll({}).then(function(dbPost) {
//     // res.json(dbPost);
//     console.log(Sequelize.getValues(dbPost));
//     //var newBurger = dbPost.toJSON();
//      var newBurger = {
//       burgers: Sequelize.getValues(dbPost)
//      };
//     // console.log(newBurger);
//     res.render("index", newBurger);
//   });
// });

// router.post("/api/burgers", function(req, res) {
//   // burger.insertOne([
//   //   "burger_name", "devoured"
//   // ], [
//   //   req.body.burger_name, req.body.devoured
//   // ], function(result) {
//   //   // Send back the ID of the new quote
//   //   res.json({ id: result.insertId });
//   // });
//   db.Burger.create(req.body).then(function(dbPost) {
//     res.json(dbPost);
//   })
// });

// router.put("/api/burgers/:id", function(req, res) {
//   // var condition = "id = " + req.params.id;
//   // burger.updateOne({
//   //   devoured: req.body.devoured
//   // }, condition, function(result) {
//   //   if (result.changedRows == 0) {
//   //     // If no rows were changed, then the ID must not exist, so 404
//   //     return res.status(404).end();
//   //   } else {
//   //     res.status(200).end();
//   //   }
//   // });
//   db.Burger.update(
//     {devoured: req.body.devoured},
//     {
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbPost) {
//       res.json(dbPost);
//     })
// });
// //for future use
// router.delete("/api/burgers/delete/:id", function(req, res) {
//   // var condition = "id = " + req.params.id;

//   // burger.delete(condition, function(result) {
//   //   if (result.affectedRows == 0) {
//   //     // If no rows were changed, then the ID must not exist, so 404
//   //     console.log("burger not found")
//   //     return res.status(404).end();
//   //   } else {
//   //     res.status(200).end();
//   //   }
//   // });
//   db.Post.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(function(dbPost) {
//     res.json(dbPost);
//   });
// });

// // Export routes for server.js to use.
// module.exports = router;
