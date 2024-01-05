//external imports--
const userModel = require("../model/userModel.js");
const bcrypt = require("bcryptjs");

//load signup page--
const laodSignup = async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    console.log(err.message);
  }
};

//signup functionality---
const signup = async (req, res) => {
  try {
    //hashing password
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    //check user exist or not
    const checkUser = await userModel.findOne({ email: req.body.email });

    if (!checkUser) {
      //saving user into database
      let image;
      if (req.file) {
        image = req.file.filename;
      } else {
        image = undefined;
      }
      const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        image: image,
      });

      await user.save();

      //redering sigup page with success message--
      res.render("signup", { message: "Your registration has been completed" });
    } else {
      res.render("signup", { err: "You are already a member!" });
    }
  } catch (err) {
    res.render("signup", { err: err.message });
  }
};

//load login page--
const laodLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    console.log(err.message);
  }
};

//do login--
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await userModel.findOne({ email: email });

    //checking for valid user--
    if (userData) {
      const isValidPassword = await bcrypt.compare(password, userData.password);

      //checking for valid password--
      if (isValidPassword) {
        req.session.user = {
          _id: userData._id,
          email: userData.email,
          name: userData.name,
        };
        res.render("login", { message: "Logged in successfully!" });
      } else {
        res.render("login", { err: "Email or Password is incorrect!" });
      }
    } else {
      res.render("login", { err: "Email or Password is incorrect!" });
    }
  } catch (err) {
    res.render("login", { err: "Email or Password is incorrect!" });
  }
};

//load dashboard--
const laodDashboard = async (req, res) => {
  try {
    const users = await userModel.find({
      email: { $nin: req.session.user.email },
    });
    res.render("dashboard", { users: users });
  } catch (err) {
    console.log(err.message);
  }
};

//do logout--
const logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  signup,
  laodSignup,
  laodLogin,
  login,
  laodDashboard,
  logout,
};
