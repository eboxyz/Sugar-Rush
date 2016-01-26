var User = require('../models/user');

module.exports = function (app, passport){

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

  // locally --------------------------------
      // LOGIN ===============================
      // show the login form
      // process the login form

      // SIGNUP =================================
      // show the signup form
      // process the signup form

  app.get('/local', function (req,res){
    res.render('./users/localAuth.ejs');
  });

  app.get('/local/login', function (req, res){
    res.render('./users/login.ejs',
      { message: req.flash('loginMessage') }
      );
  });

  app.post('/local/login', passport.authenticate('local-login', {
    successRedirect: '/local/profile',
    failureRedirect: '/local/login',
    failureFlash: true //allow flashing
  }));

  app.get('/local/signup', function (req, res){
    res.render('./users/signup.ejs',
      { message: req.flash('signupMessage') }
      )
  });

  app.post('/local/signup', passport.authenticate('local-signup', {
    successRedirect: '/local/profile',
    failureRedirect: '/local/signup',
    failureFlash: true //allow flashing
  }))

  app.get('/local/profile', isLoggedIn, function (req,res){
    User.findById({_id: req.user}, function (err, data){
    res.render('./users/profile.ejs', {
      user: data
    })
  });
  });


    // =====================================
    // Venmo Authentication =====================
    // =====================================
    // route for venmo authentication and login
    app.get('/auth/venmo', passport.authenticate('venmo', {
      scope: ['access_feed', 'access_profile', 'access_email', 'access_phone', 'access_balance', 'access_friends'],
      failureRedirect: '/'
    }));

    app.get('/auth/venmo/callback', passport.authenticate('venmo', {
      successRedirect: '/local/profile',
      failureRedirect: '/'
    }));

    //logout
    app.get('/local/logout', function (req, res){
      req.logout();
      res.redirect('/');
    });


    //send to venmo for authentication
    // app.get('/connect/venmo', passport.authorize('venmo', {scope: 'email'}));

    // //callback after venmo authorizes
    // app.get('/connect/venmo/callback',
    //   passport.authorize('venmo',{
    //     successRedirect: './users/profile',
    //     failureRedirect: '/'
    //   }));

  //route middleware to make sure user is logged in
  function isLoggedIn (req, res, next){

    //if user is authenticated, then continue
    if (req.isAuthenticated())
      return next();
    //if they aren't loggedin, redirect to home
    res.redirect('/');
  }
}
