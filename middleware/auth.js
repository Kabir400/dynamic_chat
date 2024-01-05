//send to login page--
const goLogin = async (req, res, next) => {
  try {
    if (!req.session.user) {
      res.redirect("/");
    } else {
      next();
    }
  } catch (err) {
    console.log(err.message);
  }
};

//send to dashboard page--
const goDash = async (req, res, next) => {
  try {
    if (req.session.user) {
      res.redirect("/dashboard");
    } else {
      next();
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { goDash, goLogin };
