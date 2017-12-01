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

// Routes
// =============================================================

module.exports = function(app) {


//User Info
app.get("/api/user/:id", function(req, res) {
	db.User.findAll({where: {id: req.params.id}}).then(function(dbPost) {
		console.log(Sequelize.getValues(dbPost));
		res.json(dbPost);
	})
});

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

//Get all currencies
app.get("/api/currencies", function(req,res) {
	db.Coin.findAll({order: Sequelize.col('sort_order')}).then(function(dbPost) {
		console.log(Sequelize.getValues(dbPost));
		res.json(dbPost);
	})
})

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
