//external imports--
const express = require("express");

//configuring router--
const router = express.Router();

//internal imports--
const {
  laodSignup,
  signup,
  laodLogin,
  login,
  laodDashboard,
  logout,
} = require("../controller/userController.js");
const imageUplaod = require("../middleware/catch_image_uplaod.js");
const { goDash, goLogin } = require("../middleware/auth.js");

// Add middleware to set user in res.locals
router.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

//methods--
router.get("/signup", goDash, laodSignup);
router.post("/signup", imageUplaod, signup);
router.get("/", goDash, laodLogin);
router.post("/", login);
router.get("/dashboard", goLogin, laodDashboard);
router.get("/logout", logout);

//default route--
router.get("*", (req, res, next) => {
  res.redirect("/");
});

module.exports = router;
