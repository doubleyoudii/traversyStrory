const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Story = require("../models/Story");

// @desc Login / Landing page
// @route /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// @desc Dashboard
// @route /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = new Story.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.displayName,
      stories,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

module.exports = router;
