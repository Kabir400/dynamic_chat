//external imports--
const multer = require("multer");
const path = require("path");

//createing uploader function that uses multer to upload files

const uploader = (folder, type, err_msg) => {
  //multer storeage configureration--

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/uploads/image"));
    },

    filename: (req, file, cb) => {
      const file_name = Date.now() + "-" + file.originalname;
      cb(null, file_name);
    },
  });

  //prepare the final multer upload object--

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith(`${type}/`)) {
        return cb(new Error(err_msg), false);
      }
      cb(null, true);
    },
  });

  return upload;
};

module.exports = uploader;
