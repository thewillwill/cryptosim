'use strict';

//Load Dependencies
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

//Load User Model
// var User = sequelize.import('../models/user.js');
// User.sync();

//Load Auth Variables
var configAuth = require('./auth');


module.exports = function(passport) {

  passport.use(new FacebookStrategy({
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {

      //Using next tick to take advantage of async properties

      // process.nextTick(function() {
      //   User.findOne({
      //     where: {
      //       User.facebook_id: profile.id
      //     }
      //   }).then(function(err, user) {
      //     if(err)
      //       return done(err);
      //     if(user)
      //       return done(null, user);
      //     else {
      //       var newUser = new User();
      //       newUser.User.facebook_id = profile.id;
      //       newUser.User.token = accessToken;
      //       newUser.User.name = profile.name.givenName + " " + profile.name.familyName;
      //       newUser.User.email = profile.emails[0].value;
      //
      //       newUser.save(function(err) {
      //         if(err) throw err;
      //         return done(null, newUser);
      //       })
      //     }
      //   })
      // })
    }
  ));
}
