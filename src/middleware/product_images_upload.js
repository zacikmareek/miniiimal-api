const util = require("util");
const path = require("path");
const multer = require("multer");
const moment = require("moment");
const slugify = require("slugify");
const process = require("process");
const fs = require("fs");

const formatedDate = moment(Date.now()).format(
    "DD-MM-YYYY_HH-mm-ss"
    );

const maxSize = 5000000;

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../uploads/products`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg", "image/jpg"];
    if (match.indexOf(file.mimetype) === -1) {
      console.log(file)
      var message = `${file.originalname} je chybný súbor. Odosielajte iba png/jpeg/jpg.`;
      return callback(message, null);
    }
    var filename = `${formatedDate}-${file.originalname}`;
    callback(null, filename);
  }
});

var uploadFiles = multer({ storage: storage }).array("file", 1);
var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;
