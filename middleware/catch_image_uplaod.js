const uploader = require("../utility/imageUpload.js");

const imageUplaod = (req, res, next) => {
  const upload = uploader("image", "image", "You can only upload image!");

  upload.single("image")(req, res, (err) => {
    if (err) {
      res.render("signUp", { err: err.message });
    } else {
      next();
    }
  });
};

module.exports = imageUplaod;
