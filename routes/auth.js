const express = require("express");
const router = express.Router();
const passport = require("passport");

// desc Google-Login
//route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// desc Google auth call back
// route GET /auth/google/callbacck
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// desc Logout User
// route GET /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
