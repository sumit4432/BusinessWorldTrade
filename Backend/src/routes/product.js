const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const shortid = require("shortid");

const { getProductsBySlug, createProduct } = require("../controller/product");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/products/create",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);
// router.get("/products/:slug", getProductsBySlug, );
// res.status(200).json({ slug });

router.get("/products/:slug", getProductsBySlug);

module.exports = router;
