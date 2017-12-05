// *********************************************************************************
// fb-routes.js - this file offers a set of routes that allow user authentication
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models/user");

// Routes
// =============================================================
module.exports = function(app, passport) {

  // Redirect the user to Facebook for authentication.  When complete,
  // Facebook will redirect the user back to the application at
  //     /auth/facebook/callback
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect: '/market',
      failureRedirect: '/'
    })
  );
}
