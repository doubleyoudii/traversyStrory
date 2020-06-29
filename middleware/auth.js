module.exports = {
  ensureAuth: function (req, res, next) {
    // if the user is not loged in and try to access other paged
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/"); // Login
    }
  },
  ensureGuest: function (req, res, next) {
    // if the user is alredy Loged in and try to go to "login Page", he will redirected to "dashboard"

    if (req.isAuthenticated()) {
      res.redirect("/dashboard");
    } else {
      return next();
    }
  },
};
