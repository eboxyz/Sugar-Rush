////////////////////////////////////////////////////////////////////////
//                         Login Controller                           //
////////////////////////////////////////////////////////////////////////

var User = require('../models/user');

module.exports = function (app, passport){

////////////////////////////////////////////////////////////////////////
//                       Local Authentication                         //
////////////////////////////////////////////////////////////////////////

  // locally --------------------------------
      // LOGIN ===============================
      // show the login form
      // process the login form

      // SIGNUP =================================
      // show the signup form
      // process the signup form
  app.get('/', function (req,res){
    res.render('./users/home_page')
  });

  app.get('/local/login', function (req, res){
    res.render('./users/login.ejs',
      { message: req.flash('loginMessage') }
      );
  });

  // Failure flash makes the flash happen only if there's a failure
  // authenticate callback is a predefined method
  app.post('/local/login', passport.authenticate('local-login', {
    successRedirect: '/local/profile',
    failureRedirect: '/local/login',
    failureFlash: true //allow flashing
  }));

  //
  app.get('/local/signup', function (req, res){
    res.render('./users/signup.ejs',
      { message: req.flash('signupMessage') }
      )
  });

  // Paired with local/login. This registers you, the former logs you in
  app.post('/local/signup', passport.authenticate('local-signup', {
    successRedirect: '/local/profile',
    failureRedirect: '/local/signup',
    failureFlash: true //allow flashing
  }))

  // If logged in, passes "next" to the mongo function.
  // Req.user is the user's Id, so you use it to find the matching user
  // Sets local javascript variable "user" to the user's data
  app.get('/local/profile', isLoggedIn, function (req,res){
    User.findById({_id: req.user}, function (err, data){
    res.render('./users/profile.ejs', {
      user: data
    })
  });
  });

////////////////////////////////////////////////////////////////////////
//                       Venmo Authentication                         //
////////////////////////////////////////////////////////////////////////

    // route for venmo authentication and login
    // Authenticates the user through venmo, the scopes are the info
    // that you are grabbing
    app.get('/auth/venmo', passport.authenticate('venmo', {
      scope: ['access_feed', 'access_profile', 'access_email', 'access_phone', 'access_balance', 'access_friends'],
      failureRedirect: '/'
    }));

    // Paired with the former. When you callback, if successful, go to
    // profile, otherwise hit up the homepage.
    // ≈ This one is login, the former is signup
    app.get('/auth/venmo/callback', passport.authenticate('venmo', {
      successRedirect: '/local/profile',
      failureRedirect: '/'
    }));

    //logout
    // Logout method is a passport method that destroys a session
    app.get('/local/logout', function (req, res){
      req.logout();
      res.redirect('/');
    });

    // Not used by app
    app.use(function (req, res, next){
      res.locals.login = req.isAuthenticated();
      next();
    })

    // Not used by app
    app.use( function (req, res, next){
      app.locals.user = User.findById({_id : req.user})
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

    //if user is authenticated (?express function), then continue
    if (req.isAuthenticated())
      return next();
    //if they aren't loggedin, redirect to home
    res.redirect('/');
  }
}
